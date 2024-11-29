import { Locator } from '@playwright/test';

export class ValidationErrorsFragment {
  readonly errorMessage = this.root.locator('.bb-input-validation-message');

  constructor(private root: Locator) {}

  async allValidationErrors(): Promise<Array<string>> {
    const rawMessages = await this.errorMessage.allTextContents();
    return rawMessages.map((text) => text.trim());
  }
}
