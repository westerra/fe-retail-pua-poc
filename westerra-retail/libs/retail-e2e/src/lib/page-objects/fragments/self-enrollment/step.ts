import { expect, Locator } from '@playwright/test';
import { ProgressBarElementClass } from '../../elements';

export class StepFragment {
  readonly stepTitle = this.root.locator('[data-role="self-enrollment-progress-title"]');
  readonly progressBar = new ProgressBarElementClass(this.root.locator('bb-self-enrollment-progress-indicator'));

  constructor(private root: Locator) {}

  async validateStep(expectedStep: string) {
    await this.waitForNextStep(expectedStep);
    expect.soft(await this.getCurrentStep()).toBe(expectedStep);
    expect.soft(await this.progressBar.findCurrentProgress()).toBe(expectedStep);
  }

  async getCurrentStep() {
    const title = await this.stepTitle.textContent();
    const step = title?.match(/(\d+)\/\d+/);
    if (!step || !step.length) {
      throw new Error('No step found');
    }
    return step[1];
  }

  async waitForNextStep(expectedStep: string) {
    await expect
      .poll(async () => this.getCurrentStep(), {
        message: 'Current step did not match the expected step',
        timeout: 5000,
      })
      .toBe(expectedStep);
  }
}
