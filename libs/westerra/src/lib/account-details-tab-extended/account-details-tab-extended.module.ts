/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@backbase/ui-ang/button';
import { IconModule } from '@backbase/ui-ang/icon';
import { AccountGraphicalHeaderModule, IsProductKindPipeModule } from '@backbase/internal-at-shared-ui-ang';
import { AccountsExternalInfoService, AccountDetailsService } from '@backbase/internal-at-shared-data-access-ang';
import { RouterModule } from '@angular/router';
import { TabModule } from '@backbase/ui-ang/tab';
import { AccountDetailsTabExtendedComponent } from './account-details-tab-extended.component';
// import { AccountsTransactionsJourneyUiModule } from '@backbase/accounts-transactions-journey-ang/lib/components/ui.module';

import { HeaderModule } from '@backbase/ui-ang/header';
import {
  AccountInfoPropertiesConfiguration,
  AccountInfoPropertyType,
  ExternalAccountAggregationService,
} from '@backbase/accounts-transactions-journey-ang';
import { DropdownMenuModule } from '@backbase/ui-ang/dropdown-menu';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { PaymentCardNumberModule } from '@backbase/ui-ang/payment-card-number-pipe';
import { EllipsisModule } from '@backbase/ui-ang/ellipsis';
import { KeyboardClickModule } from '@backbase/ui-ang/keyboard-click-directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { TooltipModule } from '@backbase/ui-ang/tooltip-directive';
import {
  AccountLogoModule,
  AccountNumberModule,
  AccountStateIndicatorModule,
  GetAccountNumberPipeModule,
  GetProductKindPipeModule,
  IsDefinedPipeModule,
  ToUpdatedDatePipeModule,
  GetAccountNumberFormatPipeModule,
  GetAccountNumberTypePipeModule,
  ToPaymentCardDataPipeModule,
  AccountInfoFrequencyModule,
  AccountInfoPropertyModule,
  AccountInfoRenewalStatusModule,
  CreditLimitModule,
  CreditLimitMinimumPaymentModule,
  CreditLimitStatusBarModule,
  EditAliasModule,
} from '@backbase/internal-at-shared-ui-ang';
import { ModalModule } from '@backbase/ui-ang/modal';
import { AmountModule } from '@backbase/ui-ang/amount';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ProductSummaryUiModule } from '@backbase/product-summary-ui';
import { AccountsNavigateButtonComponent } from './components/accounts-navigate-button-component/accounts-navigate-button.component';
import { AccountInfoViewExtendedComponent } from './components/account-info-component/account-info.component';
import { AccountInfoContainerComponent } from './components/account-info-container/account-info-container.component';
import {
  ToNumberPipeModule,
  ToArrayPipeModule,
  GetDecimalsCountModule,
  SplitArrayPipeModule,
  CastAccountPropertyPipeModule,
  GetValuePipeModule,
} from '@backbase/internal-at-shared-ui-ang';
import { ProductSummaryAccountSelectorWidgetModule } from '@backbase/product-summary-account-selector-widget-ang';
import { AccountInfoPropertyExtendedComponent } from './components/account-info-property/account-info-property.component';
import { ProductKindUri } from '@backbase/product-summary-common-ang';

import { TransactionsListViewExtendedComponent } from './components/transactions-list/transactions-list-view-extended/transactions-list-view-extended.component';
import { TransactionsListWidgetModule } from '@backbase/transactions-list-widget-ang';
import { TransactionsCommonModule } from '@backbase/transactions-common-ang';
import { TransactionsListWidgetExtendedComponent } from './components/transactions-list/transactions-list-widget-extended/transactions-list-widget-extended.component';
import { TextareaModule } from '@backbase/ui-ang/textarea';
import { NotificationModule } from '@backbase/ui-ang/notification';
import { FocusModule } from '@backbase/ui-ang/focus';
import { SearchBoxModule } from '@backbase/ui-ang/search-box';
import { PaginatorModule } from '@backbase/ui-ang/pagination';
import { InputValidationMessageModule } from '@backbase/ui-ang/input-validation-message';
import { InputNumberModule } from '@backbase/ui-ang/input-number';
import { InputDatepickerModule } from '@backbase/ui-ang/input-datepicker';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';
import {
  NavigationService,
  WidgetPropertiesService,
  TransactionsService,
  PendingTransactionsService,
  TransactionDetailsService,
} from '@backbase/transactions-common-ang';
import { TransactionsContainerExtendedComponent } from './components/transactions-list/transactions-container-extended/transactions-container-extended.component';
import { TransactionsListExtendedComponent } from './components/transactions-list/transactions-list-extended/transactions-list-extended.component';
import { TransactionsListItemGroupExtendedComponent } from './components/transactions-list/transactions-list-item-group-extended/transactions-list-item-group-extended.component';

import { AccountNumberCustomComponent } from './components/account-number-custom/account-number-custom.component';

const components = [
  AccountDetailsTabExtendedComponent,
  AccountsNavigateButtonComponent,
  AccountInfoViewExtendedComponent,
  AccountInfoContainerComponent,
  AccountInfoPropertyExtendedComponent,
  TransactionsListViewExtendedComponent,
  TransactionsListWidgetExtendedComponent,
  TransactionsContainerExtendedComponent,
  TransactionsListExtendedComponent,
  TransactionsListItemGroupExtendedComponent,
  AccountNumberCustomComponent,
];

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
  CastAccountPropertyPipeModule,
  GetValuePipeModule,
  ToNumberPipeModule,
  ToArrayPipeModule,
  GetDecimalsCountModule,
  GetAccountNumberFormatPipeModule,
  GetAccountNumberTypePipeModule,
  ToPaymentCardDataPipeModule,
  AccountInfoFrequencyModule,
  AccountInfoPropertyModule,
  AccountInfoRenewalStatusModule,
  CreditLimitModule,
  CreditLimitMinimumPaymentModule,
  CreditLimitStatusBarModule,
  EditAliasModule,
  ProductSummaryAccountSelectorWidgetModule,

  DropdownSingleSelectModule,
  InputDatepickerModule,
  InputNumberModule,
  InputValidationMessageModule,
  PaginatorModule,
  SearchBoxModule,
  FocusModule,
  NotificationModule,
  TextareaModule,
];

const uiModules$2 = [
  TransactionsCommonModule,
  TransactionsListWidgetModule.forRoot({
    showDetails: false,
  }),
];

const modules = [
  ButtonModule,
  IconModule,
  IsProductKindPipeModule,
  AccountGraphicalHeaderModule,
  // AccountHeaderModule,
  TabModule,
  // AccountsTransactionsJourneyUiModule,
  SplitArrayPipeModule,
  ...uiModules$1,
];

const services = [
  AccountDetailsService,
  AccountsExternalInfoService,
  NavigationService,
  WidgetPropertiesService,
  TransactionsService,
  PendingTransactionsService,
  TransactionDetailsService,
];

export const customAccountInfoConfiguration: AccountInfoPropertiesConfiguration = {
  default: [
    {
      title: $localize`:@@product.details.other.account.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.other.account.label.productTypeName:Account Type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.other.account.label.account.number:Account Number`,
          key: 'IBAN',
          numberType: 'iban',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.other.account.label.bookedBalance:Account Balance`,
          key: 'bookedBalance',
          // tooltip: $localize`:@@product.details.other.account.tooltip.bookedBalance:Account Balance`,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.other.account.label.accountHolderNames:Account Owner(s)`,
          key: 'accountHolderNames',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.other.account.label.bankBranchCode:ACH Routing Number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.other.account.label.bankBranchCode2:FedWire Routing Number`,
          key: 'bankBranchCode2',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_STATE,
          label: $localize`:@@product.details.other.account.label.accountStatus:Account Status`,
          key: 'state.state',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.other.account.label.financialInstitution.name:Bank Name`,
          key: 'financialInstitution.name',
        },
        {
          type: AccountInfoPropertyType.UPDATE_TIME,
          label: $localize`:@@product.details.other.account.label.lastSyncDate:Last sync`,
          key: 'lastSyncDate',
        },
      ],
    },
    {
      title: $localize`:@@product.details.other.account.label.interest.details.section:Interest Details`,
      properties: [
        {
          type: AccountInfoPropertyType.PERCENT,
          label: $localize`:@@product.details.other.account.label.accountInterestRate:Interest Rate`,
          key: 'accountInterestRate',
          // tooltip: $localize`:@@product.details.other.account.tooltip.accountInterestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.other.account.label.accruedInterest:Accrued Interest`,
          key: 'accruedInterest',
          // tooltip: $localize`:@@product.details.other.account.tooltip.accruedInterest:The interest that is earned (credit interest) or due (debit interest) but not settled yet`,
        },
      ],
    },
    {
      title: $localize`:@@product.details.other.account.label.other.section:Other`,
      properties: [
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.other.account.label.accountOpeningDate:Account Opening Date`,
          key: 'accountOpeningDate',
          // tooltip: $localize`:@@product.details.other.account.tooltip.accountOpeningDate:Account Opening Date`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.other.account.label.lastUpdateDate:Last Updated Date`,
          key: 'lastUpdateDate',
          // tooltip: $localize`:@@product.details.other.account.tooltip.lastUpdateDate:Last date of parameter update for the product`,
        },
      ],
    },
  ],
  [ProductKindUri.CREDIT_CARD]: [
    {
      title: $localize`:@@product.details.credit.card.label.balanceDetails.section:Balance Details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.credit.card.label.currentBalance:Current Balance`,
          key: 'bookedBalance',
          // tooltip: $localize`:@@product.details.credit.card.tooltip.consumedAmount:Consumed Amount`,
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.credit.card.label.availableCredit:Available Credit`,
          key: 'remainingCredit',
          // tooltip: $localize`:@@product.details.credit.card.tooltip.remainingAmount:Remaining Amount`,
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.credit.card.label.creditLimit:Credit Limit`,
          key: 'creditLimit',
          // tooltip: $localize`:@@product.details.credit.card.tooltip.creditLimit:Monetary amount of the used overdraft`,
        },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.credit.card.label.statementBalance:Statement Balance`,
        //   key: 'cardDetails.statementBalance',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.statementBalance:Statement Balance`,
        // },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.credit.card.label.availableCashCredit:Available Cash Credit Limit`,
        //   key: 'cardDetails.availableCashCredit',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.availableCashCredit:Available Cash Credit Limit`,
        // },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.credit.card.label.cashCreditLimit:Cash Credit Limit`,
        //   key: 'cardDetails.cashCreditLimit',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.cashCreditLimit:Cash Credit Limit`,
        // },
      ],
    },
    {
      title: $localize`:@@product.details.credit.card.label.payment.section.label:Payment Details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.credit.card.label.minimumPayment:Minimum Payment`,
          key: 'minimumPayment',
          // tooltip: $localize`:@@product.details.credit.card.tooltip.minimumPayment:The minimum payment set a percentage of balance, or a fixed cash amount`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.credit.card.label.nextMinimumPaymentDueDate:Next Payment Due Date`,
          key: 'minimumPaymentDueDate',
          // tooltip: $localize`:@@product.details.credit.card.tooltip.minimumPaymentDueDate:Minimum Payment Due Date shown on your monthly statement to remain in good standing`,
        },
        // {
        //   type: AccountInfoPropertyType.PERCENT,
        //   label: $localize`:@@product.details.credit.card.label.cashAdvanceInterestRate:Cash Advance APR`,
        //   key: 'interestDetails.cashAdvanceInterestRate',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.cashAdvanceInterestRate:Cash Advance APR`,
        // },
        // {
        //   type: AccountInfoPropertyType.PERCENT,
        //   label: $localize`:@@product.details.credit.card.label.applicableInterestRate:Interest Rate`,
        //   key: 'applicableInterestRate',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.applicableInterestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
        // },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.credit.card.label.lastPaymentAmount:Last Payment Amount`,
        //   key: 'cardDetails.lastPaymentAmount',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.lastPaymentAmount:Last Payment Amount`,
        // },
        // {
        //   type: AccountInfoPropertyType.DATE,
        //   label: $localize`:@@product.details.credit.card.label.lastPaymentDate:Last Payment Date`,
        //   key: 'cardDetails.lastPaymentDate',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.lastPaymentDate:Last Payment Date`,
        // },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.credit.card.label.previousStatementBalance:Last Statement Balance`,
        //   key: 'cardDetails.previousStatementBalance',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.previousStatementBalance:Last Statement Balance`,
        // },
        // {
        //   type: AccountInfoPropertyType.DATE,
        //   label: $localize`:@@product.details.credit.card.label.previousStatementDate:Last Statement Date`,
        //   key: 'cardDetails.previousStatementDate',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.previousStatementDate:Last Statement Date`,
        // },
        // {
        //   type: AccountInfoPropertyType.PERCENT,
        //   label: $localize`:@@product.details.credit.card.label.penaltyInterestRate:Penalty APR`,
        //   key: 'interestDetails.penaltyInterestRate',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.penaltyInterestRate:Penalty APR`,
        // },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.credit.card.label.latePaymentFee:Late Fee`,
        //   key: 'cardDetails.latePaymentFee',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.latePaymentFee:Late Fee`,
        // },
      ],
    },
    {
      title: $localize`:@@product.details.credit.card.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.credit.card.label.number:Account Number`,
          key: 'number',
          numberType: 'cardNumber',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.credit.card.label.routingNumber:Routing Number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.credit.card.label.productTypeName:Account Type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.credit.card.label.accountOpeningDate:Account Opening Date`,
          key: 'accountOpeningDate',
          // tooltip: $localize`:@@product.details.credit.card.tooltip.accountOpeningDate:The date of activation of the account in the bank's system`,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.credit.card.label.accountHolderNames:Account Owner(s)`,
          key: 'accountHolderNames',
        },
        // {
        //   type: AccountInfoPropertyType.TEXT,
        //   label: $localize`:@@product.details.credit.card.label.cardProvider:Card Provider`,
        //   key: 'cardDetails.cardProvider',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.cardProvider:Card Provider`,
        // },
        // {
        //   type: AccountInfoPropertyType.DATE,
        //   label: $localize`:@@product.details.credit.card.label.validThru:Valid thru`,
        //   key: 'validThru',
        //   // tooltip: $localize`:@@product.details.credit.card.tooltip.validThru:Expiration date of a credit card, after which is no longer valid`,
        // },
        // {
        //   type: AccountInfoPropertyType.ACCOUNT_STATE,
        //   label: $localize`:@@product.details.credit.card.label.accountStatus:Account Status`,
        //   key: 'state.state',
        // },
        // {
        //   type: AccountInfoPropertyType.TEXT,
        //   label: $localize`:@@product.details.credit.card.label.financialInstitution.name:Bank Name`,
        //   key: 'financialInstitution.name',
        // },
        // {
        //   type: AccountInfoPropertyType.UPDATE_TIME,
        //   label: $localize`:@@product.details.credit.card.label.lastSyncDate:Last sync`,
        //   key: 'lastSyncDate',
        // },
      ],
    },
    // {
    //   title: $localize`:@@product.details.credit.card.label.other.section:Other`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.DATE,
    //       label: $localize`:@@product.details.credit.card.label.accountOpeningDate:Account Opening Date`,
    //       key: 'accountOpeningDate',
    //       // tooltip: $localize`:@@product.details.credit.card.tooltip.accountOpeningDate:The date of activation of the account in the bank's system`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.DATE,
    //       label: $localize`:@@product.details.credit.card.label.lastUpdateDate:Last Updated Date`,
    //       key: 'lastUpdateDate',
    //       // tooltip: $localize`:@@product.details.credit.card.tooltip.lastUpdateDate:Last date of parameter update for the product`,
    //     },
    //   ],
    // },
  ],
  [ProductKindUri.CURRENT_ACCOUNT]: [
    {
      title: $localize`:@@product.details.current.account.label.balance.details.section:Balance details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.current.account.label.availableBalance:Available balance`,
          key: 'availableBalance',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.current.account.label.currentBalance:Current balance`,
          key: 'bookedBalance',
        },
        {
          type: AccountInfoPropertyType.PERCENT,
          label: $localize`:@@product.details.current.account.label.interestRate:Interest rate`,
          key: 'accountInterestRate',
          // tooltip: $localize`:@@product.details.current.account.tooltip.accountInterestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
        },
      ],
    },
    {
      title: $localize`:@@product.details.current.account.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.current.account.label.accountNumber:Account number`,
          key: 'BBAN',
          numberType: 'bban',
          hideMaskIndicator: false,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.current.account.label.bankBranchCode:Routing number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.current.account.label.productTypeName:Account type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.current.account.label.accountOpeningDate:Account open date`,
          key: 'accountOpeningDate',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.current.account.label.accountHolderNames:Account owner(s)`,
          key: 'accountHolderNames',
        },
      ],
    },

    // {
    //   title: $localize`:@@product.details.current.account.label.general.section:General`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.current.account.label.productTypeName:Account Type`,
    //       key: 'productTypeName',
    //     },
    //     {
    //       type: AccountInfoPropertyType.ACCOUNT_NUMBER,
    //       label: $localize`:@@product.details.current.account.label.iban:IBAN`,
    //       key: 'IBAN',
    //       numberType: 'iban',
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.current.account.label.availableBalance:Available Balance`,
    //       key: 'availableBalance',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.current.account.label.accountHolderNames:Account Owner(s)`,
    //       key: 'accountHolderNames',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@account.details.current.account.label.bankBranchCode:ACH Routing Number`,
    //       key: 'bankBranchCode',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@account.details.current.account.label.bankBranchCode2:FedWire Routing Number`,
    //       key: 'bankBranchCode2',
    //     },
    //     {
    //       type: AccountInfoPropertyType.ACCOUNT_STATE,
    //       label: $localize`:@@product.details.current.account.label.accountStatus:Account Status`,
    //       key: 'state.state',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.current.account.label.financialInstitution.name:Bank Name`,
    //       key: 'financialInstitution.name',
    //     },
    //     {
    //       type: AccountInfoPropertyType.UPDATE_TIME,
    //       label: $localize`:@@product.details.current.account.label.lastSyncDate:Last sync`,
    //       key: 'lastSyncDate',
    //     },
    //   ],
    // },
    // {
    //   title: $localize`:@@product.details.current.account.label.interest.section:Interest Details`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.PERCENT,
    //       label: $localize`:@@product.details.current.account.label.interestRate:Interest Rate`,
    //       // tooltip: $localize`:@@product.details.current.account.tooltip.interestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
    //       key: 'accountInterestRate',
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.current.account.label.accruedInterest:Accrued Interest`,
    //       // tooltip: $localize`:@@product.details.current.account.tooltip.accruedInterest:The interest that is earned (credit interest) or due (debit interest) but not settled yet`,
    //       key: 'accruedInterest',
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.current-account.label.account.lastYearAccruedInterest:Last year’s accrued interest`,
    //       // tooltip: $localize`:@@product.details.current-account.tooltip.lastYearAccruedInterest:Last year’s accrued interest`,
    //       key: 'interestDetails.lastYearAccruedInterest',
    //     },
    //   ],
    // },
    // {
    //   title: $localize`:@@product.details.current.account.label.overdraft.section:Overdraft Details`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.current.account.label.overdraftLimit:Overdraft Limit`,
    //       // tooltip: $localize`:@@product.details.current.account.tooltip.overdraftLimit:Overdraft Limit`,
    //       key: 'creditLimit',
    //     },
    //     {
    //       type: AccountInfoPropertyType.DATE,
    //       label: $localize`:@@product.details.current.account.label.overdraftexpirydate:Overdraft Expiry Date`,
    //       // tooltip: $localize`:@@product.details.current.account.tooltip.overdraftexpirydate:Expiration date of the overdraft limit`,
    //       key: 'creditLimitExpiryDate',
    //     },
    //   ],
    // },
    // {
    //   title: $localize`:@@product.details.current.account.label.associatedDebitCards:Associated Debit Cards`,
    //   hideCard: true,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.DEBIT_CARDS,
    //       key: 'debitCards',
    //     },
    //   ],
    // },
  ],
  [ProductKindUri.DEBIT_CARD]: [
    {
      title: $localize`:@@product.details.debit.card.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.debit.card.label.productTypeName:Account Type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.debit.card.label.iban:IBAN`,
          key: 'IBAN',
          numberType: 'iban',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.debit.card.label.availableBalance:Available Balance`,
          key: 'availableBalance',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.debit.card.label.accountHolderNames:Account Owner(s)`,
          key: 'accountHolderNames',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.debit.card.label.bankBranchCode:ACH Routing Number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.debit.card.label.bankBranchCode2:FedWire Routing Number`,
          key: 'bankBranchCode2',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_STATE,
          label: $localize`:@@product.details.debit.card.label.accountStatus:Account Status`,
          key: 'state.state',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.debit.card.label.financialInstitution.name:Bank Name`,
          key: 'financialInstitution.name',
        },
        {
          type: AccountInfoPropertyType.UPDATE_TIME,
          label: $localize`:@@product.details.debit.card.label.lastSyncDate.name:Last sync`,
          key: 'lastSyncDate',
        },
      ],
    },
    {
      title: $localize`:@@product.details.debit.card.label.other.section:Other`,
      properties: [
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.debit.card.label.accountOpeningDate:Account Opening Date`,
          key: 'accountOpeningDate',
          // tooltip: $localize`:@@product.details.debit.card.tooltip.accountOpeningDate:Account Opening Date`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.debit.card.label.lastUpdateDate:Last Updated Date`,
          key: 'lastUpdateDate',
          // tooltip: $localize`:@@product.details.debit.card.tooltip.lastUpdateDate:Last date of parameter update for the product`,
        },
      ],
    },
  ],
  [ProductKindUri.INVESTMENT_ACCOUNT]: [
    {
      title: $localize`:@@product.details.investment.account.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.investment.account.label.productTypeName:Account Type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.investment.account.label.account.number:Account Number`,
          key: 'BBAN',
          numberType: 'bban',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.investment.account.label.totalInvestmentValue:Total Investment Value`,
          key: 'totalInvestmentValue',
          // tooltip: $localize`:@@product.details.investment.account.tooltip.totalInvestmentValue:Total Investment Value`,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.investment.account.label.accountHolderNames:Account Owner(s)`,
          key: 'accountHolderNames',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.investment.account.label.bankBranchCode:ACH Routing Number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.investment.account.label.bankBranchCode2:FedWire Routing Number`,
          key: 'bankBranchCode2',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_STATE,
          label: $localize`:@@product.details.investment.account.label.accountStatus:Account Status`,
          key: 'state.state',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.investment.account.label.financialInstitution.name:Bank Name`,
          key: 'financialInstitution.name',
        },
        {
          type: AccountInfoPropertyType.UPDATE_TIME,
          label: $localize`:@@product.details.investment.account.label.lastSyncDate:Last sync`,
          key: 'lastSyncDate',
        },
      ],
    },
    {
      title: $localize`:@@product.details.investment.account.label.other.section:Other`,
      properties: [
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.investment.account.label.accountOpeningDate:Account Opening Date`,
          key: 'accountOpeningDate',
          // tooltip: $localize`:@@product.details.investment.account.tooltip.accountOpeningDate:Account Opening Date`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.investment.account.label.lastUpdateDate:Last Updated Date`,
          key: 'lastUpdateDate',
          // tooltip: $localize`:@@product.details.investment.account.tooltip.lastUpdateDate:Last date of parameter update for the product`,
        },
      ],
    },
  ],
  [ProductKindUri.LOAN]: [
    {
      title: $localize`:@@product.details.loan.label.balanceDetails.section:Balance Details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.loan.label.currentBalance:Current Balance`,
          key: 'bookedBalance',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.loan.label.availableCredit:Available Credit`,
          key: 'remainingCredit',
        },
      ],
    },
    {
      title: $localize`:@@product.details.loan.label.payment.section.label:Payment Details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.loan.label.nextMinimumPayment:Next Payment Amount Due`,
          key: 'minimumPayment',
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.loan.label.nextMinimumPaymentDueDate:Next Payment Due Date`,
          key: 'minimumPaymentDueDate',
        },
      ],
    },
    {
      title: $localize`:@@product.details.loan.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.loan.label.account.number:Account Number`,
          key: 'BBAN',
          numberType: 'bban',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.loan.label.bankBranchCode:Routing Number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.loan.label.productTypeName:Account Type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.loan.label.accountOpeningDate:Account Opening Date`,
          key: 'accountOpeningDate',
          // tooltip: $localize`:@@product.details.loan.tooltip.accountOpeningDate:Account Opening Date`,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.loan.label.accountHolderNames:Account Owner(s)`,
          key: 'accountHolderNames',
        },
        // {
        //   type: AccountInfoPropertyType.AMOUNT,
        //   label: $localize`:@@product.details.loan.label.outstandingamount:Outstanding Amount`,
        //   key: 'bookedBalance',
        //   // tooltip: $localize`:@@product.details.loan.tooltip.outstandingamount:Outstanding Amount`,
        // },
        // {
        //   type: AccountInfoPropertyType.TEXT,
        //   label: $localize`:@@product.details.loan.label.bankBranchCode:ACH Routing Number`,
        //   key: 'bankBranchCode',
        // },
        // {
        //   type: AccountInfoPropertyType.TEXT,
        //   label: $localize`:@@product.details.loan.label.bankBranchCode2:FedWire Routing Number`,
        //   key: 'bankBranchCode2',
        // },
        // {
        //   type: AccountInfoPropertyType.ACCOUNT_STATE,
        //   label: $localize`:@@product.details.loan.label.accountStatus:Account Status`,
        //   key: 'state.state',
        // },
        // {
        //   type: AccountInfoPropertyType.TEXT,
        //   label: $localize`:@@product.details.loan.label.financialInstitution.name:Bank Name`,
        //   key: 'financialInstitution.name',
        // },
        // {
        //   type: AccountInfoPropertyType.UPDATE_TIME,
        //   label: $localize`:@@product.details.loan.label.lastSyncDate:Last sync`,
        //   key: 'lastSyncDate',
        // },
      ],
    },
    // {
    //   title: $localize`:@@product.details.loan.label.loan.details.section:Loan Details`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.loan.label.monthlyInstalmentAmount:Monthly Installment Amount`,
    //       key: 'monthlyInstalmentAmount',
    //       // tooltip: $localize`:@@product.details.loan.tooltip.monthlyInstalmentAmount:A fixed payment amount paid by a borrower to the bank at a specified date each calendar month`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.loan.label.principalAmount:Principal Amount`,
    //       key: 'principalAmount',
    //       // tooltip: $localize`:@@product.details.loan.tooltip.principalAmount:The amount that was (originally) contracted for the respective product`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.PERCENT,
    //       label: $localize`:@@product.details.loan.label.accountInterestRate:Interest Rate`,
    //       key: 'accountInterestRate',
    //       // tooltip: $localize`:@@product.details.loan.tooltip.accountInterestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.FREQUENCY,
    //       label: $localize`:@@product.details.loan.label.termNumber:Term`,
    //       key: 'termNumber',
    //       unitKey: 'termUnit',
    //       // tooltip: $localize`:@@product.details.loan.tooltip.termNumber:The period of time and/or the interest rate arranged between Bank and customer`,
    //     },
    //   ],
    // },
    // {
    //   title: $localize`:@@product.details.loan.label.other.section:Other`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.DATE,
    //       label: $localize`:@@product.details.loan.label.accountOpeningDate:Account Opening Date`,
    //       key: 'accountOpeningDate',
    //       // tooltip: $localize`:@@product.details.loan.tooltip.accountOpeningDate:Account Opening Date`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.DATE,
    //       label: $localize`:@@product.details.loan.label.lastUpdateDate:Last Updated Date`,
    //       key: 'lastUpdateDate',
    //       // tooltip: $localize`:@@product.details.loan.tooltip.lastUpdateDate:Last date of parameter update for the product`,
    //     },
    //   ],
    // },
  ],
  [ProductKindUri.SAVINGS_ACCOUNT]: [
    {
      title: $localize`:@@product.details.savings.account.label.balance.details.section:Balance details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.savings.account.label.availableBalance:Available balance`,
          key: 'availableBalance',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.savings.account.label.currentBalance:Current balance`,
          key: 'bookedBalance',
        },
        {
          type: AccountInfoPropertyType.PERCENT,
          label: $localize`:@@product.details.savings.account.label.accountInterestRate:Interest rate`,
          key: 'accountInterestRate',
          // tooltip: $localize`:@@product.details.savings.account.tooltip.accountInterestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
        },
      ],
    },
    {
      title: $localize`:@@product.details.savings.account.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.savings.account.label.accountNumber:Account number`,
          key: 'BBAN',
          numberType: 'bban',
          hideMaskIndicator: false,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.savings.account.label.bankBranchCode:Routing number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.savings.account.label.productTypeName:Account type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.savings.account.label.accountOpeningDate:Account open date`,
          key: 'accountOpeningDate',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.savings.account.label.accountHolderNames:Account owner(s)`,
          key: 'accountHolderNames',
        },
      ],
    },

    // {
    //   title: $localize`:@@product.details.savings.account.label.general.section:General`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.savings.account.label.productTypeName:Account Type`,
    //       key: 'productTypeName',
    //     },
    //     {
    //       type: AccountInfoPropertyType.ACCOUNT_NUMBER,
    //       label: $localize`:@@product.details.savings.account.label.account.number:Account Number`,
    //       key: 'BBAN',
    //       numberType: 'bban',
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.savings.account.label.bookedBalance:Account Balance`,
    //       key: 'bookedBalance',
    //       // tooltip: $localize`:@@product.details.savings.account.tooltip.bookedBalance:Account Balance`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.savings.account.label.accountHolderNames:Account Owner(s)`,
    //       key: 'accountHolderNames',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.savings.account.label.bankBranchCode:ACH Routing Number`,
    //       key: 'bankBranchCode',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.savings.account.label.bankBranchCode2:FedWire Routing Number`,
    //       key: 'bankBranchCode2',
    //     },
    //     {
    //       type: AccountInfoPropertyType.ACCOUNT_STATE,
    //       label: $localize`:@@product.details.savings.account.label.accountStatus:Account Status`,
    //       key: 'state.state',
    //     },
    //     {
    //       type: AccountInfoPropertyType.TEXT,
    //       label: $localize`:@@product.details.savings.account.label.financialInstitution.name:Bank Name`,
    //       key: 'financialInstitution.name',
    //     },
    //     {
    //       type: AccountInfoPropertyType.NUMBER,
    //       label: $localize`:@@product.details.savings.account.label.remainingPeriodicTransfers:Remaining Periodic Transfers`,
    //       key: 'remainingPeriodicTransfers',
    //       // tooltip: $localize`:@@product.details.savings.account.tooltip.remainingPeriodicTransfers:Remaining Periodic Transfers`,
    //       decimalPlaces: 0,
    //     },
    //     {
    //       type: AccountInfoPropertyType.UPDATE_TIME,
    //       label: $localize`:@@product.details.savings.account.label.lastSyncDate:Last sync`,
    //       key: 'lastSyncDate',
    //     },
    //   ],
    // },
    // {
    //   title: $localize`:@@product.details.savings.account.label.interest.details.section:Interest Details`,
    //   properties: [
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.savings.account.label.minimumRequiredBalance:Minimum Required Balance`,
    //       key: 'minimumRequiredBalance',
    //       // tooltip: $localize`:@@product.details.savings.account.tooltip.minimumRequiredBalance:Minimum amount that a customer must have in an account in order to receive some sort of service, such as keeping the account open or receive interest`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.savings.account.label.lastYearAccruedInterest:Last year’s accrued interest`,
    //       key: 'interestDetails.lastYearAccruedInterest',
    //       // tooltip: $localize`:@@product.details.savings.account.tooltip.lastYearAccruedInterest:Last year’s accrued interest`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.AMOUNT,
    //       label: $localize`:@@product.details.savings.account.label.dividendWithheldYTD:Interest/Dividend Withheld YTD`,
    //       key: 'interestDetails.dividendWithheldYTD',
    //       // tooltip: $localize`:@@product.details.savings.account.tooltip.dividendWithheldYTD:Interest/Dividend Withheld YTD`,
    //     },
    //     {
    //       type: AccountInfoPropertyType.PERCENT,
    //       label: $localize`:@@product.details.savings.account.label.annualPercentageYield:Annual Percentage Yield`,
    //       key: 'interestDetails.annualPercentageYield',
    //       // tooltip: $localize`:@@product.details.savings.account.tooltip.annualPercentageYield:Annual Percentage Yield`,
    //     },
    //   ],
    // },
  ],
  [ProductKindUri.TERM_DEPOSIT]: [
    {
      title: $localize`:@@product.details.term.deposit.label.general.section:General`,
      properties: [
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.term.deposit.label.productTypeName:Account Type`,
          key: 'productTypeName',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.term.deposit.label.account.number:Account Number`,
          key: 'BBAN',
          numberType: 'bban',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_NUMBER,
          label: $localize`:@@product.details.term.deposit.label.iban:IBAN`,
          key: 'IBAN',
          numberType: 'iban',
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.term.deposit.label.principalAmount:Principal Amount`,
          key: 'principalAmount',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.principalAmount:The amount that was (originally) contracted for the respective product`,
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.term.deposit.label.bankBranchCode:ACH Routing Number`,
          key: 'bankBranchCode',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.term.deposit.label.bankBranchCode2:FedWire Routing Number`,
          key: 'bankBranchCode2',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.term.deposit.label.accountHolderNames:Account Owner(s)`,
          key: 'accountHolderNames',
        },
        {
          type: AccountInfoPropertyType.ACCOUNT_STATE,
          label: $localize`:@@product.details.term.deposit.label.accountStatus:Account Status`,
          key: 'state.state',
        },
        {
          type: AccountInfoPropertyType.TEXT,
          label: $localize`:@@product.details.term.deposit.label.financialInstitution.name:Bank Name`,
          key: 'financialInstitution.name',
        },
        {
          type: AccountInfoPropertyType.UPDATE_TIME,
          label: $localize`:@@product.details.term.deposit.label.lastSyncDate:Last sync`,
          key: 'lastSyncDate',
        },
      ],
    },
    {
      title: $localize`:@@product.details.term.deposit.label.interest.details.section:Interest Details`,
      properties: [
        {
          type: AccountInfoPropertyType.PERCENT,
          label: $localize`:@@product.details.term.deposit.label.accountInterestRate:Interest Rate`,
          key: 'accountInterestRate',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.accountInterestRate:The annualized cost of credit or debt-capital computed as the percentage ratio of interest to the principal`,
        },
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.term.deposit.label.accruedInterest:Accrued Interest`,
          key: 'accruedInterest',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.accruedInterest:The interest that is earned (credit interest) or due (debit interest) but not settled yet`,
        },
        {
          type: AccountInfoPropertyType.FREQUENCY,
          label: $localize`:@@product.details.term.deposit.label.interestPaymentFrequencyNumber:Interest Payment Frequency`,
          key: 'interestPaymentFrequencyNumber',
          unitKey: 'interestPaymentFrequencyUnit',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.interestPaymentFrequencyNumber:Number of times per year when the accumulated interest is settled to the product on a regular basis`,
        },
        {
          type: AccountInfoPropertyType.RENEWAL_STATUS,
          label: $localize`:@@product.details.term.deposit.label.autoRenewalIndicator:Auto Renewal Indicator`,
          key: 'autoRenewalIndicator',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.autoRenewalIndicator:Indicates whether or not a product is to be continued after maturity automatically`,
        },
      ],
    },
    {
      title: $localize`:@@product.details.term.deposit.label.maturity.details.section:Maturity Details`,
      properties: [
        {
          type: AccountInfoPropertyType.AMOUNT,
          label: $localize`:@@product.details.term.deposit.label.maturityAmount:Maturity Balance`,
          key: 'maturityAmount',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.maturityAmount:Amount payable at the end of a holding period of a product`,
        },
        {
          type: AccountInfoPropertyType.FREQUENCY,
          label: $localize`:@@product.details.term.deposit.label.termNumber:Term`,
          key: 'termNumber',
          unitKey: 'termUnit',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.termNumber:The period of time and/or the interest rate arranged between Bank and customer`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.term.deposit.label.startDate:Start Date`,
          key: 'startDate',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.startDate:Start Date`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.term.deposit.label.maturityDate:Maturity Date`,
          key: 'maturityDate',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.maturityDate:End term of a holding period`,
        },
      ],
    },
    {
      title: $localize`:@@product.details.term.deposit.label.other.section:Other`,
      properties: [
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.term.deposit.label.accountOpeningDate:Account Opening Date`,
          key: 'accountOpeningDate',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.accountOpeningDate:Account Opening Date`,
        },
        {
          type: AccountInfoPropertyType.DATE,
          label: $localize`:@@product.details.term.deposit.label.lastUpdateDate:Last Updated Date`,
          key: 'lastUpdateDate',
          // tooltip: $localize`:@@product.details.term.deposit.tooltip.lastUpdateDate:Last date of parameter update for the product`,
        },
      ],
    },
  ],
};

@NgModule({
  imports: [CommonModule, RouterModule, ...modules, ...uiModules$2],
  declarations: [...components],
  exports: [...modules, ...components],
  providers: [ExternalAccountAggregationService, ...services],
})
export class AccountDetailsTabExtendedModule {}
