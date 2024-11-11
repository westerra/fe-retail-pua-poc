import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class CreateTravelNoticePage extends BasePage {
  readonly destinationTextField = this.page.locator('[aria-autocomplete=list]');
  // TODO: Add identificators on journey for each continue button
  readonly continueButton = this.page.locator('.btn-primary', { hasText: 'Continue' });
  readonly dateFromField = this.page.locator('[data-role=input-date-single]').nth(0);
  readonly dateToField = this.page.locator('[data-role=input-date-single]').nth(1);
  readonly confirmButton = this.page.locator('.btn-primary', { hasText: 'Confirm' });
  // TODO: Improve identificators for different checkboxes
  readonly cardsCheckboxes = this.page.locator('[data-role=checkbox-label]');

  constructor(page: Page) {
    super(page);
  }

  async addCountryToList(country: string) {
    await this.destinationTextField.fill(country);
    await this.page.keyboard.press('Enter');
  }
}
