import { Page } from '@playwright/test';
import { Config, SELF_ENROLLMENT_PAGE_PATH } from '../../../data';
import { selectMockScenario } from '../../../utils';
import { CheckboxElementClass } from '../../elements';
import { StepFragment, ValidationErrorsFragment } from '../../fragments';
import { BasePage } from '../base-page.po';

export class SelfEnrollmentInstructionsPage extends BasePage {
  readonly pageLocator = this.page.locator('bb-self-enrollment-instructions-page');
  readonly stepFragment = new StepFragment(this.pageLocator);
  readonly validationError = new ValidationErrorsFragment(
    this.page.locator('[data-role="instructions-view-validation-message"]'),
  );
  readonly pageHeader = this.page.locator('[data-role="instructions-view-heading"]');
  readonly continueButton = this.page.locator('[data-role="instructions-view-continue-button"]');
  readonly checkbox = new CheckboxElementClass(this.page.locator('[data-role="instructions-view-terms-confirmation"]'));
  readonly termsAndConditionsLink = this.page.locator('[data-role="instructions-view-terms-and-conditions-link"]');
  readonly privacyPolicyLink = this.page.locator('[data-role="instructions-view-privacy-policy-link"]');

  private readonly enrollmentPageUrl = `${this.config.baseUrl}${SELF_ENROLLMENT_PAGE_PATH}`;

  constructor(page: Page, private readonly config: Config) {
    super(page);
  }

  async open(): Promise<void> {
    await selectMockScenario('postEnrollments', 'created');
    await this.page.goto(this.enrollmentPageUrl);
  }

  async progressToNextStep(): Promise<void> {
    await this.open();
    // https://github.com/microsoft/playwright/issues/5305
    // Current bug relating to checking checkboxes, resorting to JS injection for now
    //await this.checkbox.check();
    await this.page.waitForSelector('[data-role="checkbox-input"]');
    await this.page.evaluate(() => {
      const checkbox = document.querySelector('[data-role="checkbox-input"]') as HTMLInputElement;
      checkbox.click();
    });
    await this.continueButton.click({ delay: 500 });
  }
}
