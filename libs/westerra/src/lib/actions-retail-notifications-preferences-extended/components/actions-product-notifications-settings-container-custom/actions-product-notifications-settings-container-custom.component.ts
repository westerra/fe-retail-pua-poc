import { Component, OnInit } from '@angular/core';
import { ActionsProductNotificationsSettingsContainerComponent } from '@backbase/actions-retail-notification-preferences-journey-feature';
import {
  ActionsProductNotificationsSettingsRouterService,
  ActionsProductNotificationsSettingsDataService,
  ActionsProductNotificationsSettingsPropertiesService,
} from '@backbase/actions-retail-notification-preferences-journey-data-access';
import { ActionsStoreModel } from '@backbase/actions-shared-data-access';

@Component({
  selector: 'bb-actions-product-notifications-settings-container-custom',
  templateUrl: './actions-product-notifications-settings-container-custom.component.html',
  providers: [
    ActionsProductNotificationsSettingsRouterService,
    ActionsProductNotificationsSettingsDataService,
    ActionsProductNotificationsSettingsPropertiesService,
    ActionsStoreModel,
  ],
})
export class ActionsProductNotificationsSettingsContainerCustomComponent extends ActionsProductNotificationsSettingsContainerComponent {}
