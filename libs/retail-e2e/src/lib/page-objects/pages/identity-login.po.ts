import { Page } from '@playwright/test';
import { PageObject } from './page-object';

export class IdentityLoginPage extends PageObject {
  usernameInput = this.page.locator('input[name="username"]');
  primaryBtn = this.page.locator('.btn-primary');
  passwordInput = this.page.locator('input[name="password"]');

  constructor(page: Page) {
    super(page);
  }

  async loginThroughUI(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.primaryBtn.click();
    await this.passwordInput.fill(password);
    await this.primaryBtn.click();
  }
}
