import { Locator } from '@playwright/test';

export class BudgetCard {
  readonly budgetAmountSpendAndTotal = this.root.locator('bb-budget-card-info-ui');
  readonly toggleButton = this.root.locator('[data-role=options-button]');

  constructor(private root: Locator) {}
}
