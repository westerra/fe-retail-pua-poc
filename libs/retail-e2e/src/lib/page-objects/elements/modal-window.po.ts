import { Locator } from '@playwright/test';

export class ModalWindow {
  title: Locator = this.root.locator('.modal-title');
  body: Locator = this.root.locator('div[data-role="modal-body"]');
  private readonly confirmLocator: Locator = this.root.locator('button[data-role="confirm"]');
  private readonly cancelLocator: Locator = this.root.locator('button[data-role="cancel"]');

  constructor(protected root: Locator) {}

  async confirm() {
    await this.confirmLocator.click();
  }

  async cancel() {
    await this.cancelLocator.click();
  }
}
