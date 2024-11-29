/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import {
  RetailNotificationPreferencesJourneyModule,
  RetailNotificationPreferencesJourneyConfiguration,
  RetailNotificationPreferencesJourneyToken,
  RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ENGAGEMENT_BASE_PATH,
  RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  RetailNotificationPreferencesViewComponent,
  ProductNotificationsSettingsComponent,
  ProductSettingsPageComponent,
} from '@backbase/retail-notification-preferences-journey-ang';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/accesscontrol-v3-http-ang';

import {
  APP_ENGAGEMENT_BASE_PATH,
  APP_ARRANGEMENT_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_ACCESS_CONTROL_BASE_PATH,
} from '../../service-paths.module';
import { Route } from '@angular/router';
export const apiModeTypeGuard = (value: string | undefined) => {
  if (value === 'actions' || value === 'engagements') return value;
  return 'engagements';
};

const retailNotificationPreferencesJourneyConfiguration: RetailNotificationPreferencesJourneyConfiguration = {
  notificationDismissTime: 5,
  generalNotificationIds: 'account-balance-low, new-transaction-occurred',
};
export const customNotificationRoutes: Route = {
  path: '',
  children: [
    {
      path: '',
      redirectTo: 'manage-notifications',
      pathMatch: 'full',
    },
    {
      path: 'manage-notifications',
      component: RetailNotificationPreferencesViewComponent,
    },
    {
      path: 'notification-details',
      component: ProductNotificationsSettingsComponent,
      children: [{ path: "", component: ProductSettingsPageComponent }],

    },
  ],
};

@NgModule({
  imports: [RetailNotificationPreferencesJourneyModule.forRoot({routes: customNotificationRoutes})],
  providers: [
    {
      provide: RetailNotificationPreferencesJourneyToken,
      useValue: retailNotificationPreferencesJourneyConfiguration,
    },
    {
      provide: RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ENGAGEMENT_BASE_PATH,
      useExisting: APP_ENGAGEMENT_BASE_PATH,
    },
    {
      provide: RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_BASE_PATH,
    },
    {
      provide: RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
  ],
})
export class RetailNotificationPreferencesJourneyBundleModule {}
