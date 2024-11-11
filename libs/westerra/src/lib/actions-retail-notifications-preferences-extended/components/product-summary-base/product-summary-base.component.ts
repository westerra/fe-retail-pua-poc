import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductKinds, ProductSummaryBaseService } from '../../services/product-summary-base.service';
import { PubSubService } from '@backbase/foundation-ang/web-sdk';
import { AccountsExternalInfoService } from '../../services/accounts-external-info.service';
import { BehaviorSubject, Observable, filter, map, merge, switchMap } from 'rxjs';
import { getErrorMessage, hasExternalInfo } from '@backbase/actions-retail-notification-preferences-journey-util';
import { WidgetProperty } from '../../models/model';

@Component({
  selector: 'bb-product-summary-base',
  templateUrl: './product-summary-base.component.html',
})
export class ProductSummaryBaseComponent implements OnInit {
  protected readonly service: ProductSummaryBaseService;
  protected readonly accountsExternalInfoService: AccountsExternalInfoService;
  protected readonly eventBusService: PubSubService;
  /**
   * If the fetching of the product kinds failed, this property
   * holds the errors coming from the server
   */
  readonly error: Observable<string | undefined>;
  /**
   * Product kinds fetched from the server
   */
  readonly items: Observable<ProductKinds | undefined | any>;
  /**
   * Defines the loading state during the loading of data.
   */
  readonly isLoading: Observable<boolean>;
  /**
   * Indicates whether the product kind card is expanded or collapsed.
   */
  readonly isExpanded: {
    [key: string]: boolean;
  };
  /**
   * Defines whether to show product kind icons.
   */
  readonly showIcons: BehaviorSubject<boolean>;
  /**
   * Output emits id from selected account as string
   */
  @Output() selectedAccount: EventEmitter<string>;

  @Input() set showIconsValue(value: boolean) {
    this.showIcons.next(value);
  }
  /**
   * Comma separated list of event names to subscribe to perform accounts refresh
   */
  @Input() set refreshAccountListEvent(value: string) {
    if (value && typeof value === 'string') {
      this.refreshAccountsEventNames = value.replace(/ /g, '').split(',');
      this.handleEvents(this.refreshAccountsEventNames, this.refreshAccountsHandler, false);
      this.handleEvents(this.refreshAccountsEventNames, this.refreshAccountsHandler);
    }
  }

  private refreshAccountsEventNames;
  private refreshAccountsHandler;
  private getProductsFromProductKinds;
  private addProductsToProductKinds;
  /**
   * Constructor
   *
   * @param service
   * @param accountsExternalInfoService
   * @param eventBusService
   */
  constructor(
    service: ProductSummaryBaseService,
    accountsExternalInfoService: AccountsExternalInfoService,
    eventBusService: PubSubService,
  ) {
    this.service = service;
    this.accountsExternalInfoService = accountsExternalInfoService;
    this.eventBusService = eventBusService;
    /**
     * If the fetching of the product kinds failed, this property
     * holds the errors coming from the server
     */
    this.error = this.service.loadingError$.pipe(map((error) => error && getErrorMessage(error)));
    /**
     * Product kinds fetched from the server
     */
    this.items = merge(
      this.service.productKinds$,
      this.service.productKinds$.pipe(
        filter((productKinds) => this.getProductsFromProductKinds(productKinds).some(hasExternalInfo)),
        switchMap((productKinds) => this.getProductKindsWithExternalInfo(productKinds)),
      ),
    );
    /**
     * Defines the loading state during the loading of data.
     */
    this.isLoading = this.service.isLoading$;
    /**
     * Indicates whether the product kind card is expanded or collapsed.
     */
    this.isExpanded = {};
    /**
     * Defines whether to show product kind icons.
     */
    this.showIcons = new BehaviorSubject(true);
    /**
     * Output emits id from selected account as string
     */
    this.selectedAccount = new EventEmitter();
    this.refreshAccountsEventNames = [];
    this.refreshAccountsHandler = this.refreshAccounts.bind(this);
    this.getProductsFromProductKinds = (productKinds) =>
      productKinds
        ? productKinds.productKinds.reduce((products, kind) => products.concat(kind.products || []), [])
        : [];
    this.addProductsToProductKinds = (products, productKinds) => ({
      ...productKinds,
      productKinds: productKinds.productKinds.map((account) => ({
        ...account,
        products: account.products?.map((product) => ({
          ...product,
          ...(products.find((item) => item.id === product.id) || {}),
        })),
      })),
    });
  }

  ngOnInit(): void {}

  getProductKindsWithExternalInfo(productKinds) {
    return this.accountsExternalInfoService
      .getAccountsWithExternalInfo$(this.getProductsFromProductKinds(productKinds))
      .pipe(map((products) => this.addProductsToProductKinds(products, productKinds)));
  }
  /**
   * Emit the passed `id` to the `selectedAccount` output
   *
   * @param id
   */
  selectAccount(id) {
    this.selectedAccount.emit(id);
  }
  /**
   * Refreshes list of accounts
   */
  refreshAccounts() {
    this.service.refreshProductKinds();
  }
  /**
   * Subscribes or Unsubscribes on the passed eventNames.
   *
   * @param eventNames list of events.
   * @param listener PubsubListener to be invoced on the events.
   * @param subscribe defines whether the function subscribes or unsubscribes (default: true).
   */
  handleEvents(eventNames, listener, subscribe = true) {
    eventNames.forEach((event) => {
      if (subscribe) {
        this.eventBusService?.subscribe(event, listener);
      } else {
        this.eventBusService?.unsubscribe(event, listener);
      }
    });
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.handleEvents(this.refreshAccountsEventNames, this.refreshAccountsHandler, false);
    this.showIcons.unsubscribe();
  }
}
