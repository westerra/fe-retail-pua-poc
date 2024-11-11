import { Locator, Page } from '@playwright/test';

export class ChatBubble {
  readonly chatIcon: Locator = this.chatBubbleLocator.locator("em[aria-label='chat bubble icon']");

  constructor(protected chatBubbleLocator: Locator, protected page: Page) {}

  async toggleChat() {
    await this.chatBubbleLocator.click();
    this.page.waitForLoadState();
  }
}
