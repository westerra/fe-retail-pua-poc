import { Page } from '@playwright/test';

export class ReviewQuickTransfersPopUp {
  readonly modalHeader = this.root.locator('bb-modal-header-ui', { hasText: 'Quick Transfer' });
  readonly amount = this.root.locator('[data-role="quick-transfer-review-amount"]');
  readonly connectButton = this.root.locator('bb-modal-footer-ui button.btn-primary', { hasText: 'Confirm transfer' });
  readonly transactionSigningPopup = this.root.locator('bb-transaction-signing-header');
  readonly transactionSigningHeader = this.root.locator('bb-transaction-signing-header h2');

  constructor(private root: Page) {}

  async confirmTransfer() {
    await this.connectButton.click();
  }
}
