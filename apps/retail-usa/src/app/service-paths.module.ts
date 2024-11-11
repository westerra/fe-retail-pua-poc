import { InjectionToken, NgModule } from '@angular/core';
import { LOANS_JOURNEY_LOANS_BASE_PATH } from '@backbase/loans-journey-ang';
import { environment } from '../environments/environment';
import { WESTERRA_SSO_DATA_CONFIG } from '@backbase/westerra';

export const APP_NOTIFICATIONS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_NOTIFICATIONS_BASE_PATH',
);
export const APP_ENGAGEMENT_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_ENGAGEMENT_BASE_PATH');
export const APP_ACTIONS_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_ACTIONS_BASE_PATH');
export const APP_ARRANGEMENT_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_ARRANGEMENT_BASE_PATH');
export const APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH',
);
export const APP_ACCESS_CONTROL_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_ACCESS_CONTROL_BASE_PATH',
);
export const APP_ACCOUNT_STATEMENT_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_ACCOUNT_STATEMENT_BASE_PATH',
);
export const APP_ARRANGEMENT_MANAGER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_ARRANGEMENT_MANAGER_BASE_PATH',
);
export const APP_AUTHORIZED_USERS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_AUTHORIZED_USERS_BASE_PATH',
);
export const APP_TRANSACTIONS_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_TRANSACTIONS_BASE_PATH');

export const APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH',
);

export const APP_PAYMENT_BATCH_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_PAYMENT_BATCH_BASE_PATH',
);

export const APP_CATEGORIES_MANAGEMENT_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_CATEGORIES_MANAGEMENT_BASE_PATH',
);

export const APP_MESSAGES_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_MESSAGES_BASE_PATH');

export const APP_PLACES_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_PLACES_BASE_PATH');

/**
 * App Payments base paths
 */
export const APP_PAYMENT_ORDER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_PAYMENT_ORDER_BASE_PATH',
);
export const APP_STOP_CHECKS_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_STOP_CHECKS_BASE_PATH');
export const APP_CONTACT_MANAGER_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_CONTACT_MANAGER_BASE_PATH',
);
export const APP_PAYMENT_ORDER_A2A_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_PAYMENT_ORDER_A2A_BASE_PATH',
);
export const APP_PAYMENT_ORDER_OPTIONS_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_PAYMENT_ORDER_OPTIONS_BASE_PATH',
);
export const APP_BILLPAY_INTEGRATOR_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_BILLPAY_INTEGRATOR_BASE_PATH',
);
export const APP_CARDS_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_CARDS_BASE_PATH');
export const APP_BUDGETING_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_BUDGETING_BASE_PATH');
export const APP_POCKET_TAILOR_BASE_PATH = new InjectionToken<string>(
  'ServicePathsModule::APP_POCKET_TAILOR_BASE_PATH',
);
export const APP_LOANS_JOURNEY_BASE_PATH = new InjectionToken<string>('ServicePathsModule::APP_LOANS_BASE_PATH');

@NgModule({
  providers: [
    {
      provide: APP_PAYMENT_BATCH_BASE_PATH,
      useValue: `${environment.apiRoot}/batch-manager`,
    },
    {
      provide: APP_NOTIFICATIONS_BASE_PATH,
      useValue: `${environment.apiRoot}/notifications-service`,
    },
    {
      provide: APP_ACTIONS_BASE_PATH,
      useValue: `${environment.apiRoot}/action`,
    },
    {
      provide: APP_ARRANGEMENT_BASE_PATH,
      useValue: `${environment.apiRoot}/arrangement-manager`,
    },
    {
      provide: APP_ARRANGEMENT_MANAGER_BASE_PATH,
      useValue: `${environment.apiRoot}/arrangement-manager`,
    },
    {
      provide: APP_AUTHORIZED_USERS_BASE_PATH,
      useValue: `${environment.apiRoot}/authorized-user`,
    },
    {
      provide: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useValue: `${environment.apiRoot}/financial-institution-manager`,
    },
    {
      provide: APP_TRANSACTIONS_BASE_PATH,
      useValue: `${environment.apiRoot}/transaction-manager`,
    },
    {
      provide: APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
      useValue: `${environment.apiRoot}/external-account-aggregator`,
    },
    {
      provide: APP_CATEGORIES_MANAGEMENT_BASE_PATH,
      useValue: `${environment.apiRoot}/transaction-category-collector`,
    },
    {
      provide: APP_MESSAGES_BASE_PATH,
      useValue: `${environment.apiRoot}/messages-service`,
    },
    {
      provide: APP_ENGAGEMENT_BASE_PATH,
      useValue: `${environment.apiRoot}/engagement`,
    },
    {
      provide: APP_ACCESS_CONTROL_BASE_PATH,
      useValue: `${environment.apiRoot}/access-control`,
    },
    {
      provide: APP_ACCOUNT_STATEMENT_BASE_PATH,
      useValue: `${environment.apiRoot}/account-statement`,
    },
    {
      provide: APP_PLACES_BASE_PATH,
      useValue: `${environment.apiRoot}/places-presentation-service`,
    },
    // Payments
    {
      provide: APP_PAYMENT_ORDER_BASE_PATH,
      useValue: `${environment.apiRoot}/payment-order-service`,
    },
    {
      provide: APP_STOP_CHECKS_BASE_PATH,
      useValue: `${environment.apiRoot}/stop-checks`,
    },
    {
      provide: APP_CONTACT_MANAGER_BASE_PATH,
      useValue: `${environment.apiRoot}/contact-manager`,
    },
    {
      provide: APP_PAYMENT_ORDER_A2A_BASE_PATH,
      useValue: `${environment.apiRoot}/payment-order-a2a`,
    },
    {
      provide: APP_PAYMENT_ORDER_OPTIONS_BASE_PATH,
      useValue: `${environment.apiRoot}/payment-order-options`,
    },
    {
      provide: APP_BILLPAY_INTEGRATOR_BASE_PATH,
      useValue: `${environment.apiRoot}/billpay-integrator`,
    },
    // Cards
    {
      provide: APP_CARDS_BASE_PATH,
      useValue: `${environment.apiRoot}/cards-presentation-service`,
    },
    // Budgets
    {
      provide: APP_BUDGETING_BASE_PATH,
      useValue: `${environment.apiRoot}/budget-planner`,
    },
    // Pockets
    {
      provide: APP_POCKET_TAILOR_BASE_PATH,
      useValue: `${environment.apiRoot}/pocket-tailor`,
    },
    // Loans
    {
      provide: APP_LOANS_JOURNEY_BASE_PATH,
      useValue: `${environment.apiRoot}/loan`,
    },
    {
      provide: LOANS_JOURNEY_LOANS_BASE_PATH,
      useExisting: APP_LOANS_JOURNEY_BASE_PATH,
    },
    {
      provide: WESTERRA_SSO_DATA_CONFIG,
      useValue: {
        apiRoot: `${environment.apiRoot}`
      }
    }
  ],
})
export class ServicePathsModule {}
