/* eslint-disable import/no-extraneous-dependencies */
import { ChangeDetectorRef, Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductKindUri } from '@backbase/internal-at-shared-util-ang';
import { NotificationService } from '@backbase/ui-ang/notification';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { AccountsExternalInfoService, hasExternalInfo } from '@backbase/internal-at-shared-data-access-ang';
import {
  AccountsTransactionsJourneyService,
  ExternalAccountAggregationService,
  AccountsCommunicationService,
  AccountsStateCommunicationService,
} from '@backbase/accounts-transactions-journey-ang';
import { AccountsDataService } from '../accounts-list/services/account-data.service';
import { ProductKinds } from '@backbase/product-summary-common-ang';
import { AccountSummary } from '../accounts-list/types';

@Component({
  template: '',
  providers: [AccountsDataService],
})
export class AccountsListBaseComponent implements OnInit, OnDestroy {
  /**
   * If the fetching of the product kinds failed, this property
   * holds the errors coming from the server
   */
  readonly loadingError$: Observable<string | undefined> = this.productKindsService.loadingErrorMessage$;
  /**
   * Defines the loading state during the loading of data.
   */
  readonly isLoading$: Observable<boolean> = this.productKindsService.isLoading$;
  /**
   * Product kinds fetched from the server
   */
  public productKinds$: Observable<unknown> = merge(
    this.productKindsService.data$,
    this.productKindsService.data$.pipe(
      filter((productKinds) => this.getAccountsFromProductKinds(productKinds as ProductKinds).some(hasExternalInfo)),
      switchMap((productKinds) => this.getProductKindsWithExternalInfo(productKinds as ProductKinds)),
    ),
  );

  /**
   * @deprecated
   * Use `accounts-transactions-journey.accounts-list.heading` translation id to customize the label
   *
   * Label for accounts list title
   */
  readonly myAccounts = $localize`:My accounts heading|my accounts heading@@accounts-transactions-journey.accounts-list.heading.myAccounts:My Accounts`;
  /**
   * @deprecated
   * Use `accounts-transactions-journey.accounts-list.buttonTitle.manageAccounts` translation id to customize the label
   *
   * Label for manage accounts menu dropdown
   */
  readonly manageAccounts = $localize`:Manage accounts button title|manage accounts button title@@accounts-transactions-journey.accounts-list.buttonTitle.manageAccounts:Manage Accounts`;
  /**
   * @deprecated
   * Use `accounts-transactions-journey.accounts-list.buttonTitle.editAccounts` translation id to customize the label
   *
   * Label for edit accounts navigation button
   */
  readonly editAccounts = $localize`:Edit accounts button title|edit accounts button title@@accounts-transactions-journey.accounts-list.buttonTitle.editAccounts:Edit Accounts`;
  /**
   * @deprecated
   * Use `accounts-transactions-journey.accounts-list.buttonTitle.connectExternalAccount` translation id to customize the label
   *
   * Label for connect an external account button
   */
  readonly connectExternalAccount = $localize`:Connect an external account button title|connect an external account button title@@accounts-transactions-journey.accounts-list.buttonTitle.connectExternalAccount:Connect an External Account`;

  /**
   * Subjects that emits when there is an ongoing aggregation
   */
  readonly ongoingAggregationSubject$ = new Subject();
  /**
   * Observable with ongoingAggregationSubject$ as the source
   */
  readonly ongoingAggregation$ = this.ongoingAggregationSubject$.asObservable();
  /**
   * Show fastlink modal
   */
  showFastLink = false;

  private unsubscribeSubject = new Subject<void>();

  /**
   * @internal
   */
  constructor(
    /**
     * Journey configuration
     */
    readonly config: AccountsTransactionsJourneyService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    readonly externalAccountAggregationService: ExternalAccountAggregationService,
    private readonly notificationService: NotificationService,
    @Optional() private readonly accountsCommunicationService: AccountsCommunicationService,
    @Optional() private readonly accountsStateCommunication: AccountsStateCommunicationService,

    protected readonly productKindsService: AccountsDataService<ProductKinds, any>,
    private readonly accountsExternalInfoService: AccountsExternalInfoService,
  ) {}
  /**
   * @internal
   */
  ngOnInit(): void {
    this.externalAccountAggregationService.aggregationFlowMetadata$
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(() => {
        this.showFastLink = true;
        this.changeDetectorRef.detectChanges();
      });

    this.externalAccountAggregationService.error$.pipe(takeUntil(this.unsubscribeSubject)).subscribe(() => {
      this.notificationService.showNotification({
        header: $localize`:Fastlink error|fastlink error@@accounts-transactions-journey.notification.fastlink-error:Something Went Wrong`,
        message: $localize`:Fastlink error message|fastlink error message@@accounts-transactions-journey.notification.fastlink-error-message:There was an error loading this page. Please try again.`,
        modifier: 'error',
      });
    });

    this.ongoingAggregation$
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe(() => this.externalAccountAggregationService.initiateExternalAccountsPolling());

    this.accountsStateCommunication?.setupAccountsState({
      refreshAccounts: () => this.productKindsService.refreshData(),
    });
  }

  /**
   * Navigates to selected product details
   *
   * @param product
   */
  onProductSelect(product: AccountSummary) {
    const id = product.id ?? '';
    const kind = this.getProductKind(product);

    if (this.accountsCommunicationService && this.productKindsWithExternalDetailsPage.includes(kind)) {
      this.accountsCommunicationService.navigateToExternalAccountDetails({
        id,
        kind,
      });
    } else {
      this.navigateToAccountDetails(id);
    }
  }

  /**
   * Navigates to account details by id
   *
   * @param id
   */
  onAccountSelect(id: string) {
    this.navigateToAccountDetails(id);
  }

  /**
   * Navigates to account management
   */
  navigateToAccountManagement() {
    this.router.navigate(['../manage'], { relativeTo: this.route });
  }

  /**
   * Opens fastlink modal to connect an external account
   */
  openFastLink() {
    this.externalAccountAggregationService.fetchFlowMetadata();
  }

  /**
   * Closes fastlink modal
   */
  closeFastLink() {
    this.showFastLink = false;
    this.changeDetectorRef.detectChanges();
  }

  /**
   * @internal
   */
  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }

  private navigateToAccountDetails(selectedAccount: string): void {
    this.router.navigate(['../transactions', { selectedAccount }], {
      relativeTo: this.route,
    });
  }

  private get productKindsWithExternalDetailsPage(): string[] {
    return Array.isArray(this.config.productKindsWithExternalDetailsPage)
      ? this.config.productKindsWithExternalDetailsPage
      : [this.config.productKindsWithExternalDetailsPage];
  }

  private getProductKind(product: AccountSummary): string {
    switch (product.kind) {
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
        return product.kind ?? '';
    }
  }

  private getProductKindsWithExternalInfo(productKinds: ProductKinds): Observable<ProductKinds> {
    return this.accountsExternalInfoService
      .getAccountsWithExternalInfo$(this.getAccountsFromProductKinds(productKinds))
      .pipe(map((products) => this.addAccountsToProductKinds(products, productKinds as ProductKinds)));
  }

  private getAccountsFromProductKinds = (productKinds?: ProductKinds): AccountSummary[] =>
    productKinds
      ? productKinds.productKinds.reduce(
          (products, kind) => products.concat(kind.products || []),
          [] as AccountSummary[],
        )
      : [];

  private addAccountsToProductKinds = (accounts: AccountSummary[], productKinds: ProductKinds): ProductKinds => ({
    ...productKinds,
    productKinds: productKinds.productKinds.map((account) => ({
      ...account,
      products: account.products?.map((product) => ({
        ...product,
        ...(accounts.find((item) => item.id === product.id) || {}),
      })),
    })),
  });
}
