/* eslint-disable import/no-extraneous-dependencies */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountNumberComponent } from '@backbase/internal-at-shared-ui-ang';

@Component({
  selector: 'bb-account-number-custom',
  templateUrl: './account-number-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountNumberCustomComponent extends AccountNumberComponent {}
