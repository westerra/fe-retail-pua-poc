import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class CardDetailsPage extends BasePage {
  readonly backToManageCardsButton = this.page.locator('.bb-heading-widget__button', {
    hasText: 'Back to Manage cards',
  });
  readonly cardDetailHeader = this.page.locator('.bb-payment-card-summary h2');
  readonly lockSwitch = this.page.locator('bb-switch-ui .bb-switch__element');
  readonly activateButton = this.page.locator('bb-load-button-ui');
  readonly replaceCardButton = this.page.locator('[data-role=replace-card-button]');
  readonly modalInput = this.page.locator('ngb-modal-window input');
  readonly buttonRequestResetPin = this.page.locator('bb-payment-card-reset-pin');
  readonly modalPrimaryButton = this.page.locator('ngb-modal-window .btn-primary');
  readonly modalBodyCvvInput = this.page.locator('[data-role=card-details-cvv-input] input');
  readonly notificationToast = this.page.locator('bb-notification-ui');

  constructor(page: Page) {
    super(page);
  }
}
