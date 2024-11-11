import { Injectable } from '@angular/core';
import { IdentifiedPaymentOrder } from '@backbase/data-ang/payment-order';
import { ActivatedRoute, Router } from '@angular/router';
import { LoanCommunicationService, loanIdParamKey } from '@backbase/retail-loans-journey-ang';
import {
  InitiatePaymentJourneyCommunicationService,
  InitiatePaymentJourneyComponentApi,
  TriggerInitiatePaymentPayload,
} from '@backbase/initiate-payment-journey-ang';

@Injectable({ providedIn: 'root' })
export class LoansCommunicationService implements LoanCommunicationService, InitiatePaymentJourneyCommunicationService {
  private paymentData?: TriggerInitiatePaymentPayload;

  constructor(private readonly router: Router, private activatedRoute: ActivatedRoute) {}

  init(api: InitiatePaymentJourneyComponentApi): void {
    api.setupData(this.paymentData);
  }

  navigateToLoanAdvance(): void {
    this.router.navigate(['loans-advance'], {
      relativeTo: this.getActivatedRouteByParam(this.activatedRoute, loanIdParamKey),
    });
  }

  navigateToLoanPayment(): void {
    this.router.navigate(['loans-payment'], {
      relativeTo: this.getActivatedRouteByParam(this.activatedRoute, loanIdParamKey),
    });
  }

  navigateToAccounts(): void {
    this.router.navigate(['my-accounts/list']);
  }

  reset(): void {
    this.paymentData = undefined;
  }

  editLoanPayment(_payment: IdentifiedPaymentOrder): void {
    // Required method by LoanCommunicationService
  }

  editLoanAdvance(_payment: IdentifiedPaymentOrder): void {
    // Required method by LoanCommunicationService
  }

  closeEvent(): void {
    this.navigateToAccounts();
  }
  headerNavigationAction(): void {
    // Required method by InitiatePaymentService
  }

  private getActivatedRouteByParam(activatedRoute: ActivatedRoute, paramName: string): ActivatedRoute {
    if (paramName in activatedRoute.snapshot.params || !activatedRoute.firstChild) {
      return activatedRoute;
    } else {
      return this.getActivatedRouteByParam(activatedRoute.firstChild, paramName);
    }
  }
}
