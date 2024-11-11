import { Page, expect } from '@playwright/test';
import { BasePage } from '../base-page.po';
import { PayBillsListPage } from './manage-payees-list.po';
import { StateSelection } from '../../../data/model/stateenum';

export class AddPayeePage extends BasePage {
  readonly addPayeeHdng = this.page.locator('[data-role="headings"]', { hasText: ' Add Payee ' });
  readonly enterDtlsManBtn = this.page.locator('[data-role="enter-details-button"]');
  readonly compnyOrgIndName = this.page.locator('[data-role="name-input"] input');
  readonly addressLn1 = this.page.locator('[data-role="address1-input"] input');
  readonly addressLn2 = this.page.locator('[data-role="address2-input"] input');
  readonly city = this.page.locator('[data-role="city-input"] input');
  readonly state = this.page.locator('select[data-role="dropdown"]');
  readonly continueBtn = this.page.locator('[data-role="continue-button"]');
  readonly findDiffPayeeBtn = this.page.locator('[data-role="back-button"]');
  readonly cancelBtn = this.page.locator('[data-role="cancel-button"]');
  readonly zipCode = this.page.locator('[data-role="postal-code-input"] input');
  readonly payeeZipCode = this.page.locator('[data-role="zip-code-input"] input');
  readonly addPayeeBtn = this.page.locator('button[data-role="add-payee-button"]');
  readonly findPayeeTitleHdng = this.page.locator('h2[data-role="headings"]');
  readonly findPayeeTitleInput = this.page.locator('input[data-role="search-input"]');
  readonly accountNumberInputField = this.page.locator('[data-role="account-number-input"] input');
  readonly zipCodeForElectronicPayee = this.page.locator('[data-role=zip-code-input"]');
  readonly listOfPayees = this.page.locator('button[role="option"]');

  constructor(page: Page) {
    super(page);
  }

  async isOnPage() {
    await expect(this.addPayeeHdng).toHaveText(' Add Payee ');
  }

  async fillPayeeDetailsManually(companyName: string, address1: string, address2: string, city: string, zip: string) {
    await this.compnyOrgIndName.fill(companyName);
    await this.addressLn1.fill(address1);
    await this.addressLn2.fill(address2);
    await this.city.fill(city);
    await this.zipCode.fill(zip);
    await this.selectState(StateSelection.Alaska);
    await this.continueBtn.click();
    return new PayBillsListPage(this.page);
  }

  async selectState(StateSelection: string) {
    await this.state.click();
    await this.state.selectOption({ label: StateSelection });
  }

  async addElectronicPayee(accountNumber: string, payeeZip: string) {
    await this.accountNumberInputField.fill(accountNumber);
    if (await this.payeeZipCode.isVisible()) {
      await this.payeeZipCode.fill(payeeZip);
    }
    await this.continueBtn.click();
    await this.addPayeeBtn.click();
  }
}
