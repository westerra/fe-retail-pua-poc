import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class CreatePocketPage extends BasePage {
  readonly pageHeader = this.page.locator('h1', { hasText: 'Create Pocket' });
  readonly images = this.page.locator('.bb-manage-pockets-create-details__pocket-image');
  readonly imageButton = this.page.locator('.btn-link-text');
  readonly stepTitle = this.page.locator('h2');
  readonly nameLabel = this.page.locator('[data-role=manage-pocket-creation-name] label');
  readonly nameInput = this.page.locator('[data-role=manage-pocket-creation-name] input');
  readonly targetAmountLabel = this.page.locator('[formcontrolname=amount]');
  readonly targetAmountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly continueButton = this.page.locator('.bb-button-bar .btn-primary');
  readonly cancelButton = this.page.locator('.bb-button-bar .btn-link');
  readonly backButton = this.page.locator('.bb-button-bar .btn-secondary');
  readonly deadlineDateLabel = this.page.locator('[formcontrolname=deadline]');
  readonly deadlineDate = this.page.locator('[data-role=input-date-single]');
  readonly deadlineDateCalenderButton = this.page.locator('[data-role=toggle-calendar-button]');
  readonly supportTexts = this.page.locator('.bb-text-support');
  readonly nameReview = this.page.locator('h3').nth(0);
  readonly dateReview = this.page.locator('h3').nth(1);
  readonly amountReview = this.page.locator('h3').nth(2);
  readonly step3 = this.page.locator('.bb-step.bb-step--active', { hasText: 'Review Pocket' });
  readonly step2 = this.page.locator('.bb-step.bb-step--active', { hasText: "What's Your Goal?" });
  readonly step1 = this.page.locator('.bb-step.bb-step--active', { hasText: 'Make It Yours' });

  constructor(page: Page) {
    super(page);
  }
}
