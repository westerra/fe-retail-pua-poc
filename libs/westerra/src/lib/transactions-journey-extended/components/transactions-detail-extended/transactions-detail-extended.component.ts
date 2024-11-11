import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, Optional } from '@angular/core';

import { Observable, map } from 'rxjs';

import {
  AccountsTransactionsConfiguration,
  MessagesService,
  TransactionsInquireAndDisputeUIService,
  TransactionsService,
  TransactionUpdateService,
  BaseTransactionDetails,
} from '@backbase/transactions-common-ang';

import { AccountArrangementItem } from '@backbase/arrangement-manager-http-ang';

@Component({
  selector: 'bb-transactions-detail-extended',
  templateUrl: './transactions-detail-extended.component.html',
  styleUrls: ['./transactions-detail-extended.component.scss'],
  providers: [TransactionsInquireAndDisputeUIService, TransactionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsDetailExtendedComponent extends BaseTransactionDetails implements OnInit {
  protected readonly transactionUpdate: TransactionUpdateService;
  protected readonly messagesService: MessagesService;
  protected readonly transactionsInquireAndDispute: TransactionsInquireAndDisputeUIService;
  protected readonly cd: ChangeDetectorRef;
  protected readonly transactionsService: TransactionsService;
  readonly config: AccountsTransactionsConfiguration;

  /**
   * Whether to show the account number (for example, when transactions of multiple accounts are
   * shown) or not.
   */
  @Input() showAccountNumber: boolean;
  @Input() isPending: boolean;
  @Input() account?: Observable<AccountArrangementItem | undefined>;

  constructor(
    transactionUpdate: TransactionUpdateService,
    messagesService: MessagesService,
    transactionsInquireAndDispute: TransactionsInquireAndDisputeUIService,
    cd: ChangeDetectorRef,
    transactionsService: TransactionsService,
    config: AccountsTransactionsConfiguration,
  ) {
    super(transactionUpdate, messagesService, transactionsInquireAndDispute, cd, transactionsService);
    this.transactionUpdate = transactionUpdate;
    this.messagesService = messagesService;
    this.transactionsInquireAndDispute = transactionsInquireAndDispute;
    this.cd = cd;
    this.transactionsService = transactionsService;
    this.config = config;
    /**
     * Whether to show the account number (for example, when transactions of multiple accounts are
     * shown) or not.
     */
    this.showAccountNumber = false;
    this.isPending = false;
  }
  ngOnInit(): void {}
  get isExternalAccount(): Observable<boolean> | undefined {
    return this.account?.pipe(map((value) => value?.financialInstitutionId !== undefined));
  }
  openEditNotes(): void {
    this.isEditingNotes = true;
    this.transactionsInquireAndDispute.showReportForm(false);
  }
  localizeTransactionType(type: string): string {
    return type ? this.config?.transactionTypesLocales[type] || type : '';
  }
}
