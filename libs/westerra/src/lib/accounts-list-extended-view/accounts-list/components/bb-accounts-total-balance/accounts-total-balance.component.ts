import { Component, Input } from '@angular/core';

@Component({
  selector: 'bb-accounts-total-balance',
  templateUrl: './accounts-total-balance.component.html',
})
export class AccountsTotalBalanceComponent {
  /**
   * Total balance
   */
  @Input() balance = '';
  /**
   * Currency
   */
  @Input() currency = '';
}
