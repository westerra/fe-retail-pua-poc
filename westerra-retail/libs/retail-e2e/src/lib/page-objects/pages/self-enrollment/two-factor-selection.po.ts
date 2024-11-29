import { Page } from '@playwright/test';
import { Config, SELF_ENROLLMENT_INTERNAL_PAGE_PATH } from '../../../data';
import { selectMockScenario } from '../../../utils';
import { CsrModalFragment, StepFragment } from '../../fragments';
import { BasePage } from '../base-page.po';

export class SelfEnrollmentTwoFactorSelectionPage extends BasePage {
  readonly pageLocator = this.page.locator('bb-self-enrollment-two-factor-selection-page');
  readonly stepFragment = new StepFragment(this.pageLocator);
  readonly csrModalFragment = new CsrModalFragment(this.page.locator('html'));
  readonly pageHeader = this.page.locator('[data-role="two-factor-selection-view-main-heading"]');
  readonly emailVerificationMethod = this.page.locator(
    '[data-role="two-factor-selection-view-verification-methods-email"]',
  );
  readonly smsVerificationMethod = this.page.locator(
    '[data-role="two-factor-selection-view-verification-methods-sms"]',
  );
  readonly emailVerificationIcon = this.emailVerificationMethod.locator(
    '[data-role="two-factor-selection-view-channel-icon"]',
  );
  readonly smsVerificationIcon = this.smsVerificationMethod.locator(
    '[data-role="two-factor-selection-view-channel-icon"]',
  );
  readonly emailVerificationText = this.emailVerificationMethod.locator('.bb-text-support');
  readonly smsVerificationText = this.smsVerificationMethod.locator('.bb-text-support');
  readonly emailVerificationButton = this.page.locator(
    '[data-role="two-factor-selection-view-email-channel-select-button"]',
  );
  readonly smsVerificationButton = this.page.locator(
    '[data-role="two-factor-selection-view-sms-channel-select-button"]',
  );

  private readonly enrollmentPageWithIdUrl = `${this.config.baseUrl}${SELF_ENROLLMENT_INTERNAL_PAGE_PATH}`;

  constructor(page: Page, private readonly config: Config) {
    super(page);
  }

  async open(): Promise<void> {
    await selectMockScenario('getEnrollment', 'twoFASelection');
    await this.page.goto(this.enrollmentPageWithIdUrl);
  }

  async progressToNextStepWithEmail(): Promise<void> {
    await this.emailVerificationButton.click();
  }
  async progressToNextStepWithSMS(): Promise<void> {
    await this.emailVerificationButton.click();
  }
}
