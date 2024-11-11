/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalModule } from '@backbase/ui-ang/modal';
import { IconModule } from '@backbase/ui-ang/icon';
import { AmountModule } from '@backbase/ui-ang/amount';
import { TooltipModule } from '@backbase/ui-ang/tooltip-directive';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { AccountsListExtendedViewComponent } from './accounts-list/accounts-list.component';
import { HeaderModule } from '@backbase/ui-ang/header';
import {
  AccountsTransactionsJourneyModule,
  ExternalAccountAggregationService,
  // OngoingAggregationAlertComponent,
} from '@backbase/accounts-transactions-journey-ang';
import { NotificationService } from '@backbase/ui-ang/notification';
import { ProductSummaryService } from './accounts-list/services/product-summary.service';
import { AccountsListBaseComponent } from './accounts-list-base/accounts-list-base.component';
import { AccountsDataService } from './accounts-list/services/account-data.service';
// import { AccountsTransactionsJourneyUiModule } from '@backbase/accounts-transactions-journey-ang/lib/components/ui.module';
import { DropdownMenuModule } from '@backbase/ui-ang/dropdown-menu';
import { ButtonModule } from '@backbase/ui-ang/button';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { PaymentCardNumberModule } from '@backbase/ui-ang/payment-card-number-pipe';
import { EllipsisModule } from '@backbase/ui-ang/ellipsis';
import { KeyboardClickModule } from '@backbase/ui-ang/keyboard-click-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { ProductKindNameModule } from '@backbase/product-summary-ui';
import { ProductItemCreditCardModule } from '@backbase/ui-ang/product-item-credit-card';
import { ProductItemCurrentAccountModule } from '@backbase/ui-ang/product-item-current-account';
import { ProductItemSavingsAccountModule } from '@backbase/ui-ang/product-item-savings-account';
import { ProductItemTermDepositModule } from '@backbase/ui-ang/product-item-term-deposit';
import { ProductItemLoanModule } from '@backbase/ui-ang/product-item-loan';
import { ProductItemInvestmentAccountModule } from '@backbase/ui-ang/product-item-investment-account';
import { ProductItemBasicAccountModule } from '@backbase/ui-ang/product-item-basic-account';
import { ProductItemDebitCardModule } from '@backbase/ui-ang/product-item-debit-card';
import { BadgeModule } from '@backbase/ui-ang/badge';
import { AlertModule } from '@backbase/ui-ang/alert';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { ProductKindsListComponent } from './accounts-list/components/product-kinds-list/product-kinds-list.component';
import { AccountsListHeaderComponent } from './accounts-list/components/account-list-header/account-list-header.component';
import { ProductKindCollapsibleComponent } from './accounts-list/components/product-kind-collapsible/product-kind-collapsible.component';
import {
  AccountLogoModule,
  AccountNumberModule,
  AccountStateIndicatorModule,
  GetAccountNumberPipeModule,
  GetProductKindPipeModule,
  IsDefinedPipeModule,
  ToUpdatedDatePipeModule,
} from '@backbase/internal-at-shared-ui-ang';
import { ProductSummaryUiModule } from '@backbase/product-summary-ui';
import { OngoingAggregationAlertComponent } from './accounts-list/components/ongoing-agregation-alert/bb-ongoing-aggregation-alert.component';
import { AccountsTotalBalanceComponent } from './accounts-list/components/bb-accounts-total-balance/accounts-total-balance.component';

const uiModules$1 = [
  HeaderModule,
  DropdownMenuModule,
  ButtonModule,
  LoadButtonModule,
  IconModule,
  PaymentCardNumberModule,
  EllipsisModule,
  TooltipModule,
  KeyboardClickModule,
  AccountStateIndicatorModule,
  AccountLogoModule,
  AccountNumberModule,
  AmountModule,
  NgbModule,
  // ProductKindNameModule,
  GetProductKindPipeModule,
  IsDefinedPipeModule,
  ProductItemCreditCardModule,
  ProductItemCurrentAccountModule,
  ProductItemSavingsAccountModule,
  ProductItemTermDepositModule,
  ProductItemLoanModule,
  ProductItemInvestmentAccountModule,
  ProductItemBasicAccountModule,
  ProductItemDebitCardModule,
  KeyboardClickModule,
  AmountModule,
  GetAccountNumberPipeModule,
  ToUpdatedDatePipeModule,
  BadgeModule,
  AlertModule,
  EmptyStateModule,
  LoadingIndicatorModule,
  EntitlementsModule,
  ModalModule,
  ProductSummaryUiModule,
];
const components = [
  AccountsListExtendedViewComponent,
  AccountsListBaseComponent,
  ProductKindsListComponent,
  AccountsListHeaderComponent,
  ProductKindCollapsibleComponent,
  OngoingAggregationAlertComponent,
  AccountsTotalBalanceComponent,
];
const modules = [
  // AccountsTransactionsJourneyUiModule,
  ModalModule,
  IconModule,
  AmountModule,
  TooltipModule,
  EmptyStateModule,
  LoadingIndicatorModule,
  AccountsTransactionsJourneyModule,
  ...uiModules$1,
];

@NgModule({
  imports: [CommonModule, ...modules],
  declarations: [...components],
  providers: [
    ExternalAccountAggregationService,
    //  AccountsCommunicationService,
    NotificationService,
    //  AccountsStateCommunicationService,
    ProductSummaryService,
    AccountsDataService,

    //  AccountsExternalInfoService
  ],
  exports: [...modules, ...components],
})
export class AccountsListExtendedViewModule {}
