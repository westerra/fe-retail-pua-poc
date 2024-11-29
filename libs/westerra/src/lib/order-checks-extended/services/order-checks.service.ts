import { Injectable } from '@angular/core';
import { ProductSummaryHttpService } from '@backbase/arrangement-manager-http-ang';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderChecksService {
  public businessFunctionRequestParam = {
    businessFunction: 'Product Summary',
    resourceName: 'Product Summary',
    privilege: 'view',
    size: 1000000,
  };

  constructor(private productHttpService: ProductSummaryHttpService) {}

  /**
   * Returns a list of arrangements/products that can be used for order checks.
   *
   * @param params - The request parameters.
   * @returns A list of arrangements/products.
   */
  getOrderChecksAcceptableProducts(params = this.businessFunctionRequestParam) {
    // Returns a list of arrangements/products that can be used for order checks
    return this.productHttpService.getArrangementsByBusinessFunction(params).pipe(
      map((data: any) => {
        const accountList = [];
        data.forEach((account) => {
          if (this.displayOrderChecks(account.productKindName, account.productNumber)) {
            accountList.push(account);
          }
        });
        return accountList;
      }),
    );
  }

  /**
   * Checks if the given account type and product number are acceptable for order checks.
   * @param accountType - The type of account, e.g. "Current Account", "Savings Account".
   * @param productNumber - The product number of the account, e.g. "19", "45", "49".
   * @returns `true` if the account type and product number are acceptable, `false` otherwise.
   *
   * "Order Checks" button should be displayed only for Spending Accounts, and Savings Account types 19, 45 or 49.
   */
  displayOrderChecks(accountType: string, productNumber: string): boolean {
    let productKindAcceptable = false;
    let productNumberAcceptable = false;

    switch (accountType) {
      case 'Current Account':
      case 'Current Accounts':
      case 'Spending Accounts':
        productNumberAcceptable = true;
        productKindAcceptable = true;
        break;
      case 'Savings Accounts':
      case 'Savings Account':
        productKindAcceptable = true;
        break;
    }

    if (accountType.includes('Savings')) {
      switch (productNumber) {
        case '19':
        case '45':
        case '49':
          productNumberAcceptable = true;
      }
    }

    return productKindAcceptable && productNumberAcceptable;
  }
}
