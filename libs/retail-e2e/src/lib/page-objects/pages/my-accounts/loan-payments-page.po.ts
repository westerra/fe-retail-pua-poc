import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-page.po';
import { ProductSelectorUI, ReviewTransfersCard } from '../../fragments';

export enum LoanPaymentPagesType {
  LoanPayment,
  LoanAdvance,
}
export enum AmountOptions {
  PaymentDue = 'Payment Due',
  PayoffAmount = 'Payoff Amount',
  PastDueBalance = 'Past Due Balance',
  DifferentAmount = 'Different amount',
}

export class LoanPaymentsPage extends BasePage {
  readonly loanListItem = this.page.locator('bb-product-item-loan-ui [data-role="card-title"]', {
    hasText: 'Our home loan',
  });
  readonly pageTitle = this.page.locator('h1');
  readonly journeyUI = this.page.locator('bb-loan-payment-journey-wrapper');
  readonly notificationMessage = this.page.locator('[data-role=notification-alert]');
  readonly fromAccountSelector = this.page.locator('bb-product-selector-ui').nth(0);
  readonly toAccountSelector = this.page.locator('bb-product-selector-ui').nth(1);
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly primaryButton = this.page.locator('button.btn-primary');
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/make-a-transfer']");
  readonly dateField = this.page.locator('[data-role=input-date-single]').first();
  readonly amountOption = this.page.locator('[data-role="radio-group-option"]');
  readonly paymentTowardsDropdown = this.page.locator('bb-payord-select .bb-loans-remittance-info__section select');
  readonly loanPaymentButton = this.page.locator('button', { hasText: 'Pay Down' });
  readonly loanAdvanceButton = this.page.locator('button', { hasText: 'Draw Amount' });

  constructor(page: Page, readonly type: LoanPaymentPagesType) {
    super(page);
  }

  async clickOnPaymentButtonOnLoansJourney() {
    this.type === LoanPaymentPagesType.LoanAdvance
      ? await this.loanAdvanceButton.click()
      : await this.loanPaymentButton.click();
  }

  async verifyFormFields() {
    await this.verifyAmountOptions();
  }

  async selectAmountOption(label: AmountOptions, amount?: string, paymentTowards?: string): Promise<void> {
    await this.amountOption.locator('#payord-amount-options-label-', { hasText: label }).click({ delay: 500 });
    if (label === AmountOptions.DifferentAmount && amount) {
      await this.amountInput.fill(amount);
      if (paymentTowards) {
        await this.paymentTowardsDropdown.selectOption({ value: paymentTowards });
      }
    }
  }

  async setExecutionDate(date: string): Promise<void> {
    await this.dateField.fill(date);
  }

  async fillAmount(amount: string): Promise<void> {
    await this.amountInput.fill(amount);
  }

  async submitForm(): Promise<ReviewTransfersCard> {
    await this.primaryButton.click();
    return new ReviewTransfersCard(this.page);
  }

  private async verifyAmountOptions() {
    const amountOptions = await this.amountOption.locator('#payord-amount-options-label-').allInnerTexts();
    expect(amountOptions).toEqual(Object.values(AmountOptions));
  }

  async selectFromAccount(index: number = 0): Promise<void> {
    const fragment = new ProductSelectorUI(this.fromAccountSelector);
    await fragment.selectProductWithIndex(index);
  }

  async selectToAccount(index: number = 0): Promise<void> {
    const fragment = new ProductSelectorUI(this.toAccountSelector);
    await fragment.selectProductWithIndex(index);
  }
}
