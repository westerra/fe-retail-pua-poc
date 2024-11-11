import { Component } from '@angular/core';
import { TransactionsContainerComponent } from '@backbase/transactions-list-widget-ang';
import {
  TransactionsService,
  PendingTransactionsService,
  TransactionDetailsService,
} from '@backbase/transactions-common-ang';

@Component({
  selector: 'bb-transactions-container-extended',
  templateUrl: './transactions-container-extended.component.html',
  providers: [TransactionsService, PendingTransactionsService, TransactionDetailsService],
})
export class TransactionsContainerExtendedComponent extends TransactionsContainerComponent {}
