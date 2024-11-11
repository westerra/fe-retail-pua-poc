import { NgModule } from '@angular/core';
import {
  ManageUpcomingAndHistoricalPaymentsCommunicationService,
  ManageUpcomingAndHistoricalPaymentsJourneyModule,
  MANAGE_UPCOMING_AND_HISTORICAL_PAYMENTS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
  ManageUpcomingAndHistoricalPaymentsJourneyConfiguration,
  ManageUpcomingAndHistoricalPaymentsJourneyConfigurationToken,
} from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';
import { APP_PAYMENT_ORDER_BASE_PATH } from '../../service-paths.module';
import { customMapStatusText } from '@backbase/westerra';

@NgModule({
  imports: [ManageUpcomingAndHistoricalPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageUpcomingAndHistoricalPaymentsCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
    {
      provide: MANAGE_UPCOMING_AND_HISTORICAL_PAYMENTS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_BASE_PATH,
    },
    {
      provide: ManageUpcomingAndHistoricalPaymentsJourneyConfigurationToken,
      useValue: {
        // notificationDismissTime: 3000,
        // maskAccounts: false,
        upcomingPaymentParams: {
          // orderBy: 'expectedExecutionDate',
          // direction: 'ASC',
          orderBy: 'requestedExecutionDate',
          direction: 'DESC',
          status: ['ACCEPTED'],
          expectedExecutionDateFrom: undefined,
          from: 0,
          size: 50,
        },
        historyPaymentParams: {
          orderBy: 'requestedExecutionDate',
          direction: 'DESC',
          status: ['CANCELLED', 'REJECTED', 'PROCESSED', 'CANCELLATION_PENDING'],
          paymentTypes: 'INTRABANK_TRANSFER,INTERNAL_TRANSFER,EXTERNAL_A2A,P2P_TRANSFER',
          from: 0,
          size: 50,
        },
        // paymentTypeInfoTexts: {
        //   INTERNAL_TRANSFER: $localize`:@@upcoming-and-history-payments.payment-type-info.internal:Internal account transfer`,
        //   EXTERNAL_A2A: $localize`:@@upcoming-and-history-payments.payment-type-info.external:Connected account transfer`,
        //   INTRABANK_TRANSFER: $localize`:@@upcoming-and-history-payments.payment-type-info.intrabank:Pay someone using account number`,
        //   P2P_TRANSFER: $localize`:@@upcoming-and-history-payments.payment-type-info.p2p:Pay someone using mobile number or email address`,
        //   LOAN_PAYMENT: $localize`:@@upcoming-and-history-payments.payment-type-info.loan-pay:Loan Payment`,
        //   LOAN_ADVANCE: $localize`:@@upcoming-and-history-payments.payment-type-info.loan-adv:Loan Advance`,
        // },
        journeyTitle: 'Activity',
        // uiComponentProps: {
        //     mapCurrency: true,
        // },
        paymentStatusTextMapping: customMapStatusText,
        // amountOptionTextMapping: mapAmountOptionDescription,
      } as Partial<ManageUpcomingAndHistoricalPaymentsJourneyConfiguration>,
    },
  ],
})
export class ManageUpcomingAndHistoricalPaymentsJourneyBundleModule {}
