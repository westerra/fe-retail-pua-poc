import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from '../base-page.po';
import { ConnectExternalAccountsPopup } from './connect-external-accounts.po';

export class ConnectedAccountsPage extends BasePage {
  readonly journeyUI = this.page.locator('bb-connect-external-accounts-journey');
  readonly loadingIndicator = this.page.locator('bb-loading-indicator-ui');
  readonly connectAccountButton = this.page.locator('.btn-secondary', { hasText: 'Connect account' });
  readonly notificationMessage = this.page.locator('bb-notification-ui').first();
  readonly navSubMenuItem = this.mainNavigation.locator("li > [routerLink='/transfers/connected-accounts']");
  readonly connectedAccountsPopupSelector = this.page.locator('ngb-modal-window .modal-content');
  readonly removeAccountButton = this.page.locator(
    '[data-role=dropdown-menu].show button[data-role=remove-a2a-dropdown]',
  );
  readonly confirmButton = this.page.locator('ngb-modal-window button[data-role=confirm-action-btn]');
  readonly confirmationHeader = this.page.locator('ngb-modal-window bb-modal-header-ui h2');

  constructor(page: Page) {
    super(page);
  }

  async createConnectedAccounts(accountName: string): Promise<void> {
    await this.loadingIndicator.waitFor({ state: 'hidden' });
    await this.connectAccountButton.click();
    const popup = new ConnectExternalAccountsPopup(this.connectedAccountsPopupSelector);
    await popup.verifyPopup();
    await popup.fillInData(accountName);
  }

  async deleteConnectedAccounts(accountName: string): Promise<void> {
    await this.loadingIndicator.waitFor({ state: 'hidden' });
    const item = this.getItemToDelete(accountName).locator('[data-role=dropdown-menu-toggle-button]');
    await item.click();
    await this.removeAccountButton.click();
    await expect(this.confirmationHeader).toHaveText(/Remove.*account.*/);
    await this.confirmButton.click();
    await expect(this.confirmationHeader).not.toBeVisible();
  }

  private getItemToDelete(accountName: string): Locator {
    return this.page.locator('bb-a2a-accounts-list .bb-list > div', { hasText: accountName });
  }
}
