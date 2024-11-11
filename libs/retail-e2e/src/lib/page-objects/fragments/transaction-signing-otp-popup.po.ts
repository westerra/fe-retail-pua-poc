import { expect, Page } from '@playwright/test';
import { Config } from '../../data';
import { getOtp } from '../../utils';

export class TransactionSigningOTPPopup {
  readonly transactionSigningHeader = this.root.locator('bb-transaction-signing-header h2');
  readonly otpInput = this.root.locator('bb-transaction-signing-sms-otp [data-role="ts-sms-otp-field"] input');
  readonly otpSubmit = this.root.locator('bb-transaction-signing-sms-otp [data-role="ts-sms-otp-complete"]');
  readonly loadingIndicator = this.root.locator('bb-transaction-signing-sms-otp bb-loading-indicator-ui');

  constructor(private root: Page, private config: Config) {}

  async enterOTPAndSubmit(): Promise<void> {
    await expect(this.transactionSigningHeader).toHaveText(/.*Authori(s|z)e.*/);
    const otp = await getOtp();
    await this.otpInput.fill(otp);
    await this.otpSubmit.click();
    await this.loadingIndicator.waitFor({ state: 'hidden' });
  }
}
