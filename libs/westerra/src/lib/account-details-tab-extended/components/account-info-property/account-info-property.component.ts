/* eslint-disable import/no-extraneous-dependencies */
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccountInfoPropertyComponent } from '@backbase/internal-at-shared-ui-ang';

@Component({
  selector: 'bb-account-info-property-extended',
  templateUrl: './account-info-property.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountInfoPropertyExtendedComponent extends AccountInfoPropertyComponent {}
