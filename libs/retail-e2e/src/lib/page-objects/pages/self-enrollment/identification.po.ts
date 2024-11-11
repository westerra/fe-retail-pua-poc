import { Page } from '@playwright/test';
import { Config, SELF_ENROLLMENT_INTERNAL_PAGE_PATH } from '../../../data';
import { selectMockScenario } from '../../../utils';
import { DatepickerElementClass } from '../../elements';
import { AlertFragment, CsrModalFragment, StepFragment, ValidationErrorsFragment } from '../../fragments';
import { BasePage } from '../base-page.po';

export interface Account {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  externalId: string;
  dateOfBirth: string;
  accNumber: string;
  ssn: string;
}

export class SelfEnrollmentIdentificationPage extends BasePage {
  readonly pageLocator = this.page.locator('bb-self-enrollment-identification-page');
  readonly stepFragment = new StepFragment(this.pageLocator);
  readonly validationError = new ValidationErrorsFragment(this.pageLocator);
  readonly alerts = new AlertFragment(this.pageLocator);
  readonly dobField = new DatepickerElementClass(this.pageLocator);
  readonly csrModalFragment = new CsrModalFragment(this.page.locator('html'));
  readonly accountNoField = this.page.locator('[data-role="input"]').nth(0);
  readonly ssnField = this.page.locator('[data-role="input"]').nth(1);
  readonly cardNoField = this.page.locator('[data-role="input"]').nth(1);
  readonly switchCardOrSSN = this.page.locator(
    '[data-role="account-identification-toggle-card-number-social-security"]',
  );
  readonly pageHeader = this.page.locator('[data-role="identification-view-heading"]');
  readonly nextButton = this.page.locator('[data-role="account-identification-submit"]');

  private readonly enrollmentPageWithIdUrl = `${this.config.baseUrl}${SELF_ENROLLMENT_INTERNAL_PAGE_PATH}`;

  constructor(page: Page, private readonly config: Config) {
    super(page);
  }

  async open(): Promise<void> {
    await selectMockScenario('getEnrollment', 'identification');
    await this.page.goto(this.enrollmentPageWithIdUrl);
  }

  async fillInAccountDetails(account: Account) {
    await this.dobField.input.fill(account.dateOfBirth);
    await this.accountNoField.fill(account.accNumber);
    await this.ssnField.fill(account.ssn);
  }

  async progressToNextStep() {
    // Delay required for this one on 'correct' type
    await this.nextButton.click({ force: true, delay: 1000 });
  }

  generateAccount(): Account {
    const dobYear = Math.floor(Math.random() * (1900 - 1995) + 1995).toString();
    const dobMonth = Math.floor(Math.random() * (1 - 12) + 12)
      .toString()
      .padStart(2, '0');
    const dobDay = Math.floor(Math.random() * (1 - 28) + 28)
      .toString()
      .padStart(2, '0');

    const account = {
      firstName: Math.random().toString(36).slice(2),
      lastName: Math.random().toString(36).slice(2),
      email: Math.random().toString(36).slice(2) + '@gmail.com',
      phoneNumber: Math.floor(10000000000 + Math.random() * 90000000000).toString(), // 11 digits
      externalId: Math.random().toString(36).slice(2),
      dateOfBirth: `${dobYear}-${dobMonth}-${dobDay}`, // yyyy-mm-dd
      accNumber: Math.floor(100000000000 + Math.random() * 900000000000).toString(), // 12 digits
      ssn: Math.floor(100000000 + Math.random() * 900000000).toString(), // 9 digits
    };

    return account;
  }
}
