import { Locator, Page } from '@playwright/test';

export class ChatWindow {
  readonly messageTextArea = this.root.locator("textarea[placeholder='Type a Message']");
  readonly submitBtn = this.root.locator("button[aria-label='Send message']");
  readonly chatTitle = this.root.locator('div.bb-block--md>.bb-rtc-current-day');
  readonly firstMessage = this.root.locator('div.bb-block--md>.bb-rtc-conversation-panel-row-message');
  readonly messages = this.root.locator('div.bb-block--md.ng-star-inserted');
  readonly minimizeChatWindowBtn = this.root.locator("button[data-role='conversation-chat-minimize-button']");
  readonly closeChatWindowBtn = this.root.locator("button[data-role='conversation-chat-end-button']");
  readonly chatTextArea = this.root.locator('textarea');
  readonly loadingSpinner = this.root.locator('div[data-role="loading-indicator-wrapper"]');
  conversationSid!: string;

  constructor(protected root: Locator, protected page: Page) {}

  async sendMessage(message: string, options?: Partial<{ captureConversationSid: boolean }>) {
    await this.typeMessage(message);
    await this.submit(options?.captureConversationSid);
    await this.root.locator('text=' + message).waitFor();
    await this.loadingSpinner.waitFor({ state: 'hidden' });
  }

  async typeMessage(message: string) {
    await this.messageTextArea.type(message, { delay: 100 });
  }

  async submit(captureConversationSid = false) {
    if (captureConversationSid) {
      const [response] = await Promise.all([
        this.page.waitForResponse('**/api/rtc/client-api/v1/rtc/conversations'),
        this.submitBtn.click(),
      ]);
      const conversationResponse = await response.json();
      this.conversationSid = conversationResponse.id;
      return;
    }
    await this.submitBtn.click();
  }

  async getAllMessages() {
    this.messages.last().waitFor();
    return await this.messages.allTextContents();
  }

  async minimizeChat() {
    await this.minimizeChatWindowBtn.click();
  }

  async closeChat() {
    await this.closeChatWindowBtn.click();
  }
}
