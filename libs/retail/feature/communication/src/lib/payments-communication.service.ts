import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectExternalAccontsCommunicationService } from '@backbase/connect-external-accounts-journey-ang';
import {
  InitiatePaymentJourneyCommunicationService,
  InitiatePaymentJourneyComponentApi,
  PaymentMode,
  TriggerInitiatePaymentPayload,
  ReviewScreens,
} from '@backbase/initiate-payment-journey-ang';
import { ManageUpcomingAndHistoricalPaymentsCommunicationService } from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { IdentifiedPaymentOrder } from '@backbase/data-ang/payment-order';

@Injectable({
  providedIn: 'root',
})
export class PaymentsCommunicationService
  implements
    ManageUpcomingAndHistoricalPaymentsCommunicationService,
    ConnectExternalAccontsCommunicationService,
    InitiatePaymentJourneyCommunicationService
{
  isEditMode?: boolean;
  private paymentData?: TriggerInitiatePaymentPayload;

  constructor(private readonly router: Router) {}

  init(api: InitiatePaymentJourneyComponentApi): void {
    api.setupData(this.paymentData);
  }

  navigateToEditPayment(payment: IdentifiedPaymentOrder) {
    if (!payment) {
      return;
    }
    const route = this.getPaymentRoute(payment.paymentType);
    this.paymentData = {
      payment: {
        ...payment,
        paymentType: payment.paymentType === 'EXTERNAL_A2A' ? 'INTERNAL_TRANSFER' : payment.paymentType,
      },
      options: {
        paymentMode: PaymentMode.EDIT_PAYMENT,
        enablePaymentTemplateSelector: false,
        enableSavePaymentAsTemplate: false,
        reviewScreenType: ReviewScreens.ADAPTED,
        isModalView: false,
        isOneOffToRecurrentAllowed: true,
        isRecurrentToOneOffAllowed: true,
      },
    };
    this.isEditMode = true;

    this.router.navigate(['transfers', route]);
  }

  navigateToMakeTransfer(id: string) {
    this.router.navigate(['transfers', 'make-a-transfer', { transferFrom: id }]);
  }

  reset() {
    this.isEditMode = false;
    this.paymentData = undefined;
  }

  private getPaymentRoute(paymentType) {
    switch (paymentType) {
      case 'INTRABANK_TRANSFER':
        return 'money-to-member';
      case 'P2P_TRANSFER':
        return 'money-to-someone';
      default:
        return 'make-a-transfer';
    }
  }

  headerNavigationAction(_: any) {
    // Required by InitiatePaymentJourneyCommunicationService Api
  }

  closeEvent(): void {
    this.navigateToScheduledTransfers();
  }

  private navigateToScheduledTransfers(): void {
    this.router.navigate(['transfers', 'activity']);
  }
}
