import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrangementsHttpService, ProductSummaryHttpService } from '@backbase/arrangement-manager-http-ang';
import { FinancialInstitutionManagerClientHttpService } from '@backbase/financial-institution-manager-http-ang';
import {
  ActionsNotificationsPreferencesDataService,
  ActionsStoreModule,
  NotificationsPreferencesBaseDataService,
} from '@backbase/actions-shared-data-access';
import {
  ActionNotificationsPreferencesDataFactory,
  ActionsRetailNotificationPreferencesJourneyConfigService,
  ActionsProductNotificationsSettingsRouterService,
  ActionsProductNotificationsSettingsDataService,
  ActionsProductNotificationsSettingsPropertiesService,
} from '@backbase/actions-retail-notification-preferences-journey-data-access';
import {
  ActionsRetailNotificationPreferencesJourneyFeatureModule,
  ProductSummaryListWidgetModule,
  ProductKindCollapsibleModule,
  ProductKindModule,
} from '@backbase/actions-retail-notification-preferences-journey-feature';
import { ActionRecipeSpecificationsHttpService, ActionRecipesHttpService } from '@backbase/actions-http-ang';
import { NotificationPreferenceService } from '@backbase/engagement-http-ang';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '@backbase/ui-ang/header';
import { ActionsRetailNotificationPreferencesViewCustomComponent } from './components/actions-retail-notification-preferences-view-custom/actions-retail-notification-preferences-view-custom.component';
import { IconModule } from '@backbase/ui-ang/icon';
import { AmountModule } from '@backbase/ui-ang/amount';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { TooltipModule } from '@backbase/ui-ang/tooltip-directive';
import { AlertModule } from '@backbase/ui-ang/alert';
import { ProductSummaryNotificationsService } from './services/product-summary-notifications.service';
import { ProductSummaryBaseService } from './services/product-summary-base.service';
import { ProductSummaryBaseComponent } from './components/product-summary-base/product-summary-base.component';
import { ProductSummaryListWidgetCustomComponent } from './components/product-summary-list-widget-custom/product-summary-list-widget-custom.component';
import { AccountsListExtendedViewModule } from '@backbase/westerra';
import { AccountsExternalInfoService } from './services/accounts-external-info.service';
import { ProductNotificationsSettingsCustomComponent } from './components/product-notifications-settings-custom/product-notifications-settings-custom.component';
import { ActionsProductNotificationsSettingsContainerCustomComponent } from './components/actions-product-notifications-settings-container-custom/actions-product-notifications-settings-container-custom.component';

import { ActionsStoreModel } from '@backbase/actions-shared-data-access';
import { ActionsProductSettingsPageCustomComponent } from './components/actions-product-settings-page-custom/actions-product-settings-page-custom.component';
import { ActionsAccountBalanceRecipeFormCustomComponent } from './components/actions-account-balance-recipe-form-custom/actions-account-balance-recipe-form-custom.component';

import {
  ActionsAccountBalanceRecipeFormModule,
  ActionsTransactionsRecipeFormModule,
  ActionsNotificationChannelsModule,
} from '@backbase/actions-shared-feature';
import { ActionsProductCardItemModule } from '@backbase/actions-retail-notification-preferences-journey-ui';
import { ProductItemBasicAccountModule } from '@backbase/ui-ang/product-item-basic-account';
import { ProductItemCreditCardModule } from '@backbase/ui-ang/product-item-credit-card';
import { ProductItemCurrentAccountModule } from '@backbase/ui-ang/product-item-current-account';
import { ProductItemDebitCardModule } from '@backbase/ui-ang/product-item-debit-card';
import { ProductItemInvestmentAccountModule } from '@backbase/ui-ang/product-item-investment-account';
import { ProductItemLoanModule } from '@backbase/ui-ang/product-item-loan';
import { ProductItemSavingsAccountModule } from '@backbase/ui-ang/product-item-savings-account';
import { ProductItemTermDepositModule } from '@backbase/ui-ang/product-item-term-deposit';
import { CollapsibleModule } from '@backbase/ui-ang/collapsible';
import { InputInlineEditModule } from '@backbase/ui-ang/input-inline-edit';
import { SwitchWithLoadingModule } from '@backbase/actions-shared-ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActionsTransactionsRecipeFormCustomComponent } from './components/actions-transactions-recipe-form-custom/actions-transactions-recipe-form-custom.component';
import { ActionsNotificationChannelsCustomComponent } from './components/actions-notification-channels-custom/actions-notification-channels-custom.component';

const services = [
  NotificationPreferenceService,
  ActionRecipeSpecificationsHttpService,
  ActionRecipesHttpService,
  ArrangementsHttpService,
  FinancialInstitutionManagerClientHttpService,
  ProductSummaryHttpService,
  ActionsNotificationsPreferencesDataService,
  ActionsRetailNotificationPreferencesJourneyConfigService,
  {
    provide: NotificationsPreferencesBaseDataService,
    useFactory: ActionNotificationsPreferencesDataFactory,
    deps: [Injector],
  },
  ActionsProductNotificationsSettingsRouterService,
  ActionsProductNotificationsSettingsDataService,
  ActionsProductNotificationsSettingsPropertiesService,
];

const localServices = [ProductSummaryBaseService, ProductSummaryNotificationsService, AccountsExternalInfoService];

const extras = [ActionsStoreModel];

const uiModules = [
  CommonModule,
  RouterModule,
  HeaderModule,
  IconModule,
  AmountModule,
  EmptyStateModule,
  LoadingIndicatorModule,
  TooltipModule,
  AlertModule,
  FormsModule,

  CollapsibleModule,
  InputInlineEditModule,
  ActionsNotificationChannelsModule,
  SwitchWithLoadingModule,
  ReactiveFormsModule,
];
const innerModules = [
  ActionsStoreModule,
  ActionsRetailNotificationPreferencesJourneyFeatureModule,
  ProductSummaryListWidgetModule,
  ProductKindCollapsibleModule,
  ProductKindModule,
  AccountsListExtendedViewModule,

  ActionsAccountBalanceRecipeFormModule,
  ActionsTransactionsRecipeFormModule,
  ActionsProductCardItemModule,
  ProductItemSavingsAccountModule,
  ProductItemTermDepositModule,
  ProductItemLoanModule,
  ProductItemCreditCardModule,
  ProductItemDebitCardModule,
  ProductItemInvestmentAccountModule,
  ProductItemBasicAccountModule,
  ProductItemCurrentAccountModule,
];

const components = [
  ActionsRetailNotificationPreferencesViewCustomComponent,
  ProductNotificationsSettingsCustomComponent,
  ActionsNotificationChannelsCustomComponent,
];

const internalComponents = [
  ProductSummaryListWidgetCustomComponent,
  ProductSummaryBaseComponent,
  ActionsProductNotificationsSettingsContainerCustomComponent,
  ActionsProductSettingsPageCustomComponent,
  ActionsAccountBalanceRecipeFormCustomComponent,
  ActionsTransactionsRecipeFormCustomComponent,
];

@NgModule({
  declarations: [...components, ...internalComponents],
  imports: [...uiModules, ...innerModules],
  providers: [...services, ...localServices, ...extras],
  exports: [...components],
})
export class ActionsRetailNotificationsPreferencesExtendedModule {}
