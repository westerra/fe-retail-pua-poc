import { Locator } from '@playwright/test';

export class CsrModalFragment {
  readonly modal = this.root.locator('[data-role="modal-body"]');
  readonly modalHeader = this.root.locator('[data-role="contact-advisor-modal-header"]');
  readonly modalContent = this.root.locator('[data-role="contact-advisor-modal-body"]');
  readonly modalOpenButton = this.root.locator('[data-role="contact-advisor-modal-open"]');
  readonly modalCloseButton = this.root.locator('[data-role="contact-advisor-modal-close"]');

  constructor(private root: Locator) {}
}
