import { Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  combineLatest,
  distinctUntilChanged,
  map,
  of,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { ProductKindUri } from '@backbase/internal-at-shared-util-ang';
import { ProductKinds } from '@backbase/product-summary-common-ang';
import { ActionsRetailNotificationPreferencesJourneyConfigService } from '@backbase/actions-retail-notification-preferences-journey-ang';

import { ProductSummaryBaseService } from './product-summary-base.service';
import { ProductSummaryHttpService, AdditionalProperties } from '@backbase/arrangement-manager-http-ang';
import { AccountSummary } from '@backbase/actions-retail-notification-preferences-journey-util';
import { ActionsRetailNotificationsPreferencesExtendedModule } from '../actions-retail-notifications-preferences-extended.module';

const isProductVisible = (product) => {
  if (product.userPreferences && product.userPreferences.visible !== undefined) {
    return product.userPreferences.visible;
  } else if (product.visible !== undefined) {
    return product.visible;
  }
  return true;
};
const clearUndefinedProperties = (obj) => JSON.parse(JSON.stringify(obj));
const aggregatedToTotalBalance = (aggregatedBalance) => ({
  aggregatedBalance: aggregatedBalance.value || '',
  currency: aggregatedBalance.currency || '',
});
const hasVisibleProducts = (products) => products.some((product) => product && isProductVisible(product));
const getProductKind = (kind) => {
  switch (kind) {
    case 'currentAccounts':
      return ProductKindUri.CURRENT_ACCOUNT;
    case 'savingsAccounts':
      return ProductKindUri.SAVINGS_ACCOUNT;
    case 'termDeposits':
      return ProductKindUri.TERM_DEPOSIT;
    case 'loans':
      return ProductKindUri.LOAN;
    case 'creditCards':
      return ProductKindUri.CREDIT_CARD;
    case 'debitCards':
      return ProductKindUri.DEBIT_CARD;
    case 'investmentAccounts':
      return ProductKindUri.INVESTMENT_ACCOUNT;
    default:
      return kind;
  }
};
const objectToProductKind = (kind, productKind) => {
  const hasProducts = productKind && productKind.products && productKind.products.length > 0;
  if (hasProducts && hasVisibleProducts(productKind.products)) {
    const products = productKind.products;
    return {
      id: kind,
      name: productKind.name,
      aggregatedBalance: productKind.aggregatedBalance ? productKind.aggregatedBalance.value : undefined,
      currency: productKind.aggregatedBalance ? productKind.aggregatedBalance.currency : undefined,
      products: products
        .filter(isProductVisible)
        .map((product) => ({ ...product, kind, productKindUri: getProductKind(kind) })),
      ...(productKind.additions ? { additions: productKind.additions } : {}),
    };
  }
  return undefined;
};
const arrayToProductKindList = (obj) =>
  obj.map((element) => element && objectToProductKind(element.name, element)).filter(Boolean);
const flattenArray = (arr) => [].concat(...arr);
const toProductKindList = (res) => {
  const products = Object.entries(res)
    .filter(([key]) => key !== 'aggregatedBalance')
    .map(([kind, value]) => {
      if (!Array.isArray(value)) {
        return objectToProductKind(kind, value);
      }
      return arrayToProductKindList(value);
    })
    .filter(Boolean);
  return flattenArray(products);
};
const responseToProductKinds = (res) =>
  clearUndefinedProperties({
    total: res && res.aggregatedBalance ? aggregatedToTotalBalance(res.aggregatedBalance) : undefined,
    productKinds: res ? toProductKindList(res) : [],
    ...(res && res.additions ? { additions: res.additions } : {}),
  });
const PARAMETERS_PRODUCT_SUMMARY_REQUEST_WITH_ENGAGEMENT = {
  businessFunction: 'General Notification Preferences',
  resourceName: 'Communication Preferences',
  privilege: 'view',
};

export interface TotalBalance extends AdditionalProperties {
  aggregatedBalance: string;
  currency: string;
}
export interface ProductKind extends AdditionalProperties {
  id: string;
  name?: string;
  aggregatedBalance?: string;
  currency?: string;
  products?: Array<AccountSummary>;
}

@Injectable({
  providedIn: 'root',
  // providedIn: ActionsRetailNotificationsPreferencesExtendedModule,
})
export class ProductSummaryNotificationsService extends ProductSummaryBaseService {
  private readonly productSummaryDataService;
  private readonly preferencesJourneyConfigService;
  /**
   * List of product kinds (accounts) fetched from the server
   */
  readonly productKinds$: Observable<ProductKinds | undefined | any>;

  constructor(
    productSummaryDataService: ProductSummaryHttpService,
    preferencesJourneyConfigService: ActionsRetailNotificationPreferencesJourneyConfigService,
  ) {
    super();
    this.productSummaryDataService = productSummaryDataService;
    this.preferencesJourneyConfigService = preferencesJourneyConfigService;
    this.productKinds$ = combineLatest([this.listParams.pipe(distinctUntilChanged()), this.productKindsRefresh]).pipe(
      tap(() => {
        this.isLoading$.next(true);
        this.loadingError$.next(undefined);
      }),
      switchMap(([params]) => {
        const newParams = this.composeProductSummaryRequestParams(params, this.preferencesJourneyConfigService.apiMode);
        return this.productSummaryDataService.getProductSummary(newParams).pipe(
          map((res) => responseToProductKinds(res)),
          catchError((error) => {
            this.loadingError$.next(error);
            return of(undefined);
          }),
        );
      }),
      tap(() => this.isLoading$.next(false)),
      shareReplay(1),
    );
  }

  /**
   * @internal
   * @param params
   * @param apiMode
   * @returns params
   */
  private composeProductSummaryRequestParams(params, apiMode) {
    if (apiMode === 'engagements') {
      return {
        ...params,
        ...PARAMETERS_PRODUCT_SUMMARY_REQUEST_WITH_ENGAGEMENT,
      };
    }
    return params;
  }
}
