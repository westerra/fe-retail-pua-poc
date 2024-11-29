import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class TransferPage extends BasePage {
  readonly pageHeader = this.page.locator('h1');
  readonly addMoneyHeader = this.page.locator('h1', { hasText: 'Add Money' });
  readonly withdrawMoneyHeader = this.page.locator('h1', { hasText: 'Withdraw Money' });
  readonly fromAccountLabel = this.page.locator('[data-role=account-selector-label]');
  readonly fromAccountSelector = this.page.locator('bb-account-selector-ui');
  readonly fromAccountSelectorSearchInput = this.page.locator('.bb-search-box__simple-input');
  readonly fromAccountSelectorSearchInputClearButton = this.page.locator('[data-role=bb-clear-button]');
  readonly fromAccountSelectorSearchResult = this.page.locator('.ng-dropdown-panel-items');
  readonly fromAccountSelectorActive = this.page.locator('.bb-product-item');
  readonly amountLabel = this.page.locator('bb-amount-input-ui');
  readonly amountInput = this.page.locator('[data-role=bb-amount-input-ui]');
  readonly continueButton = this.page.locator('.bb-button-bar .btn-primary');
  readonly cancelButton = this.page.locator('.bb-button-bar .btn-link');
  readonly backButton = this.page.locator('.bb-button-bar .btn-secondary');
  readonly reviewTitle = this.page.locator('h2');
  readonly reviewFromAccount = this.page.locator('.bb-item-log-record__details').nth(0);
  readonly reviewToAccount = this.page.locator('.bb-item-log-record__details').nth(1);
  readonly reviewAmount = this.page.locator('bb-amount-ui');
  readonly availableBalance = this.page.locator('.bb-subtitle');

  readonly modal = this.page.locator('.modal-dialog');
  readonly modalHeader = this.modal.locator('.modal-header');
  readonly modalBody = this.modal.locator('.modal-body');
  readonly modalKeepItButton = this.modal.locator('.btn-link');
  readonly modalConfirmButton = this.modal.locator('.btn-danger');

  constructor(page: Page) {
    super(page);
  }

  async fillStep(transferAmount: string) {
    await this.amountInput.fill(transferAmount);
    await this.continueButton.click();
  }
}
