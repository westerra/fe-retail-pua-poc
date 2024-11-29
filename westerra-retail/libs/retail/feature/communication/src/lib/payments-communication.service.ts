import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectExternalAccontsCommunicationService } from '@backbase/connect-external-accounts-journey-ang';
import {
  InitiatePaymentJourneyCommunicationService,
  InitiatePaymentJourneyComponentApi,
  PaymentMode,
  TriggerInitiatePaymentPayload,
  ReviewScreens,
  IdentifiedPaymentOrder,
} from '@backbase/initiate-payment-journey-ang';
import { ManageUpcomingAndHistoricalPaymentsCommunicationService } from '@backbase/manage-upcoming-and-historical-payments-journey-ang';
import { PocketTransferCommunicationService, PocketTransferItem } from '@backbase/manage-pockets-journey-ang';

@Injectable({
  providedIn: 'root',
})
export class PaymentsCommunicationService
  implements
    ManageUpcomingAndHistoricalPaymentsCommunicationService,
    ConnectExternalAccontsCommunicationService,
    PocketTransferCommunicationService,
    InitiatePaymentJourneyCommunicationService
{
  isEditMode?: boolean;
  private paymentData?: TriggerInitiatePaymentPayload;

  constructor(private readonly router: Router) {}

  init(api: InitiatePaymentJourneyComponentApi): void {
    api.setupData(this.paymentData);
  }

  async navigateToEditPayment(payment: IdentifiedPaymentOrder) {
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

    await this.router.navigate(route);
  }

  async navigateToMakeTransfer(id: string) {
    await this.router.navigate(['transfers', 'make-a-transfer', { transferFrom: id }]);
  }

  async navigateToPocketTransfer(pocketTransferItem: PocketTransferItem) {
    this.isEditMode = false;
    this.paymentData = {
      template: {
        id: '',
        createdAt: '',
        serviceAgreementId: '',
        details: {
          instructionPriority: 'NORM',
          transferTransactionInformation: {
            counterparty: {
              name: pocketTransferItem.pocket.name,
              role: 'CREDITOR',
            },
            counterpartyAccount: {
              arrangementId: pocketTransferItem.pocket.arrangementId,
              identification: {
                identification: 'Pocket',
                schemeName: 'ID',
              },
            },
          },
        },
      },
      options: {
        skipTemplateFormValidation: true,
      },
    };
    await this.router.navigate(['pockets', 'pocket-transfer']);
  }

  reset() {
    this.isEditMode = false;
    this.paymentData = undefined;
  }

  private getPaymentRoute(paymentType) {
    const basePaymentsUrl = 'transfers';
    const basePocketsUrl = 'pockets';

    switch (paymentType) {
      case 'INTRABANK_TRANSFER':
        return [basePaymentsUrl, 'money-to-member'];
      case 'P2P_TRANSFER':
        return [basePaymentsUrl, 'money-to-someone'];
      case 'POCKET_TRANSFER':
        return [basePocketsUrl, 'edit-pocket-schedule'];
      default:
        return [basePaymentsUrl, 'make-a-transfer'];
    }
  }

  headerNavigationAction(_: any) {
    // Required by InitiatePaymentJourneyCommunicationService Api
  }

  async closeEvent() {
    if (this.activatedFromPockets()) {
      await this.navigateToPockets();
    } else {
      await this.navigateToScheduledTransfers();
    }
  }

  async afterSuccess?(): Promise<void> {
    if (this.activatedFromPockets()) {
      await this.navigateToPockets();
    }
  }

  private async navigateToScheduledTransfers(): Promise<void> {
    await this.router.navigate(['transfers', 'activity']);
  }

  private async navigateToPockets(): Promise<void> {
    await this.router.navigate(['pockets']);
  }

  private activatedFromPockets(): boolean {
    const url = this.router.url;

    return url.includes('pocket-transfer');
  }
}
