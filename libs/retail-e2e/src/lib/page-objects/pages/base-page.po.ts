import { LiveChat, Notifications, UserContextMenu } from '../fragments';
import { Locator, Page } from '@playwright/test';
import { PageObject } from './page-object';
import { IdentityLoginPage } from './identity-login.po';
import { DropDownMenu, ModalWindow } from '../elements';

export class BasePage extends PageObject {
  readonly pageTitleHeader = this.page.locator('h1[data-role="headings"] >> nth=0');
  readonly mainNavigation = this.page.locator('ul.bb-layout__horizontal-nav');
  readonly myAccountsNav = this.page.locator("li > [routerlink='/my-accounts']");
  readonly pocketsNavItem = this.mainNavigation.locator("li > [routerlink='/pockets']");
  readonly selfService = this.mainNavigation.locator('#bb-menu-header-button-4');
  readonly manageCardsNavItem = this.mainNavigation.locator("li > [routerlink='/self-service/manage-cards']");
  readonly billPay = this.page.locator('#bb-menu-header-button-transfers');
  readonly billPayNavItem = this.mainNavigation.locator("li > [routerlink='/billpay/pay-bills']");
  readonly moreNavigation = this.mainNavigation.locator('#bb-menu-header-button-5');
  readonly budgetsNavItem = this.mainNavigation.locator("li >[routerlink='/more/budgets']");
  readonly transfersNavItem = this.mainNavigation.locator('#bb-menu-header-button-1');
  readonly activityNavItem = this.mainNavigation.locator("li > [routerlink='/transfers/activity']");
  readonly messagesNav = this.page.locator("li > [routerlink='/more/messages']");

  readonly userContextMenu = new UserContextMenu(this.page);
  readonly notifications = new Notifications(this.page);
  readonly liveChat = new LiveChat(this.page);
  readonly modalWindow = new ModalWindow(this.page.locator('div.modal-content-container'));

  constructor(page: Page) {
    super(page);
  }

  topNavMenuDropdown(menuItem: Locator): DropDownMenu {
    return new DropDownMenu(menuItem.locator('..'), this.page);
  }

  async logOut() {
    await this.userContextMenu.logOut();
    return new IdentityLoginPage(this.page);
  }
}
