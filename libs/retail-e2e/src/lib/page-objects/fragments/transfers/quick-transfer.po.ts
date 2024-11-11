import { expect, Page } from '@playwright/test';
import { ReviewQuickTransfersPopUp } from './review-quick-transfer.po';

export class QuickTransfer {
  readonly header = this.page.locator('[data-role="quick-transfer-header"] h2');
  readonly journeyUI = this.page.locator('bb-quick-transfer-journey');
  readonly notificationMessage = this.page.locator('[data-role=notification-alert]');
  readonly fromAccountSelector = this.page.locator('[data-role="select-from-button"] button');
  readonly fromAccountList = this.page.locator('bb-quick-transfer-from-account-ui');
  readonly fromAccountHeader = this.fromAccountList.locator('[data-role="from-account-header"]');
  readonly toAccountSelector = this.page.locator('[data-role="select-payee-button"] button');
  readonly toAccountList = this.page.locator('bb-quick-transfer-to-account-ui');
  readonly toAccountHeader = this.toAccountList.locator('[data-role="to-account-header"]');
  readonly accountsList = this.page.locator('bb-quick-transfer-accounts-ui button');
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly transferButton = this.page.locator('button.btn-primary', { hasText: 'Transfer Now' });
  readonly dateField = this.page.locator('[data-role=input-date-single]').first();
  readonly loadingIndicator = this.journeyUI.locator('bb-loading-indicator-ui');
  readonly successTitle = this.journeyUI.locator('.bb-quick-transfer__complete h3');
  readonly successMessage = this.journeyUI.locator('.bb-quick-transfer__complete .bb-subtitle');

  constructor(private page: Page) {}

  async makeTransfer(transferAmount: string): Promise<ReviewQuickTransfersPopUp> {
    await this.fromAccountSelector.click();
    await this.loadingIndicator.waitFor({ state: 'hidden' });
    await expect.soft(this.fromAccountHeader).toHaveText(/.*Transfer from.*/);
    await this.accountsList.nth(1).click();
    await this.toAccountSelector.click();
    await this.loadingIndicator.waitFor({ state: 'hidden' });
    await expect.soft(this.toAccountHeader).toHaveText(/.*Transfer to.*/);
    await this.accountsList.nth(0).click();
    await this.amountInput.fill(transferAmount);
    await this.transferButton.click();
    return new ReviewQuickTransfersPopUp(this.page);
  }
}
