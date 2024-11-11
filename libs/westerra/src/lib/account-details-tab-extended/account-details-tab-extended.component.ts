/* eslint-disable import/no-extraneous-dependencies */
import {
  AccountsPaymentsCommunication,
  AccountsTransactionsJourneyService,
  ExternalAccountAggregationService,
  FastlinkParamEnum,
  Tab,
} from '@backbase/accounts-transactions-journey-ang';
import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { EMPTY, filter, merge, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { ACCOUNT_ALIAS_DISPLAYING_LEVEL, AccountAliasDisplayingLevel } from '@backbase/internal-at-shared-ui-ang';
import {
  AccountArrangementItem,
  AccountArrangementItem as ProductType,
  AccountDetailsService,
  AccountsExternalInfoService,
  hasExternalInfo,
} from '@backbase/internal-at-shared-data-access-ang';
import { NotificationService } from '@backbase/ui-ang/notification';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ExternalAccountStatus } from './types';
import { AppSsoStateService, SSO } from '@backbase/westerra';
import { ProductSummaryHttpService } from '@backbase/arrangement-manager-http-ang';

@Component({
  selector: 'bb-account-details-tab-extended',
  templateUrl: './account-details-tab-extended.component.html',
  providers: [AccountDetailsService, AccountsExternalInfoService, ExternalAccountAggregationService],
})
export class AccountDetailsTabExtendedComponent implements OnInit, OnDestroy, AfterContentChecked {
  /**
   * Collection of Tabs to be rendered according to the journey layout and routing.
   */
  tabs: Tab[];
  /**
   * Arrangement item to be displayed
   */
  accountArrangementItem$: Observable<AccountArrangementItem | undefined> = merge(
    this.accountDetailsService.details$,
    this.accountDetailsService.details$.pipe(
      filter((details) => details !== undefined && hasExternalInfo(details)),
      switchMap((details) => this.externalInfoService.getAccountsWithExternalInfo$(details as AccountArrangementItem)),
    ),
  );
  /**
   * Returns `true` if `AccountsPaymentsCommunication` was provided
   */
  isCommunicationProvided = false;

  readonly backToAccounts = $localize`:Back to My Accounts|Navigation button@@accounts-details-tab-header-back-navigation-button:Back to My Accounts`;

  /**
   * Observable for external account's aggregation loading status
   */
  isExternalInfoLoading$ = this.externalAccountAggregationService.isLoading$;
  /**
   * Flag to manage "confirm account unlink" modal
   *
   * @default false
   */
  isUnlinkAccountModalOpen = false;
  /**
   * fastlink URL param value
   */
  fastlinkRouteParam: Observable<FastlinkParamEnum> = this.route.params.pipe(map((params) => params.fastlink));
  /**
   * Flag to show ongoing account refresh alert
   *
   * @default false
   */
  showOngoingAccountRefreshAlert = false;
  /**
   * Flag to show ongoing account update alert
   *
   * @default false
   */
  showOngoingAccountUpdateAlert = false;
  /**
   * Subjects that emits when there is an ongoing aggregation
   */
  readonly refreshAggregationSubject$ = new Subject();
  readonly fastlinkParamEnum = FastlinkParamEnum;
  readonly knownExternalAccountStatuses: string[] = [
    ExternalAccountStatus.PERMANENT_FAILURE,
    ExternalAccountStatus.TEMPORARY_FAILURE,
    ExternalAccountStatus.USER_ACTION_REQUIRED,
    ExternalAccountStatus.MULTI_FACTOR_AUTH_REQUIRED,
    ExternalAccountStatus.CREDENTIALS_UPDATE_REQUIRED,
    ExternalAccountStatus.USER_ACTION_AND_CREDENTIALS_UPDATE_REQUIRED,
    ExternalAccountStatus.UNKNOWN,
  ];

  private unsubscribeSubject = new Subject<void>();

  public selectorWidget: any = null;
  public selectorWidgetContext: any = null;
  public showError = false;
  public isLoading = false;
  public sso = SSO;
  public errorMessage = '';
  public key = '';
  public productsSummaryList = [];
  public businessFunctionRequestParam = {
    businessFunction: 'Product Summary',
    resourceName: 'Product Summary',
    privilege: 'view',
    size: 1000000,
  };

  /*
   * @internal
   */
  constructor(
    @Optional()
    @Inject(ACCOUNT_ALIAS_DISPLAYING_LEVEL)
    readonly accountAliasDisplayingLevel: AccountAliasDisplayingLevel,
    readonly config: AccountsTransactionsJourneyService,
    private readonly accountDetailsService: AccountDetailsService,
    private readonly externalAccountAggregationService: ExternalAccountAggregationService,
    @Optional()
    private accountsPaymentsCommunication: AccountsPaymentsCommunication,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly externalInfoService: AccountsExternalInfoService,
    private readonly notificationService: NotificationService,
    private appSsoStateService: AppSsoStateService,
    private cdr: ChangeDetectorRef,
    private productSummaryService: ProductSummaryHttpService,
  ) {
    const { routeConfig } = this.route.snapshot;

    this.tabs = routeConfig?.children ? this.initializeTabs(routeConfig) : [];
    this.accountAliasDisplayingLevel = accountAliasDisplayingLevel || config.accountAliasDisplayLevel;
    this.isCommunicationProvided = !!accountsPaymentsCommunication;
  }

  /*
   * @internal
   */
  ngOnInit() {
    this.accountDetailsService.setRequestParameters(of(this.getSelectedAccount()));

    this.accountDetailsService.getDetails$(this.getSelectedAccount()).subscribe((res: any) => {
      this.cdr.detectChanges();
      this.fetchSelectedAccount(res);
    });

    this.subscribeToAccountUnlinkingEvents();

    this.tabs = this.tabs.map((val) => {
      if (val.title == 'Transactions') {
        val.title = 'List';
      }
      if (val.title == 'Account Details') {
        val.title = 'Details';
      }
      return val;
    });
  }

  ngAfterContentChecked(): void {
    this.updateTabHighlight();
  }

  /**
   * Specifies whether `repay` action can be initiated for provided AccountArrangementItem
   *
   * @param accountArrangementItem
   */
  canInitiateRepay(accountArrangementItem: AccountArrangementItem): boolean {
    return this.isQuickActionsAllowed(accountArrangementItem) && accountArrangementItem.creditAccount === true;
  }

  /**
   * Specifies whether `cash advance` action can be initiated for provided AccountArrangementItem
   *
   * @param accountArrangementItem
   */
  canInitiateCashInAdvance(accountArrangementItem: AccountArrangementItem): boolean {
    return this.isQuickActionsAllowed(accountArrangementItem) && accountArrangementItem.debitAccount === true;
  }

  /**
   * Event handler for the `repayInitiated` event of `bb-account-graphical-header`
   * Initiates the event by running the corresponding method from communication protocol
   *
   * @param arrangementId
   */
  onRepayInitiated(arrangementId: string | undefined) {
    if (arrangementId && this.accountsPaymentsCommunication) {
      this.accountsPaymentsCommunication.repayEvent(arrangementId);
    }
  }

  /**
   * Event handler for the `cashAdvanceInitiated` event of `bb-account-graphical-header`
   * Initiates the event by running the corresponding method from communication protocol
   *
   * @param arrangementId
   */
  onCashAdvanceInitiated(arrangementId: string | undefined) {
    if (arrangementId && this.accountsPaymentsCommunication) {
      this.accountsPaymentsCommunication.cashAdvanceEvent(arrangementId);
    }
  }

  /**
   * Navigates back to `My Accounts`
   */
  onNavigateBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  /**
   * Unlinks external account
   */
  unlinkAccount() {
    this.externalAccountAggregationService.unlinkExternalAccount(this.getSelectedAccount());
  }

  /**
   * Event handler for the `click` event of `unlink account` button
   */
  openUnlinkAccountModal() {
    this.isUnlinkAccountModalOpen = true;
  }

  /**
   * Event handler for closing account unlink
   */
  closeUnlinkAccountModal() {
    this.isUnlinkAccountModalOpen = false;
  }

  private isQuickActionsAllowed(accountArrangementItem: AccountArrangementItem): boolean {
    return this.isCommunicationProvided && !hasExternalInfo(accountArrangementItem);
  }

  private initializeTabs({ children = [] }: Route) {
    return children
      .filter((routeItem) => routeItem.path && routeItem.data)
      .map((routeItem, index) => ({
        title: routeItem.data?.title || `Tab${index + 1}`,
        route: routeItem.path || `${index + 1}`,
      }));
  }

  /**
   * Returns selected account from snapshot params of activatedRoute
   *
   * @private
   */
  private getSelectedAccount(): string {
    return this.route.snapshot.params.selectedAccount;
  }

  /**
   * Subscribes to account unlinking events
   *
   * @private
   */
  private subscribeToAccountUnlinkingEvents() {
    this.externalAccountAggregationService.error$.pipe(takeUntil(this.unsubscribeSubject)).subscribe(() => {
      this.notificationService.showNotification({
        header: $localize`:Unlink account error|unlink account error@@accounts-transactions-journey.notification.unlink-account-error:Error`,
        message: $localize`:Unlink account error message|unlink account error message@@accounts-transactions-journey.notification.unlink-account-error-message:An unexpected error has occurred! Try again later.`,
        modifier: 'error',
      });
    });

    this.externalAccountAggregationService.unlink$.pipe(takeUntil(this.unsubscribeSubject)).subscribe(() => {
      this.notificationService.showNotification({
        message: $localize`:Account successfully unlinked|unlink account success message@@accounts-transactions-journey.notification.unlink-account-success-message:Account Successfully Unlinked.`,
        modifier: 'success',
      });

      this.onNavigateBack();
    });
  }

  selectTab(route: string) {
    let tabData = document.querySelectorAll('div.nav-item > a.nav-link');
    if (tabData?.length && tabData[1]?.className.includes('link-activated') && route === 'list') {
      tabData[0].className = 'nav-link active';
      tabData[1].className = 'nav-link';
    }

    this.router.navigate([route], { relativeTo: this.route });
  }

  onClickTab($event: any) {
    $event.stopPropagation();
    $event.preventDefault();
  }

  onItemSelect(selectedAccount) {
    this.fetchSelectedAccount();
    this.selectTab('list');
    this.router.navigate(['.', { selectedAccount }], {
      relativeTo: this.route,
    });
  }

  fetchSelectedAccount(product: any = null) {
    this.cdr.detectChanges();
    this.selectorWidget = document.getElementsByTagName('bb-product-summary-account-selector-item')[0];
    this.selectorWidgetContext = product ? product : this.selectorWidget?.['__ngContext__']?.[8]?.context;

    !this.checkIfAccountOnDisplayIsUpdated()
      ? this.appSsoStateService.setAccountOnDisplay(this.selectorWidgetContext)
      : '';

    this.getBusinessFunctionData();

    this.cdr.detectChanges();
  }

  getBusinessFunctionData() {
    this.productSummaryService.getArrangementsByBusinessFunction(this.businessFunctionRequestParam).subscribe((res) => {
      this.productsSummaryList = res;
      let accountExistIndex = this.productsSummaryList.findIndex(
        (item) => item.id === this.appSsoStateService.getAccountOnDisplay().id,
      );
      if (accountExistIndex !== -1) {
        this.appSsoStateService.setAccountOnDisplay(this.productsSummaryList[accountExistIndex]);
      }
    });
  }

  checkIfAccountOnDisplayIsUpdated() {
    let isUpdated = false;
    isUpdated =
      this.appSsoStateService.getAccountOnDisplay() === (null || undefined || this.selectorWidgetContext)
        ? true
        : false;
    return isUpdated;
  }

  fetchProductKindName() {
    return this.selectorWidgetContext?.productKindName === 'Loan' ? true : false;
  }

  fetchProductKind(item: any) {
    return item?.kind;
  }

  ssoDMI(item: any) {
    this.isLoading = true;
    this.showError = false;
    this.errorMessage = '';

    this.appSsoStateService
      .getSessionState(item?.id, this.sso.dmi)
      .pipe(
        mergeMap((data) => {
          this.key = data?.ssourl;
          return this.appSsoStateService.getProfile();
        }),
        catchError((err) => {
          console.log(err);
          this.showError = true;
          this.isLoading = false;
          const error = err?.error;
          this.errorMessage = error?.message;
          this.cdr.detectChanges();
          return EMPTY;
        }),
      )
      .subscribe((res) => {
        this.isLoading = false;
        this.postDMI(this.key);
        this.cdr.detectChanges();
      });
  }

  postDMI(key: string) {
    var form = document.createElement('form');
    form.target = 'view';
    form.method = 'POST';
    form.action = this.appSsoStateService.dmiURLForMakePayment;
    var params: any = {
      KEY: key,
      DisplayPage: 'OneTimeScheduledPayment',
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
  }

  getExternalTypeId() {
    // return true ? Number(item?.product.externalTypeId) > 1000 : false;
    return Number(this.selectorWidgetContext?.productNumber) > 1000 ? true : false;
  }

  updateTabHighlight() {
    let activeRoute: any = this.route;
    let detailsRouteActive = activeRoute._routerState.snapshot.url.includes('/list' || '/list/details') ? false : true;
    if (detailsRouteActive) {
      let tabData = document.querySelectorAll('div.nav-item > a.nav-link');
      if (tabData?.length && !tabData[1]?.className.includes('active')) {
        tabData[0].className = 'nav-link';
        tabData[1].className = 'nav-link active link-activated';
        this.selectTab('details');
      }
    }
  }

  ngOnDestroy() {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
}
