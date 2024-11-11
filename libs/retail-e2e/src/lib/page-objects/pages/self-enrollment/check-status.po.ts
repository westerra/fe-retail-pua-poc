import { Page } from '@playwright/test';
import { Config, SELF_ENROLLMENT_CHECK_STATUS_PAGE_PATH } from '../../../data';
import { selectMockScenario } from '../../../utils';
import { BasePage } from '../base-page.po';

export type EnrollmentStatus = 'started' | 'complete' | 'failed';

export class SelfEnrollmentCheckStatusPage extends BasePage {
  readonly pageLocator = this.page.locator('bb-check-status-page');
  readonly completeHeader = this.page.locator('[data-role="check-status-view-complete-heading"]');
  readonly startedHeader = this.page.locator('[data-role="check-status-view-started-heading"]');
  readonly failedHeader = this.page.locator('[data-role="check-status-view-failed-heading"]');
  readonly successImage = this.page.locator('bb-icon-ui[color="success"]');
  readonly failedImage = this.page.locator('bb-icon-ui[color="warning"]');
  readonly completeInfo = this.page.locator('[data-role="check-status-view-complete-information"]');
  readonly failedInfo = this.page.locator('[data-role="check-status-view-failed-information"]');
  readonly loginLink = this.page.locator('[data-role="check-status-view-complete-login-link"]');
  readonly restartLink = this.page.locator('[data-role="check-status-view-failed-restart-registration-button"]');
  readonly loadingState = this.page.locator('[data-role="check-status-view-started-loading-indicator"]');

  private readonly enrollmentCheckStatusPageUrl = `${this.config.baseUrl}${SELF_ENROLLMENT_CHECK_STATUS_PAGE_PATH}`;

  constructor(page: Page, private readonly config: Config) {
    super(page);
  }

  async open(status: EnrollmentStatus = 'started'): Promise<void> {
    await selectMockScenario('getEnrollment', 'provisioningPassword');
    await selectMockScenario('postEnrollmentResponse', 'provisioningComplete');
    await selectMockScenario('getEnrollmentStatus', status);
    await this.page.goto(this.enrollmentCheckStatusPageUrl);
  }
}
