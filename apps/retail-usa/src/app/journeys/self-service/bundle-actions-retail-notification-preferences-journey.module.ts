import { NgModule, Provider } from '@angular/core';
import {
  ActionsRetailNotificationPreferencesJourneyModule,
  ActionsRetailNotificationPreferencesJourneyConfiguration,
  ActionsRetailNotificationPreferencesJourneyToken,
  ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ACTIONS_BASE_PATH,
  ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ENGAGEMENT_BASE_PATH,
  ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
} from '@backbase/actions-retail-notification-preferences-journey-ang';
import { ACCESS_CONTROL_BASE_PATH } from '@backbase/data-ang/accesscontrol';
import { environment } from '../../../environments/environment';
import {
  APP_ACTIONS_BASE_PATH,
  APP_ENGAGEMENT_BASE_PATH,
  APP_ARRANGEMENT_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_ACCESS_CONTROL_BASE_PATH,
} from '../../service-paths.module';
import {
  ActionsRetailNotificationPreferencesViewCustomComponent,
  ProductNotificationsSettingsCustomComponent,
} from '@backbase/westerra';
export const apiModeTypeGuard = (value: string | undefined) => {
  if (value === 'actions' || value === 'engagements') return value;
  return 'engagements';
};

export const RetailActionsConfigProvider: Provider = {
  provide: ActionsRetailNotificationPreferencesJourneyToken,
  useValue: {
    notificationDismissTime: 5,
    specificationIDs: '1, 4',
    apiMode: apiModeTypeGuard(environment.notificationPreferencesApiMode),
  } as ActionsRetailNotificationPreferencesJourneyConfiguration,
};

export const customNotificationRoutes = {
  path: '',
  children: [
    {
      path: '',
      redirectTo: 'manage-notifications',
      pathMatch: 'full',
    },
    {
      path: 'manage-notifications',
      component: ActionsRetailNotificationPreferencesViewCustomComponent,
    },
    {
      path: 'notification-details',
      component: ProductNotificationsSettingsCustomComponent,
    },
  ],
};

@NgModule({
  imports: [ActionsRetailNotificationPreferencesJourneyModule.forRoot({ routes: customNotificationRoutes })],
  providers: [
    RetailActionsConfigProvider,
    {
      provide: ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ACTIONS_BASE_PATH,
      useExisting: APP_ACTIONS_BASE_PATH,
    },
    {
      provide: ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ENGAGEMENT_BASE_PATH,
      useExisting: APP_ENGAGEMENT_BASE_PATH,
    },
    {
      provide: ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_BASE_PATH,
    },
    {
      provide: ACTIONS_RETAIL_NOTIFICATION_PREFERENCES_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
  ],
})
export class ActionsRetailNotificationPreferencesJourneyBundleModule {}
