import { Locator } from '@playwright/test';

export class CheckboxElementClass {
  readonly checkboxInput = this.root.locator('[data-role="checkbox-input"]');

  constructor(private root: Locator) {}

  async check(): Promise<void> {
    await this.checkboxInput.check({ force: true });
  }
}
