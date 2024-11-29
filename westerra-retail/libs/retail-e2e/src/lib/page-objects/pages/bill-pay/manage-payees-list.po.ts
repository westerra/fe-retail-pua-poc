import { Page, expect } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class PayBillsListPage extends BasePage {
  readonly addPayeeBtn = this.page.locator('[data-role="pay-a-bill-add-payee"]');
  readonly payBillsHdng = this.page.locator('[data-role="headings"]', { hasText: ' Pay Bills ' });
  readonly totalAmount = this.page.locator('[data-role="multiple-bills-sum-board-amount"]');
  readonly listOfPayBills = this.page.locator('a[data-role="payee-name"]');
  readonly listOfPayeeNames = this.page.$$('[data-role="payee-name"]');
  readonly moreOption = this.page.locator('[class="dropdown-menu-toggle-button__content"]');
  readonly deletePayeePopUp = this.page.locator('[data-role="delete-payee-menu-item"]');
  readonly deletePayeeBtn = this.page.locator('[data-role="payee-delete-modal-confirm-button"]');
  readonly successNotificationMessage = this.page.locator('[data-role="notification-alert"]');
  readonly payeeNameInputField = this.page.locator('[data-role="search-input"]');

  constructor(page: Page) {
    super(page);
  }

  async isOnPage() {
    await expect(this.payBillsHdng).toHaveText(' Pay Bills ');
  }

  async deletePayee() {
    await this.moreOption.last().click();
    await this.deletePayeePopUp.last().click();
    await this.deletePayeeBtn.click();
  }
}
