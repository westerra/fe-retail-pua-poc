/* eslint-disable import/no-extraneous-dependencies */
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GetProductSummaryRequestParams, ProductSummaryHttpService } from '@backbase/arrangement-manager-http-ang';
import { ProductKindUri } from '@backbase/internal-at-shared-util-ang';
import { AccountsDataService } from './account-data.service';
import { ProductKinds } from '@backbase/product-summary-common-ang';
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
@Injectable({
  providedIn: 'root',
})
export class ProductSummaryService extends AccountsDataService<ProductKinds, GetProductSummaryRequestParams> {
  /**
   * @internal
   */
  constructor(public productSummaryDataService: ProductSummaryHttpService) {
    super();
    this.setRequestParameters({});
  }
  getData$(params) {
    return this.productSummaryDataService.getProductSummary(params).pipe(map((res) => responseToProductKinds(res)));
  }
}
