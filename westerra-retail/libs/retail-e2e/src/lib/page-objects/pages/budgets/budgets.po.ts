import { BasePage } from '../base-page.po';
import { Page } from '@playwright/test';

export class ManageBudgetsPage extends BasePage {
  readonly createBudgetButton = this.page.locator('.btn-primary', { hasText: 'New budget' });
  readonly budgetAmountInput = this.page.locator('[data-role=currency-input-integer-input]');
  readonly continueButton = this.page.locator('.btn-primary', { hasText: 'Continue' });
  readonly confirmButton = this.page.locator('.btn-primary', { hasText: 'Confirm' });
  readonly categoryRadioButtons = this.page.locator('[data-role=radio-group-option]');
  readonly deleteBudgetLink = this.page.locator('[data-role=delete-item]').last();
  readonly editBudgetLink = this.page.locator('[data-role=edit-item]').last();
  readonly deleteButtonPopUp = this.page.locator('.btn-danger');
  readonly budgetCards = this.page.locator('bb-budget-card-ui');
  readonly notificationToast = this.page.locator('bb-notification-ui');

  constructor(page: Page) {
    super(page);
  }
}
