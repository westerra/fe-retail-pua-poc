import { Locator } from '@playwright/test';

export class Card {
  readonly cardContainer = this.root.locator('bb-payment-card-state-wrapper-ui');
  readonly cardNumber = this.root.locator('.bb-payment-card__number');
  readonly name = this.root.locator('.bb-payment-card__name');
  readonly lockedIcon = this.root.locator('.bb-icon-lock');
  readonly deactivatedIcon = this.root.locator('.bb-icon-not-interested');
  readonly badge = this.root.locator('bb-badge-ui span');

  constructor(private root: Locator) {}
}
