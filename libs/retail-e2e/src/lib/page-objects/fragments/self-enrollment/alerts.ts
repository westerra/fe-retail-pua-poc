import { Locator } from '@playwright/test';

export class AlertFragment {
  readonly alertHeading = this.root.locator('.alert-heading');
  readonly alertContent = this.root.locator('[data-role="alert-content"]');
  readonly keycloakAlertContent = this.root.locator('.alert-content');

  constructor(private root: Locator) {}
}
