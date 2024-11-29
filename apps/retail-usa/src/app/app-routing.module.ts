/* eslint-disable @nrwl/nx/enforce-module-boundaries */
/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an Angular module named
 * `AppRoutingModule`.
 *
 *
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';
import { AuthGuard } from '@backbase/shared/feature/auth';
import { SharedUserContextGuard } from '@backbase/shared/feature/user-context';
import { PERMISSIONS } from './auth/permissions';
import { IdentityJourneyWrapperComponent } from './journeys/wrapper-component/journey-wrapper.component';
import { LayoutComponent } from './layout/layout.component';
import { CardsRewardsComponent, EnrollmentWrapperComponent } from '@backbase/westerra';


//TODO: Find a more elegant solution to decide what landing page to choose
// in the event that the default one is not available due to entitlements

const routes: Routes = [
  // To be used for and commented after maintenance
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: 'maintenance',
  // },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'my-accounts',
  },
  {
    path: 'select-context',
    loadChildren: () => import('./user-context/user-context.module').then((m) => m.UserContextModule),
    data: {
      title: $localize`:@@context-selection.nav.item.title:Select Context`,
    },
    canActivate: [AuthGuard],
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'my-accounts',
      },
      {
        path: 'my-accounts',
        data: {
          entitlements: PERMISSIONS.canViewMyAccounts,
          cssClasses: ['container-fluid', 'container'],
          redirectTo: 'transfers/make-a-transfer',
        },
        children: [
          {
            path: '',
            loadChildren: () =>
              import(
                './journeys/accounts/accounts-transactions-wrapper/wrapper-accounts-transactions-journey.module'
              ).then((m) => m.AccountsTransactionsJourneyBundleModule),
          },
          {
            path: 'loans/details',
            children: [
              {
                path: '',
                loadChildren: () =>
                  import('./journeys/accounts/loans/loans-journey-bundle.module').then(
                    (m) => m.LoansJourneyBundleModule,
                  ),
                data: {
                  title: $localize`:@@loans.nav.item.title:Loans - Accounts - Westerra`,
                  entitlements: PERMISSIONS.canViewLoans,
                },
              },
              {
                path: ':selectedAccount',
                loadChildren: () =>
                  import('./journeys/accounts/loans/loan-payments/loan-payment-wrapper-bundle.module').then(
                    (m) => m.LoanPaymentJourneyWrapperBundleModule,
                  ),
                data: {
                  title: $localize`:@@loans-item.nav.item.title:Loan - Accounts - Westerra`,
                  entitlements: PERMISSIONS.canViewLoans,
                },
              },
            ],
          },
        ],
      },
      {
        path: 'pockets',
        loadChildren: () =>
          import('./journeys/accounts/manage-pockets-journey.module').then((m) => m.ManagePocketsJourneyBundleModule),
        data: {
          title: $localize`:@@accounts.nav.item.title:Pockets`,
          entitlements: PERMISSIONS.canViewManagePockets,
          cssClasses: ['container--fixed-width mx-auto'],
          redirectTo: 'pockets',
        },
      },
      {
        path: 'transfers',
        children: [
          {
            path: 'activity',
            loadChildren: () =>
              import('./journeys/transfers/upcoming-and-history-payments.module').then(
                (m) => m.ManageUpcomingAndHistoricalPaymentsJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@activity.nav.item.title:Activity - Transfer - Westerra`,
              entitlements: PERMISSIONS.canViewScheduledTransfers,
              cssClasses: ['container--fixed-width mx-auto'],
            },
          },
          {
            path: 'connected-accounts',
            loadChildren: () =>
              import('./journeys/transfers/connect-external-accounts-journey.module').then(
                (m) => m.ConnectExternalAccountsJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@connected-accounts.nav.item.title:Connected accounts - Transfer - Westerra`,
              entitlements: PERMISSIONS.canViewConnectedAccounts,
              cssClasses: ['container--fixed-width mx-auto'],
            },
          },
          {
            path: 'OneTimePayment',
            loadChildren: () =>
              import('./journeys/bill-pay/bundle-manage-bill-pay-showdashboard.module').then(
                (m) => m.BundleManageBillPayShowdashboardModule,
              ),
            data: {
              title: $localize`:@@one-time-payment-bill.nav.item.title:Pay Bills - One Time Payment - Westerra`,
              entitlements: PERMISSIONS.canViewTransfers,
              cssClasses: ['container--fixed-width-2 mx-auto'],
            },
          },
          {
            path: 'ViewPaymentHistory',
            loadChildren: () =>
              import('./journeys/bill-pay/bundle-manage-bill-pay-showdashboard.module').then(
                (m) => m.BundleManageBillPayShowdashboardModule,
              ),
            data: {
              title: $localize`:@@view-payment-history.nav.item.title:Payment Activity - Westerra`,
              entitlements: PERMISSIONS.canViewTransfers,
              cssClasses: ['container--fixed-width-2 mx-auto'],
            },
          },
          {
            path: 'SendMoneyDashboard',
            loadChildren: () =>
              import('./journeys/bill-pay/bundle-manage-bill-pay-showdashboard.module').then(
                (m) => m.BundleManageBillPayShowdashboardModule,
              ),
            data: {
              title: $localize`:@@external-transfers.nav.item.title:External Transfers and Pay People - Westerra`,
              entitlements: PERMISSIONS.canViewTransfers,
              cssClasses: ['container--fixed-width-2 mx-auto'],
            },
          },
          {
            path: '',
            loadChildren: () =>
              import(
                './journeys/transfers/wrapper-initiate-payment-journey/initiate-payment-wrapper-bundle.module'
              ).then((m) => m.InitiatePaymentWrapperBundleModule),
            data: {
              cssClasses: ['container--fixed-width mx-auto'],
            },
          },
        ],
      },
      // {
      //   path: 'billpay',
      //   children: [
      //     {/
      //       path: 'pay-bills',
      //       loadChildren: () =>
      //         import('./journeys/bill-pay/bundle-pay-bills-journey.module').then((m) => m.PayBillsJourneyBundleModule),
      //       data: {
      //         title: $localize`:@@pay-bill.nav.item.title:Pay a bill - Bill Pay - Westerra`,
      //         entitlements: PERMISSIONS.canViewPayABill,
      //         cssClasses: ['container-fluid', 'container'],
      //         redirectTo: 'pending-bills',
      //       },
      //     },
      //     {/
      //       path: 'pending-bills',
      //       loadChildren: () =>
      //         import('./journeys/bill-pay/bundle-manage-bill-payments-journey.module').then(
      //           (m) => m.ManageBillPaymentsJourneyBundleModule,
      //         ),
      //       data: {
      //         title: $localize`:@@pending-bills.nav.item.title:Pending payments - Bill Pay - Westerra`,
      //         entitlements: PERMISSIONS.canViewPendingPayments,
      //         cssClasses: ['container--fixed-width mx-auto'],
      //         redirectTo: 'history-bills',
      //       },
      //     },
      //     {
      //       path: 'history-bills',
      //       loadChildren: () =>
      //         import('./journeys/bill-pay/bundle-manage-bill-payments-history-journey.module').then(
      //           (m) => m.ManageBillPaymentsHistoryJourneyBundleModule,
      //         ),
      //       data: {
      //         title: $localize`:@@history-bills.nav.item.title:History payments - Bill Pay - Westerra`,
      //         entitlements: PERMISSIONS.canViewHistoryPayments,
      //         cssClasses: ['container--fixed-width mx-auto'],
      //         redirectTo: 'manage-payees',
      //       },
      //     },
      //     {/
      //       path: 'manage-payees',
      //       loadChildren: () =>
      //         import('./journeys/bill-pay/bundle-manage-payees-journey.module').then(
      //           (m) => m.ManagePayeesJourneyBundleModule,
      //         ),
      //       data: {
      //         title: $localize`:@@manage-payees.nav.item.title:Manage payee - Bill Pay - Westerra`,
      //         entitlements: PERMISSIONS.canViewPendingPayments,
      //         cssClasses: ['container--fixed-width mx-auto'],
      //         redirectTo: 'insights',
      //       },
      //     },
      //   ],
      // },
      {
        path: 'transfers/ShowDashboard',
        redirectTo: 'billpay-sso',
        pathMatch: 'full'
      },
     
    

      {
        path: 'billpay-sso',
        loadChildren: () =>
          import('./journeys/bill-pay/bundle-billpay-sso-journey.module').then((m) => m.BillpaySsoJourneyBundleModule),
        data: {
          // entitlements: PERMISSIONS.canViewBillPaySso,
          cssClasses: ['container-fluid container'],
          redirectTo: 'billpay-sso',
        },
        title: $localize`:@@billpay-sso.nav.item.title:Bill Pay`,
      },
      {
        path: 'insights',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'cashflow',
            loadChildren: () =>
              import('./journeys/insights/bundle-turnovers.module').then((m) => m.TurnoversJourneyBundleModule),
            data: {
              title: $localize`:@@cash-flow.nav.item.title:Cash Flow - Analytics - Westerra`,
            },
          },
          {
            path: 'income-analysis',
            loadChildren: () =>
              import('./journeys/insights/bundle-income-analysis.module').then((m) => m.IncomeAnalysisBundleModule),
            data: {
              title: $localize`:@@income-analysis.nav.item.title:Income Analysis - Analytics - Westerra`,
            },
          },
          {
            path: 'spending-analysis',
            loadChildren: () =>
              import('./journeys/insights/bundle-spending-analysis.module').then((m) => m.SpendingAnalysisBundleModule),
            data: {
              title: $localize`:@@spending-analysis.nav.item.title:Spending Analysis - Analytics - Westerra`,
            },
          },
        ],
      },
      {
        path: 'self-service',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'profile',
            loadChildren: () =>
              import('./journeys/self-service/bundle-profile-journey.module').then(
                (m) => m.SelfServiceJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@my-profile.nav.item.title:My profile - Self services - Westerra`,
            },
          },
          {
            path: 'authorized-users',
            loadChildren: () =>
              import('./journeys/self-service/bundle-authorized-users.module').then(
                (m) => m.AuthorizedUsersJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@authorized-users.nav.item.title:Authorized users - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewAuthorizedUsers,
            },
          },
          {
            path: 'manage-cards',
            loadChildren: () =>
              import('./journeys/self-service/bundle-cards-management-journey.module').then(
                (m) => m.CardsManagementJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@manage-cards.nav.item.title:Manage cards - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewManageCards,
            },
          },
          {
            path: 'product-list',
            loadChildren: () =>
              import('./journeys/self-service/bundle-actions-retail-notification-preferences-journey.module').then(
                (m) => m.RetailNotificationPreferencesJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@manage-notifications.nav.item.title:Manage notifications - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewManageNotifications,
            },
          },
          {
            path: 'manage-contacts',
            loadChildren: () =>
              import('./journeys/self-service/bundle-contact-journey.module').then(
                (m) => m.ContactManagerJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@manage-contacts.nav.item.title:Manage contacts - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewManageContacts,
            },
          },
          {
            path: 'stop-checks',
            loadChildren: () =>
              import('./journeys/self-service/wrapper-stop-checks-journey/bundle-stop-checks-wrapper.module').then(
                (m) => m.StopChecksJourneyWrapperBundleModule,
              ),
            data: {
              title: $localize`:@@stop-checks.nav.item.title:Stop checks - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewStopChecks,
            },
          },
          {
            path: 'download-statements',
            loadChildren: () =>
              import('./journeys/self-service/bundle-accounts-statement-retail-journey.module').then(
                (m) => m.AccountStatementRetailJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@download-statements.nav.item.title:Account statements - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewAccountStatements,
            },
          },
          {
            path: 'manage-statements',
            loadChildren: () =>
              import('./journeys/self-service/bundle-manage-statement-retail-journey.module').then(
                (m) => m.ManageStatementsJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@manage-statements.nav.item.title:Manage statements - Self services - Westerra`,
              entitlements: PERMISSIONS.canViewManageStatements,
            },
          },
          {
            path: 'order-checks',
            loadChildren: () =>
              import('./journeys/self-service/bundle-order-checks.module').then((m) => m.OrderChecksBundleModule),
            data: {
              title: $localize`:@@order-checks.nav.item.title:Order checks - Self services - Westerra`,
              cssClasses: ['container-fluid', 'container'],
            },
          },
        ],
      },
      {
        path: 'more',
        data: { cssClasses: ['container--fixed-width mx-auto'] },
        children: [
          {
            path: 'budgets',
            loadChildren: () => import('./journeys/more/bundle-budget.module').then((m) => m.BudgetJourneyBundleModule),
            data: {
              title: $localize`:@@budgets.nav.item.title:Budgets - Westerra`,
              entitlements: PERMISSIONS.canViewBudgets,
            },
          },
          {
            path: 'messages',
            loadChildren: () =>
              import('./journeys/more/bundle-messages-client-inbox-journey-bundle.module').then(
                (m) => m.MessagesClientInboxJourneyBundleModule,
              ),
            data: {
              title: $localize`:@@messages.nav.item.title:Messages - Westerra`,
            },
          },
          {
            path: 'find-us',
            loadChildren: () => import('./journeys/more/bundle-places.module').then((m) => m.PlacesJourneyBundleModule),
            data: {
              title: $localize`:@@places.nav.item.title:Find Us - Westerra`,
              // entitlements: PERMISSIONS.canViewPlaces,
            },
          },
        ],
      },
    ],
    canActivate: [AuthGuard, SharedUserContextGuard],
    canActivateChild: [EntitlementsGuard],
  },
  {
    path: 'consent',
    loadChildren: () =>
      import('./journeys/consent/bundle-consent-journey.module').then((m) => m.ConsentJourneyBundleModule),
  },
  {
    path: 'enrollment',
    // component: IdentityJourneyWrapperComponent,
    component: EnrollmentWrapperComponent,
    data: {
      title: 'Setup online access - Westerra',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./journeys/self-enrollment/self-enrollment-bundle.module').then(
            (m) => m.SelfEnrollmentJourneyBundleModule,
          ),
      },
    ],
  },
  {
    path: 'password-reset',
    component: IdentityJourneyWrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./journeys/password-reset/password-reset-bundle.module').then(
            (m) => m.PasswordResetJourneyBundleModule,
          ),
      },
    ],
  },
  {
    path: 'cardRewards',
    component: CardsRewardsComponent,
  },

  // To be used after maintenance
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'my-accounts',
  },




  // To be used for and commented after maintenance
  // { path: 'maintenance', component: MaintenanceComponent },
];

@NgModule({
  declarations: [IdentityJourneyWrapperComponent],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
