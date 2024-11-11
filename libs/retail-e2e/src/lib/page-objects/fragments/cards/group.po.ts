import { Locator } from '@playwright/test';

export class Group {
  readonly heading = this.root.locator('h2');
  readonly cards = this.root.locator('bb-payment-card');

  constructor(private root: Locator) {}
}
