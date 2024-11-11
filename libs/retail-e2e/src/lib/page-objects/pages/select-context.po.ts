import { Page } from '@playwright/test';
import { PageObject } from './page-object';

export class SelectContextPage extends PageObject {
  constructor(page: Page) {
    super(page);
  }

  async selectContext(context: string): Promise<void> {
    await this.page.locator('//div[@data-role="service-agreement-item-name"]', { hasText: context }).click();
  }
}
