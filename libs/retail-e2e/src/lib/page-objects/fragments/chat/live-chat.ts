import { Page } from '@playwright/test';
import { ChatBubble } from './chat-bubble.po';
import { ChatWindow } from './chat-window.po';

export class LiveChat {
  readonly chatButton = this.page.locator("button[data-role='chat-button']");
  readonly conversationPanel = this.page.locator('div.bb-rtc-conversation-panel');
  constructor(protected page: Page) {}
  chatBubble = new ChatBubble(this.chatButton, this.page);
  chatWindow = new ChatWindow(this.conversationPanel, this.page);
}
