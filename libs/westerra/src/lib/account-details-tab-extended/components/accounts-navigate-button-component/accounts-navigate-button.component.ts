import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isRtl } from '@backbase/ui-ang/util';
/**
 * A component for displaying back to accounts list button
 */
@Component({
  selector: 'bb-accounts-navigate-button-extended',
  templateUrl: './accounts-navigate-button.component.html',
})
export class AccountsNavigateButtonComponent {
  /**
   * check right to left property
   */
  readonly isRtl = isRtl;
  /**
   * Buton display name
   */
  @Input() name: string | undefined = '';
  /**
   * Event (Output) that emits when button is clicked
   */
  @Output() navigateBack = new EventEmitter<undefined>();

  onNavigateBack() {
    this.navigateBack.emit();
  }
}
