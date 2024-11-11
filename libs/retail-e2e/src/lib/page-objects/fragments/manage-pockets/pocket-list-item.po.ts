import { Locator } from '@playwright/test';

export class PocketListItem {
  readonly image = this.root.locator('.bb-manage-pockets-common-pocket-card__pocket-image');
  readonly title = this.root.locator('h2');
  readonly subTitle = this.root.locator('.bb-subtitle');
  readonly balanceAmount = this.root.locator('[data-role=pocket-balance]');
  readonly targetAmount = this.root.locator('.bb-manage-pockets-common-pocket-card__goal-amount');
  readonly progressBar = this.root.locator('[role=progressbar]');
  readonly progressPercentage = this.root.locator('.bb-manage-pockets-common-pocket-card__goal-percentage');
  readonly targetCompletedIcon = this.root.locator('.bb-icon-check');
  readonly targetDate = this.root.locator('.bb-manage-pockets-common-pocket-card__deadline-date');
  readonly transferButton = this.root.locator('.dropdown-toggle');

  constructor(private root: Locator) {}
}
