import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {
  InquireAndDisputeTopics,
  Transaction,
  TransactionCheckImageResponse,
  TransactionsDetailsLoading,
} from '@backbase/transactions-common-ang';
import { AccountArrangementItem } from '@backbase/arrangement-manager-http-ang';
import { BillingStatusEnum } from '@backbase/transactions-common-ang';

@Component({
  selector: 'bb-transactions-detail-modal-extended',
  templateUrl: './transactions-detail-modal-extended.component.html',
  styleUrls: ['./transactions-detail-modal-extended.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsDetailModalExtendedComponent implements OnInit {
  @Input() isDetailsOpen: boolean;
  @Input() transaction: Transaction | undefined;
  @Input() showBillingStatus: boolean | undefined;
  @Input() showChangeCategory: boolean | undefined;
  @Input() checkImagesList: TransactionCheckImageResponse | undefined;
  @Input() transactionDetailsLoadingStatus: TransactionsDetailsLoading | undefined;
  @Input() inquireAndDisputeTopics: InquireAndDisputeTopics;
  @Input() account: Observable<AccountArrangementItem | undefined>;
  @Output() detailsOpen: EventEmitter<Transaction> = new EventEmitter();
  @Output() close: EventEmitter<void> = new EventEmitter();

  public isEditingNotes: boolean;

  public showInquiryAndDispute: boolean;
  public alertOptions: {
    displayAlert: boolean;
    displayStatus: string;
  };

  constructor() {
    this.isDetailsOpen = false;
    this.isEditingNotes = false;
    this.inquireAndDisputeTopics = {
      inquire: '',
      dispute: '',
    };
    this.showInquiryAndDispute = false;
    this.alertOptions = {
      displayAlert: false,
      displayStatus: '',
    };
  }

  ngOnInit(): void {}

  onAlertDismiss(): void {
    this.alertOptions = {
      displayAlert: false,
      displayStatus: '',
    };
  }
  closeTransactionsCategory(categoryChangeStatus?: string): void {
    if (categoryChangeStatus) {
      this.alertOptions = {
        displayAlert: true,
        displayStatus: categoryChangeStatus,
      };
    } else {
      this.onAlertDismiss();
    }
  }
  closeDetails(): void {
    this.showInquiryAndDispute = false;
    this.close.emit();
  }
  get isPending(): boolean {
    let isPending = false;
    if (this.transaction && this.transaction.billingStatus) {
      const billingStatus = this.transaction.billingStatus.toUpperCase();
      isPending = billingStatus === BillingStatusEnum.pending || billingStatus === BillingStatusEnum.unbilled;
    }
    return isPending;
  }
}
