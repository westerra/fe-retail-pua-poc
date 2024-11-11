import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  InquireAndDisputeTopics,
  Transaction,
  TransactionCheckImageResponse,
  TransactionsDetailsLoading,
} from '@backbase/transactions-common-ang';
import { TransactionsListItemGroupComponent } from '@backbase/transactions-list-widget-ang';
import { DateTimezoneTransformationService } from '@backbase/ui-ang/date-timezone-transformation';

@Component({
  selector: 'bb-transactions-list-item-group-extended',
  templateUrl: './transactions-list-item-group-extended.component.html',
  styles: [],
})
export class TransactionsListItemGroupExtendedComponent extends TransactionsListItemGroupComponent {
  constructor(dateTimezoneTransformationService: DateTimezoneTransformationService) {
    super(dateTimezoneTransformationService);
    // this.detailsOpen = new EventEmitter();
    // /**
    //  * Reference to instance of customizable component.
    //  */
    // this.hostRef = this;
  }

  // /**
  //  * Title to be displayed over transactions.
  //  */
  // @Input() transactionDate: string | undefined;
  // /**
  //  * The transactions this component shows.
  //  */
  // @Input() transactions: Transaction[] | undefined;
  // /**
  //  * Boolean that decides if the Change Category will be displayed.
  //  */
  // @Input() showChangeCategory: boolean | undefined;
  // @Input() checkImagesList: TransactionCheckImageResponse | undefined;
  // @Input() transactionDetailsLoadingStatus: TransactionsDetailsLoading | undefined;
  // @Input() inquireAndDisputeTopics: InquireAndDisputeTopics | undefined;

  // @Output() readonly detailsOpen: EventEmitter<Transaction>;

  // public readonly hostRef;

  // ngOnInit(): void {
  //   if (typeof this.transactions === 'undefined') {
  //     throw new Error(`"transactions" input is required in "${this.constructor.name}"`);
  //   }
  // }

  // onDetailOpen(transaction: Transaction): void {
  //   this.detailsOpen.emit(transaction);
  // }

  // roundDateUTC(date) {
  //   date.setUTCHours(0);
  //   date.setUTCMinutes(0);
  //   date.setUTCSeconds(0);
  //   date.setUTCMilliseconds(0);
  //   return date;
  // }

  // trackByFn(_index: number, element: Transaction): string {
  //   return element.id;
  // }
}
