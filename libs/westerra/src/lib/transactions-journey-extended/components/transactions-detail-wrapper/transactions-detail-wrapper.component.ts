import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AccountsTransactionsJourneyService,
  TransactionsHelperService,
} from '@backbase/accounts-transactions-journey-ang';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { AccountDetailsService } from '@backbase/internal-at-shared-data-access-ang';
import {
  InquireAndDisputeTopics,
  Transaction,
  TransactionCheckImageResponse,
  TransactionDetailsService,
  TransactionsDetailsLoading,
} from '@backbase/transactions-common-ang';

@Component({
  selector: 'bb-transactions-detail-wrapper',
  templateUrl: './transactions-detail-wrapper.component.html',
  styleUrls: ['./transactions-detail-wrapper.component.scss'],
  providers: [TransactionDetailsService],
})
export class TransactionsDetailWrapperComponent implements OnInit {
  public readonly config: AccountsTransactionsJourneyService;
  public readonly accountDetailsService: AccountDetailsService;
  public shared: TransactionsHelperService;
  public checkImagesList: TransactionCheckImageResponse | undefined;
  public transactionDetailsLoadingStatus: TransactionsDetailsLoading | undefined;
  public isDetailsOpen: boolean;
  public inquireAndDisputeTopics: InquireAndDisputeTopics;
  public currentTransaction: Observable<Transaction | undefined> | undefined;

  private readonly transactionDetailsService;
  private unsubscribeSubject;

  constructor(
    config: AccountsTransactionsJourneyService,
    accountDetailsService: AccountDetailsService,
    shared: TransactionsHelperService,
    transactionDetailsService: TransactionDetailsService,
    cd: ChangeDetectorRef,
  ) {
    this.config = config;
    this.accountDetailsService = accountDetailsService;
    this.shared = shared;
    this.transactionDetailsService = transactionDetailsService;
    this.isDetailsOpen = true;
    this.unsubscribeSubject = new Subject();
    this.transactionDetailsService
      .fromCheckImages(of(this.config.showCheckImages))
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((checkImagesList) => {
        this.checkImagesList = checkImagesList;
      });
    this.transactionDetailsService.fromInquiryAndDispute(
      of(config.enableDisputeAndInquiry),
      of(config.disputeByBillingStatus),
      of(config.disputeEligibilityDays),
      of(config.disputeTransactionTypes.split(',')),
    );
    this.transactionDetailsService.loadingState
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe((transactionDetailsLoadingStatus) => {
        this.transactionDetailsLoadingStatus = transactionDetailsLoadingStatus;
        cd.markForCheck();
      });
    this.transactionDetailsService
      .fromGeolocation(of(this.config.apiKey))
      .pipe(takeUntil(this.unsubscribeSubject))
      .subscribe();
    this.inquireAndDisputeTopics = {
      inquire: this.config.inquireTopicId,
      dispute: this.config.disputeTopicId,
    };
  }
  ngOnInit(): void {
    this.currentTransaction = this.shared.currentTransaction.pipe(
      tap((transaction) => {
        if (transaction) {
          this.transactionDetailsService.selectTransaction(transaction);
        }
      }),
    );
  }
  ngOnDestroy(): void {
    this.unsubscribeSubject.next();
    this.unsubscribeSubject.complete();
  }
  closeDialog(): void {
    this.isDetailsOpen = false;
    this.shared.setCloseDetail();
  }
}
