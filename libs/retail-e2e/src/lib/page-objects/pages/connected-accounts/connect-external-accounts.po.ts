import { expect, Locator } from '@playwright/test';
import { randomInt } from 'crypto';

export class ConnectExternalAccountsPopup {
  readonly modalHeader = this.root.locator('bb-modal-header-ui', { hasText: 'Connect external account' });
  readonly nameInput = this.root.locator('[data-role=payord-a2a-link-account-AccountName-input] input');
  readonly accountTypeInput = this.root.locator('[data-role=payord-a2a-link-account-AccountType-select] select');
  readonly accountNumberInput = this.root.locator('[data-role=payord-a2a-link-account-AccountNumber-input] input');
  readonly routingTransitNumberInput = this.root.locator(
    '[data-role=payord-a2a-link-account-RoutingNumber-input] input',
  );
  readonly connectButton = this.root.locator('.btn-primary', { hasText: 'Connect' });
  readonly creationSteps = this.root.locator('bb-a2a-link-account-steps');

  constructor(private root: Locator) {}

  async verifyPopup() {
    await expect(this.modalHeader).toHaveText('Connect external account');
    await expect(this.creationSteps).toHaveCount(2);
  }

  async fillInData(accountName: string): Promise<void> {
    await this.nameInput.fill(accountName);
    await this.accountNumberInput.fill(`${randomInt(1000000000, 99999999999)}`);
    await this.routingTransitNumberInput.fill('041215663');
    await this.accountTypeInput.selectOption('1: Savings');
    await this.connectButton.click();
  }
}
