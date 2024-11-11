import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AccountSummary, ProductKindCustomized } from '../../types';
import { ProductKindUri } from '@backbase/accounts-transactions-journey-ang';

@Component({
  selector: 'bb-product-kind-collapsible-ui-extended',
  templateUrl: './product-kind-collapsible.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductKindCollapsibleComponent {
  /**
   * Flag that indicates that the product-kind card is expanded/collapsed
   */
  @Input() isExpanded = false;

  /**
   * Flag to show and hide the icons
   */
  @Input() showIcons = false;

  /**
   * Flag to show and hide the logo for accounts
   */
  @Input() showLogo = false;

  /**
   * Icon name displayed on the product-kind card
   */
  @Input() iconName: string | undefined;

  /**
   * ProductKind item displayed inside the collapsable
   */
  @Input() productKind: ProductKindCustomized | undefined;

  /**
   * Emits the id of clicked account
   */
  @Output() selectAccount: EventEmitter<string> = new EventEmitter();

  /**
   * Emits selected product
   */
  @Output() selectProduct: EventEmitter<AccountSummary> = new EventEmitter();

  isPlural = true;

  /**
   * Emits the boolean value to toggle the expand/collapse state of the collapsable
   */
  @Output() isExpandedChange: EventEmitter<boolean> = new EventEmitter();
  onSelectAccount(id) {
    this.selectAccount.emit(id);
  }
  toggleExpanded() {
    this.isExpandedChange.emit(!this.isExpanded);
  }

  getProductKindName(kind) {
    const productKindDefaultNames = this.getDefaultLabels(this.isPlural);
    return productKindDefaultNames[kind ?? ''] ?? kind;
  }
  getDefaultLabels(isPlural) {
    return {
      [ProductKindUri.CREDIT_CARD]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.credit-card:Credit Cards`
        : $localize`:@@at-ui-account.product-kind-name.singular.credit-card:Credit Card`,
      [ProductKindUri.CURRENT_ACCOUNT]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.current-account:Spending Accounts`
        : $localize`:@@at-ui-account.product-kind-name.singular.current-account:Spending Account`,
      [ProductKindUri.DEBIT_CARD]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.debit-card:Debit Cards`
        : $localize`:@@at-ui-account.product-kind-name.singular.debit-card:Debit Card`,
      [ProductKindUri.INVESTMENT_ACCOUNT]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.investment-account:Investment Accounts`
        : $localize`:@@at-ui-account.product-kind-name.singular.investment-account:Investment Account`,
      [ProductKindUri.LOAN]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.loan:Loans`
        : $localize`:@@at-ui-account.product-kind-name.singular.loan:Loan`,
      [ProductKindUri.SAVINGS_ACCOUNT]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.savings-account:Savings Accounts`
        : $localize`:@@at-ui-account.product-kind-name.singular.savings-account:Savings Account`,
      [ProductKindUri.TERM_DEPOSIT]: isPlural
        ? $localize`:@@at-ui-account.product-kind-name.plural.name-deposit:Term Deposits`
        : $localize`:@@at-ui-account.product-kind-name.singular.name-deposit:Term Deposit`,
    };
  }
}
