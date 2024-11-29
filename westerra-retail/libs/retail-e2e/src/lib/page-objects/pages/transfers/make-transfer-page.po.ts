import { Locator, Page } from '@playwright/test';
import { BasePage } from '../base-page.po';
import { ProductSelectorUI, ReviewTransfersCard } from '../../fragments';

const connectedAccountSelector = 'h4.bb-internal-account-selector__subheader + button';

export class MakeTransferPage extends BasePage {
  readonly pageTitle = this.page.locator('h1');
  readonly journeyUI = this.page.locator('bb-initiate-payment-journey-wrapper');
  readonly notificationMessage = this.page.locator('[data-role=notification-alert]');
  readonly fromAccountSelector = this.page.locator('bb-product-selector-ui').nth(0);
  readonly toAccountSelector = this.page.locator('bb-product-selector-ui').nth(1);
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly primaryButton = this.page.locator('bb-initiate-payment-journey-wrapper .btn-primary');
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/make-a-transfer']");
  readonly dateField = this.page.locator('[data-role=input-date-single]').first();

  constructor(page: Page) {
    super(page);
  }

  async makeTransfer(transferAmount: string, dateString: string): Promise<ReviewTransfersCard> {
    await this.selectAccount(this.fromAccountSelector, 1);
    await this.selectAccount(this.toAccountSelector, 0);
    await this.dateField.fill(dateString);
    return this.enterAmountAndSubmit(transferAmount);
  }

  async makeFutureDateA2ATransfer(transferAmount: string, dateString: string): Promise<ReviewTransfersCard> {
    await this.selectAccount(this.fromAccountSelector, 1);
    await this.selectAccount(this.toAccountSelector);
    await this.dateField.fill(dateString);
    return this.enterAmountAndSubmit(transferAmount);
  }

  async makeFutureDateA2APullFundsTransfer(transferAmount: string, dateString: string): Promise<ReviewTransfersCard> {
    await this.selectAccount(this.fromAccountSelector);
    await this.selectAccount(this.toAccountSelector, 1);
    await this.dateField.fill(dateString);
    return this.enterAmountAndSubmit(transferAmount);
  }

  private async selectAccount(locator: Locator, index?: number): Promise<void> {
    const fragment = new ProductSelectorUI(locator);
    if (index !== undefined) {
      await fragment.selectProductWithIndex(index);
    } else {
      await fragment.selectProductWithSelector(connectedAccountSelector);
    }
  }

  private async enterAmountAndSubmit(transferAmount: string): Promise<ReviewTransfersCard> {
    await this.amountInput.fill(transferAmount);
    await this.primaryButton.click();
    return new ReviewTransfersCard(this.page);
  }
}
