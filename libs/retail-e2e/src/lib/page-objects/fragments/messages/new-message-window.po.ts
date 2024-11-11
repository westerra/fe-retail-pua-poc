import { Locator } from '@playwright/test';

export class NewMessageWindow {
  readonly topicFieldDropDown = this.root.locator('[data-role="dropdown"]');
  readonly subjectField = this.root.locator('[data-role="subject"] input');
  readonly messageField = this.root.locator('[class="ql-editor ql-blank"]');
  readonly sendButton = this.root.locator('[data-role="submit"]');

  constructor(private root: Locator) {}
}
