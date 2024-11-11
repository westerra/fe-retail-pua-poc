import { Page } from '@playwright/test';
import { BasePage } from '../../pages';

export class MainNavigation extends BasePage {
  constructor(public page: Page) {
    super(page);
  }
}
