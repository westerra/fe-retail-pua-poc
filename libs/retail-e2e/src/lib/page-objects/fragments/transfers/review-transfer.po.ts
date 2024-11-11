import { expect, Page } from '@playwright/test';

export class ReviewTransfersCard {
  readonly notificationMessage = this.root.locator('[data-role=notification-alert]');
  readonly cardHeader = this.root.locator('fieldset legend', { hasText: 'Review Your Transfer' });
  readonly primaryButton = this.root.locator('bb-initiate-payment-journey-wrapper .btn-primary');
  readonly loadingIndicator = this.root.locator('bb-loading-indicator-ui');
  readonly transferAmount = this.root.locator('[data-role="transfer-amount"]');
  readonly executionDate = this.root.locator('[data-role="execution-date"]');
  readonly successCard = this.root.locator('bb-header-ui h2');

  constructor(private root: Page) {}

  async confirmTransfer() {
    await this.primaryButton.click();
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }

  async verifyTransferDetails(transferAmount: string, dateString?: string) {
    await expect(this.cardHeader).toHaveText('Review Your Transfer');
    await expect(this.transferAmount).toContainText(transferAmount);
    if (dateString) {
      await expect(this.executionDate).toContainText(dateString);
    }
  }

  async verifySuccessfulTransfer(editPayment: boolean = false) {
    if (editPayment) {
      await expect(this.notificationMessage).toHaveText('Edited payment submitted successfully');
    } else {
      await expect(this.notificationMessage).toHaveText('Payment submitted successfully');
    }
    await expect(this.successCard).toHaveText('Success!');
  }
}
