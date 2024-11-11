import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class PocketListPage extends BasePage {
  readonly pageHeader = this.page.locator('h1', { hasText: 'Pockets' });
  readonly createPocketButton = this.page.locator('.btn-primary', { hasText: 'Create Pocket' });
  readonly stackMessage = this.page.locator('bb-manage-pockets-list-wrapper h5');
  readonly pocketListItems = this.page.locator('bb-manage-pockets-card');
  readonly errorTitle = this.page.locator('.bb-empty-state__title');
  readonly errorMessage = this.page.locator('.bb-empty-state__message');
  readonly emptyList = this.page.locator('bb-manage-pockets-empty-list');
  readonly loadingIndicator = this.page.locator('bb-loading-indicator-ui');
  readonly notificationMessage = this.page.locator('[data-role=notification-message]');
  readonly dropdownItems = this.page.locator('[data-role=dropdown-menu-item]:visible');
  readonly addMoneyLink = this.page.locator('[data-role=dropdown-menu-item]:visible').nth(0);
  readonly withdrawMoney = this.page.locator('[data-role=dropdown-menu-item]:visible').nth(1);
  readonly deletePocketLink = this.page.locator('[data-role=dropdown-menu-item]:visible').nth(2);

  // TODO move to base?
  readonly confirmDeleteModal = this.page.locator('.modal-content-container .bb-load-button__content');

  //modalGeneric
  readonly modal = this.page.locator('.modal-dialog');
  readonly modalHeader = this.modal.locator('.modal-header');
  readonly modalBody = this.modal.locator('.modal-body');

  //modalDeletePocketWithoutBalance
  readonly modalKeepItButton = this.modal.locator('[data-role=remove-modal-cancel-button]');
  readonly modalConfirmButton = this.modal.locator('.btn-danger');

  //modalDeletePocketWithBalance
  readonly modalWithdrawFirstKeepItButton = this.modal.locator('[data-role=withdraw-modal-cancel-button]');
  readonly modalWithdrawFirstConfirmButton = this.modal.locator('[data-role=withdraw-modal-confirm-button]');

  constructor(page: Page) {
    super(page);
  }

  async isOnSuccessPage(): Promise<void> {
    await this.pageHeader.waitFor({ state: 'visible' });
    await this.createPocketButton.waitFor({ state: 'visible' });
  }
}
