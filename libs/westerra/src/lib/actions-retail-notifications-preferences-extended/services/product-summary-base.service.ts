import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdditionalProperties, GetProductSummaryRequestParams } from '@backbase/arrangement-manager-http-ang';
import { HttpErrorResponse } from '@angular/common/http';
import { ActionsRetailNotificationsPreferencesExtendedModule } from '../actions-retail-notifications-preferences-extended.module';
import { ProductKind, TotalBalance } from './product-summary-notifications.service';
export interface ProductKinds extends AdditionalProperties {
  total?: TotalBalance;
  productKinds: Array<ProductKind>;
}

@Injectable({
  providedIn: 'root',
  // providedIn: ActionsRetailNotificationsPreferencesExtendedModule,
})
export class ProductSummaryBaseService {
  protected readonly listParams: BehaviorSubject<GetProductSummaryRequestParams>;
  protected productKindsRefresh: BehaviorSubject<boolean>;
  /**
   * Used to store the error occured during loading of accounts
   */
  readonly loadingError$: BehaviorSubject<HttpErrorResponse | undefined>;
  /**
   * List of accounts fetched from the server
   */
  readonly isLoading$: BehaviorSubject<boolean>;
  /**
   * List of product kinds (accounts) fetched from the server
   */
  readonly productKinds$: Observable<ProductKinds | undefined>;

  constructor() {
    this.listParams = new BehaviorSubject({});
    this.productKindsRefresh = new BehaviorSubject(false);
    /**
     * Used to store the error occured during loading of accounts
     */
    this.loadingError$ = new BehaviorSubject(undefined);
    /**
     * List of accounts fetched from the server
     */
    this.isLoading$ = new BehaviorSubject(false);
  }
  /**
   * @internal
   */
  ngOnDestroy() {
    this.loadingError$.complete();
    this.productKindsRefresh.complete();
  }
  /**
   * Refreshes the list of product kinds
   * Causes refetching data
   */
  refreshProductKinds() {
    this.productKindsRefresh.next(true);
  }
}
