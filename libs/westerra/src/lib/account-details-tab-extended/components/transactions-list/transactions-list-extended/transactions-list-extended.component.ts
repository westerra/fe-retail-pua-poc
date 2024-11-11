import { Component } from '@angular/core';
import { TransactionsListComponent } from '@backbase/transactions-list-widget-ang';

@Component({
  selector: 'bb-transactions-list-extended',
  templateUrl: './transactions-list-extended.component.html',
})
export class TransactionsListExtendedComponent extends TransactionsListComponent {}
