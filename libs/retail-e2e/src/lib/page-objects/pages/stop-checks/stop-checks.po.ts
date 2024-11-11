import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class StopChecksPage extends BasePage {
  readonly formValues = { amount: '120', checkNumber: '12312421' };
  readonly selfServiceNavItem = this.mainNavigation.locator('#bb-menu-header-button-4');
  readonly stopChecksDropdownItem = this.mainNavigation.locator("li > [routerlink='/self-service/stop-checks']");
  readonly pageTitleHeader = this.page.locator('bb-stop-checks-journey-wrapper [data-role="headings"]');
  readonly tableLabels = this.page.locator('[data-role*="stop-checks-header-"]');
  readonly listItem = this.page.locator('[data-role="stop-checks-row"]');
  readonly originatorAccountName = this.page.locator(
    'bb-stop-checks-list [data-role="stop-check-originator-account-name"]',
  );
  readonly listView = this.page.locator('bb-stop-checks-list-view');
  readonly createButton = this.page.locator('button', { hasText: 'Create' });
  readonly accountSelector = this.page.locator('bb-account-selector-ui');
  readonly accountItem = this.page.locator('bb-product-item-basic-account-ui');
  readonly checkNumberInput = this.page.locator('[data-role="check-number"] input');
  readonly amountInput = this.page.locator('[data-role="currency-input-integer-input"]');
  readonly dateField = this.page.locator('[data-role=input-date-single]').first();
  readonly formContinueButton = this.page.locator('[data-role="continue-btn"]');
  readonly createFormHeader = this.page.locator('legend', { hasText: 'Check details' });
  readonly reviewModalHeader = this.page.locator('[data-role="headings"]', { hasText: 'Review and submit' });
  readonly notificationMessage = this.page.locator('[data-role=notification-message]');
  readonly notificationHeader = this.page.locator('[data-role="notification-heading"]');
  readonly reviewCheckAccountLabel = this.page.locator('[data-role="check-account-label"]');
  readonly reviewAmountLabel = this.page.locator('[data-role="check-amount-label"]');
  readonly reviewAmountValue = this.page.locator('[data-role="check-amount"]');
  readonly reviewCheckNumberLabel = this.page.locator('[data-role="check-number-label"]');
  readonly reviewCheckNumberValue = this.page.locator('[data-role="check-number"]');
  readonly reviewSubmitButton = this.page.locator('[data-role="submit-button"]');
  readonly detailsModalHeader = this.page.locator('[data-role="headings"]', { hasText: 'Stop check request' });

  constructor(page: Page) {
    super(page);
  }

  async fillTheFormAndContinue() {
    await this.accountSelector.click();
    await this.accountItem.nth(1).click();
    await this.checkNumberInput.fill(this.formValues.checkNumber);
    await this.amountInput.fill(this.formValues.amount);
    await this.dateField.fill(new Date().toISOString());
    await this.formContinueButton.click();
  }
}
