import { Page, expect } from '@playwright/test';
import { ReviewTransfersCard } from '../../fragments';
import { ScheduledTransfersPaymentItem } from '../../fragments/transfers/scheduled-transfers-payment-item.po';
import { BasePage } from '../base-page.po';

export class ScheduledTransfersPage extends BasePage {
  readonly pageTitle = this.page.locator('h2[data-role="headings"]');
  readonly journeyUI = this.page.locator('bb-manage-upcoming-and-historical-payments-journey');
  readonly notificationMessage = this.page.locator('[data-role=notification-alert]');
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/activity']");
  readonly loadingIndicator = this.page.locator('bb-loading-indicator-ui');
  readonly paymentCancelButton = this.page
    .locator('bb-upcoming-payments-list bb-upcoming-payments-item-group button', { hasText: 'Cancel' })
    .first();
  readonly paymentItem = this.page
    .locator('[data-role="upcoming-payment-item"]', {
      has: this.page.locator('[data-role="upcoming-payment-item-edit-button-INTERNAL_TRANSFER"]'),
    })
    .first();
  readonly paymentItemA2A = this.page
    .locator('[data-role="upcoming-payment-item"]', {
      has: this.page.locator('[data-role="upcoming-payment-item-edit-button-EXTERNAL_A2A"]'),
    })
    .first();
  readonly paymentItemA2APullFunds = this.page
    .locator('[data-role="upcoming-payment-item"]', {
      has: this.page.locator('[data-role="upcoming-payment-item-edit-button-EXTERNAL_A2A-pull-funds"]'),
    })
    .first();
  readonly accountSelector = this.page.locator('bb-product-item-basic-account-ui');
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly primaryButton = this.page.locator('bb-initiate-payment-journey-wrapper .btn-primary');
  readonly scheduledTab = this.page.locator("a[class='nav-link active']");
  readonly cancellableItemInScheduledTab = this.page
    .locator('[data-role="upcoming-payment-item"]', {
      has: this.page.locator('[data-role="upcoming-payment-item-cancel-button-P2P_TRANSFER"]'),
    })
    .last();
  readonly counterPartyNameInScheduledTab = this.page
    .locator("[data-role='upcoming-payment-group-item']", {
      has: this.page.locator("[data-role='upcoming-payment-item-counterparty-name']"),
    })
    .last();

  /* History tab*/
  readonly historyTab = this.page.locator("a[class='nav-link']");
  readonly paymentItemsInHistoryTab = this.page.locator("[data-role='upcoming-payment-item-counterparty-name']");
  readonly cancelBtn = this.page
    .locator("[data-role='upcoming-payment-item']", {
      has: this.page.locator("[data-role='upcoming-payment-item-cancel-button-P2P_TRANSFER']"),
    })
    .first();
  readonly confirmationNumberOnModal = this.page.locator("[data-role='payment-details-confirmation-number-title']");
  readonly transferDateOnModal = this.page.locator("[data-role='upcoming-payments-details-page.execution-date-label']");
  readonly cancelPaymentConfirmation = this.page.locator("[data-role='cancel-payment-confirm-btn']");

  constructor(page: Page) {
    super(page);
  }

  async editScheduledA2APayment(transferAmount: string): Promise<ReviewTransfersCard> {
    const paymentItem = new ScheduledTransfersPaymentItem(this.paymentItemA2A);
    return this.editPayment(paymentItem, transferAmount);
  }

  async editScheduledA2APPullFunds(transferAmount: string): Promise<ReviewTransfersCard> {
    const paymentItem = new ScheduledTransfersPaymentItem(this.paymentItemA2APullFunds);
    return this.editPayment(paymentItem, transferAmount);
  }

  async editScheduledPayment(transferAmount: string): Promise<ReviewTransfersCard> {
    const paymentItem = new ScheduledTransfersPaymentItem(this.paymentItem);
    return this.editPayment(paymentItem, transferAmount);
  }

  async cancelScheduledPayment(): Promise<void> {
    await this.paymentCancelButton.click();
    await this.loadingIndicator.waitFor({ state: 'hidden' });
    expect(this.page.locator('ngb-modal-window bb-modal-header-ui h2')).toHaveText(/Cancel.*/);
    await this.page.locator('ngb-modal-window button[data-role=cancel-payment-confirm-btn]').click();
    await this.notificationMessage.waitFor({ state: 'hidden' });
  }

  private async editPayment(
    paymentItem: ScheduledTransfersPaymentItem,
    transferAmount: string,
  ): Promise<ReviewTransfersCard> {
    const fromAccountName = (await paymentItem.fromAccount) || '';
    const counterPartyAccountName = (await paymentItem.counterPartyAccount) || '';
    await paymentItem.editButton.click();
    await this.loadingIndicator.waitFor({ state: 'hidden' });
    await this.accountSelector.first().scrollIntoViewIfNeeded();
    await expect(this.accountSelector.first()).toContainText(fromAccountName);
    await expect(this.accountSelector.nth(1)).toContainText(counterPartyAccountName);
    await this.amountInput.fill(transferAmount);
    await this.primaryButton.click();
    return new ReviewTransfersCard(this.page);
  }
}
