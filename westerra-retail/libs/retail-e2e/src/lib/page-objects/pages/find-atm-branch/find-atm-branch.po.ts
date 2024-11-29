import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';

export class FindAtmBranchPage extends BasePage {
  journeyUi = this.page.locator('bb-places-journey');
  moreNav = this.mainNavigation.locator('#bb-menu-header-button-5');
  placesNav = this.mainNavigation.locator("li > [routerlink='/more/find-us']");
  searchBox = this.page.locator('bb-map-search-ui');
  placesList = this.page.locator('bb-places-list');
  placesMap = this.page.locator('bb-map-ui');
  emptyState = this.page.locator('[data-role=empty-state-title]');
  errorState = this.page.locator('bb-common-error-state-ui');
  errorStateText = this.page.locator('bb-common-error-state-ui [data-role=empty-state-title]');

  constructor(page: Page) {
    super(page);
  }

  async navigateTo() {
    await this.moreNav.click();
    await this.placesNav.click();
  }
}
