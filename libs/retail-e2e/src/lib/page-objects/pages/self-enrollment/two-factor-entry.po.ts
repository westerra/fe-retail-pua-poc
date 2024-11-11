import { expect, Page } from '@playwright/test';
import { Config, SELF_ENROLLMENT_INTERNAL_PAGE_PATH } from '../../../data';
import { selectMockScenario } from '../../../utils';
import { StepFragment } from '../../fragments';
import { BasePage } from '../base-page.po';

export type TwoFAPageType = 'twoFAEntryEmail' | 'twoFAEntrySMS';

export class SelfEnrollmentTwoFactorEntryPage extends BasePage {
  readonly pageLocator = this.page.locator('bb-self-enrollment-two-factor-entry-page');
  readonly stepFragment = new StepFragment(this.pageLocator);
  readonly pageHeader = this.page.locator('[data-role="two-factor-entry-view-main-heading"]');
  readonly channelIcon = this.page.locator('[data-role="two-factor-entry-view-channel-icon"]');
  readonly channelText = this.page.locator('[data-role="two-factor-entry-view-channel-value"]');
  readonly otpEntry = this.page.locator('[data-role="two-factor-entry-view-otp-input"] input');
  readonly otpSubmit = this.page.locator('[data-role="two-factor-entry-view-otp-input-submit-button"]');
  readonly tryAnotherMethod = this.page.locator('[data-role="try-another-method-button"]');

  private readonly enrollmentPageWithIdUrl = `${this.config.baseUrl}${SELF_ENROLLMENT_INTERNAL_PAGE_PATH}`;

  constructor(page: Page, private readonly config: Config) {
    super(page);
  }

  async open(type: TwoFAPageType = 'twoFAEntryEmail'): Promise<void> {
    await selectMockScenario('getEnrollment', type);
    await this.page.goto(this.enrollmentPageWithIdUrl);
  }

  async checkChannelInfoIsVisible(): Promise<void> {
    await expect.soft(this.channelIcon).toBeVisible();
    await expect.soft(this.channelText).toBeVisible();
    await expect.soft(this.otpEntry).toBeVisible();
    await expect.soft(this.otpSubmit).toBeVisible();
  }

  async progressToNextStep(): Promise<void> {
    await this.otpEntry.type('123456');
    await this.otpSubmit.click();
  }
}
