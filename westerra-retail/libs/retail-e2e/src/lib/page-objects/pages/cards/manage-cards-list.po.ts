import { BasePage } from '../base-page.po';
import { Page } from '@playwright/test';

export class ManageCardsListPage extends BasePage {
  readonly travelNoticeButton = this.page.locator('.bb-heading-widget__button', { hasText: 'Travel Notice' });
  readonly cards = this.page.locator('bb-payment-card');

  constructor(page: Page) {
    super(page);
  }
}
