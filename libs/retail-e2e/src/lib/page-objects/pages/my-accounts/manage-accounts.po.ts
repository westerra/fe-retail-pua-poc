import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class ManageAccountsPage extends BasePage {
  journeyUi = this.page.locator('bb-manage-accounts');
  manageAccountBtn = this.page.locator('.btn-link', { hasText: 'Manage Accounts' });
  backToAccountsBtn = this.page.locator('.btn-link', { hasText: 'Back to My Accounts' });
  manageAccountItem = this.page.locator('bb-manage-account-item');
  accountNameEditBtn = this.page.locator('.btn-link-dark').nth(0);
  editAliasInput = this.page.locator('[data-role=inline-edit-input] input');
  editAliasAcceptBtn = this.page.locator('[data-role=inline-edit-accept]');
  accountName = this.page.locator('[data-role=inline-edit-text]').nth(0);
  showHideAccountSlider = this.page.locator('.bb-switch__slider').nth(0);

  constructor(page: Page) {
    super(page);
  }

  async editAccountName(newAlias: string) {
    await this.accountNameEditBtn.waitFor({ state: 'visible' });
    await this.accountNameEditBtn.click();
    await this.editAliasInput.fill('');
    await this.editAliasInput.fill(newAlias);
    await this.editAliasAcceptBtn.waitFor({ state: 'visible' });
    await this.editAliasAcceptBtn.click();
  }
}
