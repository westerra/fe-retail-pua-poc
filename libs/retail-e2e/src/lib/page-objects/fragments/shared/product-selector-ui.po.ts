import { Locator } from '@playwright/test';

export class ProductSelectorUI {
  readonly productItem = this.root.locator('[data-role="product-selector-dropdown-menu"] button');
  readonly dropdownToggle = this.root.locator('button[ngbdropdowntoggle]');

  constructor(private root: Locator) {}

  async selectProductWithIndex(index: number) {
    await this.dropdownToggle.click();
    await this.productItem.nth(index).click();
  }

  async selectProductWithSelector(selector: string) {
    await this.dropdownToggle.click();
    await this.root.locator(selector).click();
  }
}
