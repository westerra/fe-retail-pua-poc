import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class TransactionsDetailsPage extends BasePage {
  journeyUi = this.page.locator('bb-transaction-details');
  transactionAmount = this.page.locator('[data-role="list-details-amount"]');
  transactionBookingdate = this.page.locator('[data-role="list-details-booking-date"]');
  counterPartyAccountNumberLabel = this.page.locator(
    '[data-role="list-details-counter-party-account-number-section"] > [data-role="section-title"]',
  );
  descriptionLabel = this.page.locator('[data-role="list-details-description-section"] > [data-role="section-title"]');
  originalDescriptionLabel = this.page.locator(
    '[data-role="list-details-original-description-section"] > [data-role="section-title"]',
  );
  typeLabel = this.page.locator('[data-role="list-details-type-section"] > [data-role="section-title"]');
  counterPartyAccountNumberValue = this.page.locator(
    '[data-role="list-details-counter-party-account-number-section"] > [data-role="section-content"]',
  );
  descriptionValue = this.page.locator(
    '[data-role="list-details-description-section"] > [data-role="section-content"]',
  );
  originalDescriptionValue = this.page.locator(
    '[data-role="list-details-original-description-section"] > [data-role="section-content"]',
  );
  typeValue = this.page.locator('[data-role="list-details-type-section"] > [data-role="section-content"]');
  changeCategoryButton = this.page.locator('.bb-transaction-list-item-detail-header__category-badge');
  transactionCategory = this.page.locator('[data-role="list-details-category"]');
  allCategories = this.page.locator('.bb-list__item--no-separator > label > span');
  saveChangeCategoryButton = this.page.locator('.btn-primary', { hasText: 'Save' });
  cancelChangeCategoryButton = this.page.locator('.btn-secondary', { hasText: 'Cancel' });
  changeCategoryAlert = this.page.locator('bb-alert-ui');

  constructor(page: Page) {
    super(page);
  }
}
