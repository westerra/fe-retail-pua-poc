import { Locator } from '@playwright/test';

export class ProgressBarElementClass {
  readonly bar = this.root.locator('[role="progressbar"]');

  constructor(private root: Locator) {}

  async findCurrentProgress(): Promise<string | null> {
    return this.bar.getAttribute('aria-valuenow');
  }
}
