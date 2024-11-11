import { Locator } from '@playwright/test';

export class DatepickerElementClass {
  readonly input = this.root.locator('[data-role="input-date-single"]');

  constructor(private root: Locator) {}
}
