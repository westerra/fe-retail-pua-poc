/* eslint-disable import/no-extraneous-dependencies */
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Observable,
  combineLatest,
  Subscription,
  BehaviorSubject,
  of,
  catchError,
  filter,
  map,
  switchMap,
  tap,
  EMPTY,
  mergeMap,
} from 'rxjs';
import {
  AccountArrangementItem,
  AccountArrangementItem as ProductType,
  MaskableAttribute,
  UnmaskedAttributeRequestParams,
  ProductSummaryHttpService,
} from '@backbase/arrangement-manager-http-ang';
import { NotificationService } from '@backbase/ui-ang/notification';

import {
  AccountDetailsService,
  AccountMaskableAttribute,
  AccountsExternalInfoService,
  getErrorMessage,
  hasExternalInfo,
} from '@backbase/internal-at-shared-data-access-ang';
import { DocumentService } from '@backbase/internal-at-shared-util-ang';
import {
  AccountInfoPropertyGroup,
  AccountsTransactionsJourneyService,
} from '@backbase/accounts-transactions-journey-ang';
import { UnmaskedProductEventPayload } from '@backbase/product-summary-common-ang';
import { REDIRECT_APPLICATION_NAME, RedirectRequest, RedirectResponse } from '../../../services/api/sso/sso.models';
import { ApiService } from '../../../services/api/api.service';
import { AppSsoStateService, SSO } from '../../../services/api/app-sso-state.service';
/**
 * Accounts Transactions journey Info View
 */
@Component({
  selector: 'bb-account-info-view-extended',
  templateUrl: './account-info.component.html',
})
export class AccountInfoViewExtendedComponent implements OnInit, OnDestroy {
  @ViewChild('errorNotificationTemplate', { static: true }) private errorNotificationTemplate:
    | TemplateRef<unknown>
    | string = '';

  @Input()
  product: AccountArrangementItem;

  showError: boolean = false;
  errorMessage: string = '';
  SSO = SSO;
  key = '';
  isLoading = false;
  showOrderChecks: boolean;
  isAccountLoanType = false;

  public productsSummaryList = [];
  public businessFunctionRequestParam = {
    businessFunction: 'Product Summary',
    resourceName: 'Product Summary',
    privilege: 'view',
    size: 1000000,
  };

  private readonly subscriptions = new Subscription();
  /**
   * The ID of the account for which to show the details
   * If not present, the widget has the `noAccountSelected` error state
   */
  private readonly accountId$: Observable<string> = this.getRouteParam(this.route, 'selectedAccount').pipe(
    map((accountId) => accountId || ''),
  );
  private selectedAccountId = '';
  /**
   * If the fetching of the account details failed, this property
   * holds the errors coming from the server
   */
  readonly error$: Observable<string | undefined> = this.accountsDetailsService.loadingError$.pipe(
    map((error) => error && getErrorMessage(error)),
  );
  /**
   * Defines the loading state during the loading of data.
   */
  readonly isLoading$: Observable<boolean> = this.accountsDetailsService.isLoading$;
  /**
   * Event is triggered when an unmask button was clicked in any of the product types
   */
  private unmaskedProductEvent: BehaviorSubject<UnmaskedProductEventPayload | undefined> = new BehaviorSubject<
    UnmaskedProductEventPayload | undefined
  >(undefined);
  /**
   * List of maskable attributes to store their states
   */
  maskableAttributes: AccountMaskableAttribute[] = [];
  /**
   * The account details fetched from the server
   */
  readonly account$: Observable<ProductType | undefined> = new Observable((subscriber) => {
    const subscriptions: Subscription[] = [];
    subscriptions.push(
      this._item$.subscribe({
        next: (product) => {
          subscriber.next(product);
          if (product && hasExternalInfo(product)) {
            subscriptions.push(
              this.accountsExternalInfoService
                .getAccountsWithExternalInfo$([product])
                .pipe(map(([productWithFinancialInstitution]) => productWithFinancialInstitution))
                .subscribe(subscriber),
            );
          }
        },
        error: subscriber.error,
      }),
    );
    return () => subscriptions.forEach((subscription) => subscription.unsubscribe());
  });

  _item$: Observable<ProductType | undefined> = combineLatest([
    // this.accountsDetailsService.details$.pipe(
    //   tap(() => {
    //     this.maskableAttributes = [];
    //     this.unmaskedProductEvent.next(undefined);
    //   }),
    // ),
    this.appSsoStateService.accountOnDisplay$.pipe(
      tap(() => {
        this.maskableAttributes = [];
        this.unmaskedProductEvent.next(undefined);
      }),
    ),
    this.unmaskedProductEvent.pipe(
      switchMap((payload: UnmaskedProductEventPayload | undefined) => {
        if (payload && !payload.attributeValue) {
          return this.getUnmaskedAttribute(payload).pipe(
            filter((unmaskedAttribute) => !!unmaskedAttribute),
            tap((unmaskedAttribute: string) => {
              const maskableAttribute = this.maskableAttributes.find(
                (attribute) => attribute.attributeName === payload.attributeName,
              );
              if (maskableAttribute) {
                maskableAttribute.masked = false;
                maskableAttribute.unmaskedValue = unmaskedAttribute;
              }
            }),
            map(
              (unmaskedValue: string): UnmaskedProductEventPayload => ({
                attributeName: payload.attributeName,
                attributeValue: unmaskedValue,
                product: payload.product,
              }),
            ),
          );
        }
        return of(payload);
      }),
      map((payload: UnmaskedProductEventPayload | undefined) => {
        if (payload) {
          const { product, attributeName, attributeValue } = payload;
          return this.updateAttributes(product, attributeName, attributeValue || '');
        }
        return payload;
      }),
    ),
  ]).pipe(map(this.mapProductDetails.bind(this)));

  /**
   * @internal
   */
  constructor(
    private readonly route: ActivatedRoute,
    private readonly accountsDetailsService: AccountDetailsService,
    private readonly notificationService: NotificationService,
    private readonly documentService: DocumentService,
    private readonly accountsExternalInfoService: AccountsExternalInfoService,
    private readonly configurationService: AccountsTransactionsJourneyService,
    public api: ApiService,
    private appSsoStateService: AppSsoStateService,
    private cdr: ChangeDetectorRef,
    private productSummaryService: ProductSummaryHttpService,
  ) {
    this.route.parent.params.subscribe((params) => {
      this.selectedAccountId = params.selectedAccount;
    });
  }

  /**
   * @internal
   */
  ngOnInit() {
    this.accountsDetailsService.setRequestParameters(this.accountId$);

    if (this.appSsoStateService.getAccountOnDisplay() === null) {
      this.productSummaryService
        .getArrangementsByBusinessFunction(this.businessFunctionRequestParam)
        .subscribe((res) => {
          this.productsSummaryList = res;
          let accountExistIndex = this.productsSummaryList.findIndex(
            (item) => item.id === this.appSsoStateService.getAccountOnDisplay().id,
          );
          if (accountExistIndex !== -1) {
            this.appSsoStateService.setAccountOnDisplay(this.productsSummaryList[accountExistIndex]);
          }
          this.isAccountLoanType = this.isLoanAccount(this.appSsoStateService.getAccountOnDisplay());
        });
    }
    this.isAccountLoanType = this.isLoanAccount(this.appSsoStateService.getAccountOnDisplay());
  }

  /**
   * Event handler for product kind details components like `bb-current-account-details`
   * Emits `UnmaskedProductEventPayload` to `unmaskedProductEvent`
   *
   * @param attributeName
   * @param product
   */
  onMaskAttribute(attributeName: MaskableAttribute, product: ProductType) {
    const maskableAttribute = this.maskableAttributes.find(
      (attribute) => attribute.attributeName === attributeName && attribute.maskedValue,
    );
    if (maskableAttribute) {
      this.unmaskedProductEvent.next({ attributeName, product, attributeValue: maskableAttribute.maskedValue });
      maskableAttribute.masked = true;
    }
  }

  /**
   * Event handler for product kind details components like `bb-current-account-details`
   * Emits `UnmaskedProductEventPayload` to `unmaskedProductEvent`
   *
   * @param attributeName
   * @param product
   */
  onUnmaskAttribute(attributeName: MaskableAttribute, product: ProductType) {
    const maskableAttribute = this.maskableAttributes.find(
      (attribute) => attribute.attributeName === attributeName && attribute.unmaskedValue,
    );
    const payload: UnmaskedProductEventPayload = { attributeName, product };
    if (maskableAttribute) {
      payload['attributeValue'] = maskableAttribute.unmaskedValue;
      maskableAttribute.masked = false;
    } else {
      this.maskableAttributes.push({
        attributeName,
        maskedValue: product[attributeName],
      });
    }
    this.unmaskedProductEvent.next(payload);
  }

  private updateAttributes(product: ProductType, attributeName: string, attributeValue: string): ProductType {
    return { ...product, ...{ [attributeName]: attributeValue } };
  }

  /**
   * Returns unmasked productItem if present otherwise masked one
   *
   * @param details
   * @private
   */
  private mapProductDetails(details: Array<ProductType | undefined>): ProductType | undefined {
    const [productDetails, unmaskedProduct] = details;
    return unmaskedProduct ? unmaskedProduct : productDetails;
  }

  private getRouteParam(route: ActivatedRoute, param: string): Observable<string | null> {
    const paramValue = route.paramMap.pipe(map((paramMap) => paramMap.get(param)));

    if (!route.parent) {
      return paramValue;
    }
    // ensure that level that has actual value keeps it from being cleared
    return combineLatest([paramValue, this.getRouteParam(route.parent, param)]).pipe(
      map((params) => params[0] || params[1]),
    );
  }

  /**
   * Prints out product details
   */
  print() {
    this.documentService.print();
  }
  /**
   * Fetches unmasked attribute for the given product
   * and returns a new product with the attribute unmasked
   */
  private getUnmaskedAttribute(unmaskedProductEventPayload: UnmaskedProductEventPayload): Observable<string> {
    const { attributeName, product } = unmaskedProductEventPayload;
    const requestParameters: UnmaskedAttributeRequestParams = {
      attributeName,
      arrangementId: product.id,
    };
    return this.accountsDetailsService.getUnmaskedAttribute$(requestParameters).pipe(
      catchError((error) => {
        this.notificationService.showNotification({
          header: this.errorNotificationTemplate,
          message: getErrorMessage(error),
          modifier: 'error',
        });
        return of('');
      }),
    );
  }

  /**
   * Returns properties configuration for a given account
   * @param account
   */
  getAccountProperties(account: AccountArrangementItem): AccountInfoPropertyGroup[] {
    const configuration = this.configurationService.accountInfoProperties;
    const kindUri = account.product?.productKind?.kindUri || 'default';
    return kindUri in configuration ? configuration[kindUri] : configuration.default;
  }

  ssoDMI(item: any, ssoAppName: string) {
    this.isLoading = true;
    this.showError = false;
    this.errorMessage = '';

    this.appSsoStateService
      .getSessionState(item.id, this.SSO.dmi)
      .pipe(
        mergeMap((data) => {
          this.key = data.ssourl;
          return this.appSsoStateService.getProfile();
        }),
        catchError((err) => {
          console.log(err);
          this.showError = true;
          this.isLoading = false;
          const error = err.error;
          this.errorMessage = error.message;
          this.cdr.detectChanges();
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.postDMI(this.key);
        // const emails = res["electronic-addresses"];
        // const email = emails[0].address;
        // let url = `${this.appSsoStateService.dmiURL}SSO/SSOCertify.aspx?loanno=${item.BBAN}&Rset=${this.key}&Email=${email}`
        // window.open(url, '_blank');

        this.cdr.detectChanges();
      });
  }

  postDMI(key: string) {
    var form = document.createElement('form');
    form.target = 'view';
    form.method = 'POST';
    form.action = this.appSsoStateService.dmiURLLogin;
    var params: any = {
      KEY: key,
    };

    for (var i in params) {
      if (params.hasOwnProperty(i)) {
        var input = document.createElement('input');
        input.type = 'hidden';
        input.name = i;
        input.value = params[i];
        form.appendChild(input);
      }
    }

    document.body.appendChild(form);
    form.submit();
    // setTimeout(() => window.open('', 'popup'),3000)
  }

  isLoanAccount(account) {
    return account?.productKindName === ('Loan' || 'loan') ? true : false;
  }

  getExternalTypeId(product: any) {
    return true ? Number(product?.externalTypeId) > 1000 : false;
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
