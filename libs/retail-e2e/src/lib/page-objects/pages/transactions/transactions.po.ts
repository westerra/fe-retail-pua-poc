import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class TransactionsPage extends BasePage {
  journeyUi = this.page.locator('bb-transactions-list-view');
  allTransactions = this.page.locator('bb-transactions-list-item');
  searchInputField = this.page.locator('.bb-search-box__simple-input');
  searchButton = this.page.locator('.bb-search-box__search-button');
  cancelSearchButton = this.page.locator('.bb-search-box__clear-button');
  filterButton = this.page.locator('[data-role="filter"]');
  clearAllFiltersButton = this.page.locator('[data-role="clear-all"]');
  closeFiltersButton = this.page.locator('[data-role="cancel"]');
  applyFiltersButton = this.page.locator('[data-role="apply"]');
  dateStartField = this.page.locator('[data-role="start-date"] input');
  dateEndField = this.page.locator('[data-role="end-date"] input');
  numbeOfResultsFound = this.page.locator('bb-transactions-number-of-results-found');

  constructor(page: Page) {
    super(page);
  }

  async searchForText(text: string) {
    await this.searchInputField.fill(text);
    await this.searchButton.click();
  }
}
