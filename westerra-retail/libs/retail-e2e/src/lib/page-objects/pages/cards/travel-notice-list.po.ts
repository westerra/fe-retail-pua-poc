import { expect, Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class TravelNoticeListPage extends BasePage {
  readonly createTravelNoticeButton = this.page.locator('[data-role=add-button]');
  readonly travelNoticeItemHeaders = this.page.locator('.bb-stack__item.bb-travel-notice-header');
  readonly travelNoticeItems = this.page.locator('bb-cards-travel-notice-list-item');
  readonly emptyPageCreateButton = this.page.locator('button', { hasText: 'Create new' });
  readonly deleteTravelNoticeButtons = this.page.locator('[name=delete]');
  readonly deleteButtonPopUp = this.page.locator('.btn-danger', { hasText: 'Delete travel notice' });
  readonly travelNoticeEmptyState = this.page.locator('.bb-travel-notice-empty-state');

  constructor(page: Page) {
    super(page);
  }

  async navigateToCreation() {
    const travelNoticeCount = await this.travelNoticeItems.count();

    if (travelNoticeCount > 0) {
      await this.createTravelNoticeButton.click();
    } else {
      await this.emptyPageCreateButton.click();
    }
  }

  async deleteTravelNotice(index: number) {
    await this.deleteTravelNoticeButtons.nth(index).click();
    await this.deleteButtonPopUp.click();
  }

  async expectedTravelNoticesAfterDelete(numberTravelNoticesBeforeDelete: number) {
    if (numberTravelNoticesBeforeDelete === 1) {
      await this.travelNoticeEmptyState.waitFor({ state: 'visible' });
    } else {
      await this.travelNoticeItemHeaders.last().waitFor({ state: 'visible' });
      expect(await this.travelNoticeItemHeaders.count()).toBe(numberTravelNoticesBeforeDelete - 1);
    }
  }
}
