import { Page } from '@playwright/test';
import { Config, SELF_ENROLLMENT_INTERNAL_PAGE_PATH } from '../../../data';
import { selectMockScenario } from '../../../utils';
import { StepFragment, ValidationErrorsFragment } from '../../fragments';
import { BasePage } from '../base-page.po';

export class SelfEnrollmentCreateUsernamePage extends BasePage {
  readonly pageLocator = this.page.locator('bb-self-enrollment-create-username-page');
  readonly stepFragment = new StepFragment(this.pageLocator);
  readonly validationErrorsFragment = new ValidationErrorsFragment(this.pageLocator);
  readonly pageHeader = this.page.locator('[data-role="create-username-view-heading"]');
  readonly usernameInput = this.page.locator('[data-role="create-username-input"] input');
  readonly continueButton = this.page.locator('[data-role="create-username-submit"] button');
  readonly usernames = {
    blacklisted: 'william',
    tooLong: 'abc',
    valid: 'a',
  };

  private readonly enrollmentPageWithIdUrl = `${this.config.baseUrl}${SELF_ENROLLMENT_INTERNAL_PAGE_PATH}`;

  constructor(page: Page, private readonly config: Config) {
    super(page);
  }

  async open(): Promise<void> {
    await selectMockScenario('getEnrollment', 'username');
    await this.page.goto(this.enrollmentPageWithIdUrl);
  }

  async setUsername(username: string) {
    await this.usernameInput.fill(username);
  }

  async progressToNextStep() {
    await this.continueButton.click({ force: true, delay: 1000 });
  }
}
