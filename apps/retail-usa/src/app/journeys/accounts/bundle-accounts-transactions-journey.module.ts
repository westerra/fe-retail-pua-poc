/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule, Provider } from '@angular/core';
import { Route } from '@angular/router';
import {
  AccountAliasDisplayingLevel,
  AccountsCommunicationService,
  AccountsPaymentsCommunication,
  AccountsStateCommunicationService,
  AccountsTransactionsJourneyConfiguration,
  AccountsTransactionsJourneyConfigurationToken,
  AccountsTransactionsJourneyModule,
  ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
  AccountsManageComponent,
  AccountsManageGuardService,
  AccountsTransactionsJourneyComponent,
  TransactionsListComponent,
  AccountsDetailsTabComponent,
  TransactionDetailsComponent,
  AccountInfoViewComponent,
} from '@backbase/accounts-transactions-journey-ang';
import { PubSubService } from '@backbase/foundation-ang/web-sdk';
import {
  AccountsCommunicationService as AccountsCommunicationServiceImplementation,
  AccountsStateCommunicationService as AccountsStateCommunicationServiceImplementation,
  AccountsInitiatePaymentCommunication,
} from '@backbase/retail/feature/communication';
import {
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_CATEGORIES_MANAGEMENT_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_MESSAGES_BASE_PATH,
  APP_TRANSACTIONS_BASE_PATH,
  APP_PAYMENT_BATCH_BASE_PATH,
  APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
} from '../../service-paths.module';
import { environment } from '../../../environments/environment';
import {
  AccountDetailsTabExtendedComponent,
  AccountInfoViewExtendedComponent,
  AccountsListExtendedViewComponent,
  ProductSummaryService,
  TransactionsDetailWrapperComponent,
  TransactionsListViewExtendedComponent,
  customAccountInfoConfiguration,
} from '@backbase/westerra';

const AccountsTransactionsConfigProvider: Provider = {
  provide: AccountsTransactionsJourneyConfigurationToken,
  useValue: {
    apiKey: environment.googleApiKey,
    showCheckImages: true,
    transactionsSortOptions: 'externalId DESC',
    disputeTopicId: '',
    inquireTopicId: '',
    pendingOnTop: true,
    itemsPerPage: 100,
    showChangeCategory: true,
    enableDisputeAndInquiry: false,
    // productKindsWithExternalDetailsPage: ProductKindUri.LOAN,
    accountAliasDisplayLevel: AccountAliasDisplayingLevel.USER,
    arrangementViewsName: 'legacy-summary',
    accountInfoProperties: customAccountInfoConfiguration,
  } as Partial<AccountsTransactionsJourneyConfiguration>,
};

const tabTitles = {
  myAccounts: () =>
    $localize`:My Accounts title@@accounts.transactions.journey.myAccounts.title:My Accounts - Westerra`,
  transactions: () =>
    $localize`:Transactions title@@accounts.transactions.journey.transactions.title:Transactions - Westerra`,
  transactionsList: () =>
    $localize`:Transactions tab title@@accounts.transactions.journey.transactions.tab.title:Transactions`,
  accountDetails: () =>
    $localize`:Account Details tab title@@accounts.transactions.journey.account.details.tab.title:Account Details`,
  manageAccounts: () =>
    $localize`:Manage Accounts title@@accounts-transactions-journey.accounts-list.buttonTitle.manageAccounts:Manage Accounts - Westerra`,
};

const routeCustomConfiguration: Route = {
  path: '',
  component: AccountsTransactionsJourneyComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: AccountsListExtendedViewComponent,
      data: { title: tabTitles.myAccounts() },
    },
    {
      path: 'manage',
      component: AccountsManageComponent,
      data: { title: tabTitles.manageAccounts() },
      canActivate: [AccountsManageGuardService],
    },
    {
      path: 'transactions',
      // component: AccountsDetailsTabComponent,
      component: AccountDetailsTabExtendedComponent,
      data: { title: tabTitles.transactions() },
      children: [
        { path: '', redirectTo: 'list', pathMatch: 'full' },
        {
          path: 'list',
          // component: TransactionsListComponent,
          component: TransactionsListViewExtendedComponent,
          data: { title: tabTitles.transactionsList() },
          children: [
            {
              path: 'detail',
              // component: TransactionDetailsComponent,
              component: TransactionsDetailWrapperComponent,
            },
          ],
        },
        {
          path: 'details',
          // component: AccountInfoViewComponent,
          component: AccountInfoViewExtendedComponent,
          data: { title: tabTitles.accountDetails() },
        },
      ],
    },
  ],
};

@NgModule({
  imports: [AccountsTransactionsJourneyModule.forRoot({ route: routeCustomConfiguration })],
  providers: [
    AccountsTransactionsConfigProvider,
    { provide: AccountsPaymentsCommunication, useExisting: AccountsInitiatePaymentCommunication },
    { provide: AccountsCommunicationService, useExisting: AccountsCommunicationServiceImplementation },
    { provide: AccountsStateCommunicationService, useExisting: AccountsStateCommunicationServiceImplementation },
    PubSubService,
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
      useExisting: APP_CATEGORIES_MANAGEMENT_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
      useExisting: APP_MESSAGES_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
      useExisting: APP_TRANSACTIONS_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
      useExisting: APP_PAYMENT_BATCH_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
      useExisting: APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
    },
    ProductSummaryService,
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
