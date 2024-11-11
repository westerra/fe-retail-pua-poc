import { Page } from '@playwright/test';
import { BasePage } from '../base-page.po';
import { NewMessageWindow } from '../../fragments/messages';

export class MessagesPage extends BasePage {
  readonly composeButton = this.page.locator('[data-role="messages-heading-button"]');
  readonly newMessageModalWindow = new NewMessageWindow(this.page.locator('.modal-content-container'));
  readonly subjectColumn = this.page.locator('[class="break-word ng-star-inserted"]');
  readonly popUpNotification = this.page.locator('[data-role="notification-alert"]');
  readonly outBoxTab = this.page.locator('[href="/more/messages/outbox"]');

  constructor(page: Page) {
    super(page);
  }
}
