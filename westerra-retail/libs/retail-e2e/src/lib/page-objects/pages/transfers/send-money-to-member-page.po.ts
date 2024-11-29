import { Page } from '@playwright/test';
import { generateUniqueString } from '../../../utils';
import { ProductSelectorUI, ReviewTransfersCard } from '../../fragments';
import { BasePage } from '../base-page.po';

export class SendMoneyToMemberPage extends BasePage {
  readonly pageTitle = this.page.locator('h1');
  readonly journeyUI = this.page.locator('bb-initiate-payment-journey-wrapper');
  readonly fromAccountSelector = this.page.locator('bb-product-selector-ui').nth(0);
  readonly toAccountSelector = this.page.locator('[data-role="contact-selector-search-box"] button[ngbdropdowntoggle]');
  readonly toAccountItem = this.page.locator('bb-payord-contact-selector button[ngbdropdownitem]').first();
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly primaryButton = this.page.locator('bb-initiate-payment-journey-wrapper .btn-primary');
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/money-to-member']");
  readonly notificationMessage = this.page.locator('[data-role=notification-alert]');
  readonly dateField = this.page.locator('[data-role=input-date-single]').first();
  readonly nameSearchInput = this.page.locator('[data-role="search-input"]');
  readonly accountNumberInput = this.page.locator('bb-input-text-ui [data-role="input"]');
  readonly saveContactCheckbox = this.page.locator('[data-role="saveNewContact"]');

  constructor(page: Page) {
    super(page);
  }

  async makeTransfer(transferAmount: string): Promise<ReviewTransfersCard> {
    return this.fillData(transferAmount);
  }

  async makeFutureDateTransfer(transferAmount: string, dateString: string): Promise<ReviewTransfersCard> {
    return this.fillData(transferAmount, dateString);
  }

  private async fillData(transferAmount: string, dateString?: string): Promise<ReviewTransfersCard> {
    const fromAccountSelector = new ProductSelectorUI(this.fromAccountSelector);
    await fromAccountSelector.selectProductWithIndex(1);
    try {
      await this.toAccountSelector.click();
      await this.toAccountItem.click({ timeout: 3000 });
    } catch {
      await this.nameSearchInput.fill(`John Doe ${generateUniqueString}`);
      await this.accountNumberInput.fill('111111111');
      await this.saveContactCheckbox.click();
    }
    await this.amountInput.fill(transferAmount);
    if (dateString) {
      await this.dateField.fill(dateString);
    }
    await this.primaryButton.click();
    return new ReviewTransfersCard(this.page);
  }
}
