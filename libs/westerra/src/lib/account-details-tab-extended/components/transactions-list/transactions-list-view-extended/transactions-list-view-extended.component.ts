import { Component } from '@angular/core';
import { TransactionsListComponent } from '@backbase/accounts-transactions-journey-ang';

@Component({
  selector: 'bb-transactions-list-view-extended',
  templateUrl: './transactions-list-view-extended.component.html',
})
export class TransactionsListViewExtendedComponent extends TransactionsListComponent {}
