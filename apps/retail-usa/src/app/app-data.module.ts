/*
 *
 * The content of this file can be edited freely, but to maintain upgradability
 * this file should not be renamed and should always export an Angular module named
 * `AppDataModule`.
 *
 *
 */
import { InjectionToken, NgModule } from '@angular/core';
import { ACCOUNT_RECOVERY_MANAGER_BASE_PATH } from '@backbase/account-recovery-manager-v1-client-ang';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/accesscontrol-v3-http-ang';
import { ACCESS_CONTROL_BASE_PATH as ACCESS_CONTROL_V3_BASE_PATH } from '@backbase/accesscontrol-v3-http-ang';
import { ACCOUNT_STATEMENT_BASE_PATH } from '@backbase/account-statements-http-ang';
import { ARRANGEMENT_MANAGER_BASE_PATH } from '@backbase/arrangement-manager-http-ang';
import { AUTHORIZED_USER_BASE_PATH } from '@backbase/authorized-user-http-ang';
import { BILLPAY_BASE_PATH } from '@backbase/billpay-http-ang';
import { CARDS_BASE_PATH } from '@backbase/cards-http-ang';
import { CATEGORIES_MANAGEMENT_BASE_PATH } from '@backbase/categories-management-http-ang';
import { CONSENT_BASE_PATH } from '@backbase/consent-http-ang';
import { CONTACT_MANAGER_BASE_PATH } from '@backbase/contact-manager-http-ang';
import { DEVICE_BASE_PATH } from '@backbase/device-http-ang';
import { ENGAGEMENT_BASE_PATH } from '@backbase/engagement-http-ang';
import { FINANCIAL_INSTITUTION_MANAGER_BASE_PATH } from '@backbase/financial-institution-manager-http-ang';
import { IMPERSONATION_BASE_PATH } from '@backbase/impersonation-v1-client-ang';
import { LOANS_BASE_PATH } from '@backbase/loans-http-ang';
import { PAYMENT_ORDER_BASE_PATH } from '@backbase/payment-order-v3-http-ang';
import { PAYMENT_ORDER_A2A_BASE_PATH } from '@backbase/payment-order-a2a-http-ang';
import { PLACES_BASE_PATH } from '@backbase/places-http-ang';
import { POCKET_TAILOR_BASE_PATH } from '@backbase/pocket-tailor-http-ang';
import { STOP_CHECKS_BASE_PATH } from '@backbase/stop-checks-http-ang';
import { TRANSACTIONS_BASE_PATH } from '@backbase/transactions-http-ang';
import { USER_BASE_PATH } from '@backbase/user-http-ang';
import { ENROLLMENT_MANAGER_BASE_PATH } from '@backbase/enrollment-manager-v1-client-ang';
import { environment } from '../environments/environment';
import { RTC_V1_BASE_PATH } from '@backbase/rtc-v1-client-ang';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { BUDGET_JOURNEY_BUDGETING_BASE_PATH } from '@backbase/budget-journey-ang';

/**
 * Service paths for the individual data modules.
 *
 * The values provided here are mapped to FactoryProviders in the AppDataModules
 * module below, using the servicePathFactory function above to create the
 * factory for each injection token.
 *
 * If for some reason you do not want to use the servicePathFactory to provide
 * the base path for a service, remove it from this array and add a separate
 * provider for it to the AppDataModules module, below.
 *
 * The entries in this array may be edited, added or removed as required, but
 * deleting or renaming the array itself may prevent future upgrades being
 * correctly applied.
 */
const dataModulePaths: [InjectionToken<string>, string][] = [
  [ACCESS_CONTROL_BASE_PATH, '/access-control'],
  [ACCESS_CONTROL_V3_BASE_PATH, '/access-control'],
  [ACCOUNT_STATEMENT_BASE_PATH, '/account-statement'],
  [ARRANGEMENT_MANAGER_BASE_PATH, '/arrangement-manager'],
  [AUTHORIZED_USER_BASE_PATH, '/authorized-user'],
  [BILLPAY_BASE_PATH, '/billpay-integrator'],
  [BUDGET_JOURNEY_BUDGETING_BASE_PATH, '/budget-planner'],
  [CARDS_BASE_PATH, '/cards-presentation-service'],
  [CATEGORIES_MANAGEMENT_BASE_PATH, '/transaction-category-collector'],
  [CONSENT_BASE_PATH, '/consent'],
  [CONTACT_MANAGER_BASE_PATH, '/contact-manager'],
  [DEVICE_BASE_PATH, '/device-management-service'],
  [ENGAGEMENT_BASE_PATH, '/engagement'],
  [ENROLLMENT_MANAGER_BASE_PATH, '/enrollment-manager'],
  [FINANCIAL_INSTITUTION_MANAGER_BASE_PATH, '/financial-institution-manager'],
  [PAYMENT_ORDER_BASE_PATH, '/payment-order-service'],
  [PAYMENT_ORDER_A2A_BASE_PATH, '/payment-order-a2a'],
  [PLACES_BASE_PATH, '/places-presentation-service'],
  [STOP_CHECKS_BASE_PATH, '/stop-checks'],
  [TRANSACTIONS_BASE_PATH, '/transaction-manager'],
  [USER_BASE_PATH, '/user-manager'],
  [ENGAGEMENT_BASE_PATH, '/engagement'],
  [LOANS_BASE_PATH, '/loan'],
  [POCKET_TAILOR_BASE_PATH, '/pocket-tailor'],
  [IMPERSONATION_BASE_PATH, '/orchestration'],
  [ACCOUNT_RECOVERY_MANAGER_BASE_PATH, '/account-recovery-manager'],
  [RTC_V1_BASE_PATH, '/rtc'],
];

/**
 * This module is added to the `imports` array of the AppModule in app.module.ts.
 *
 * Service configuration may be customised by modifying the relevant
 * `*_BASE_PATH` provider token value or by adding a `ModuleWithProvider`
 * as an import to this module by calling `.forRoot` on an API module:
 *
 * ```
 * @NgModule({
 *   providers: [...],
 *   imports: [
 *     AuditApiModule.forRoot(() => new AuditConfiguration({ ... }))
 *   ]
 * })
 * export class AppDataModules {}
 * ```
 */
@NgModule({
  declarations: [MaintenanceComponent],
  providers: [
    ...dataModulePaths.map(([token, servicePath]) => ({
      provide: token,
      useValue: `${environment.apiRoot}${servicePath}`,
    })),
  ],
})
export class AppDataModule {}
