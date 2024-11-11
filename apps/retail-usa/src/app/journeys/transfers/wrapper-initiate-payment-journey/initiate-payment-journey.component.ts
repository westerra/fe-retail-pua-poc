import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';

@Component({
  selector: 'bb-initiate-payment-journey-wrapper',
  template: `
    <div class="pb-1" [ngClass]="isEditMode ? 'pt-2' : 'pt-5'">
      <button
        data-role="back-to-payments-button"
        *ngIf="isEditMode"
        bbButton
        color="link"
        class="bb-block bb-block--md pl-0"
        (bbKeyboardClick)="navigateToScheduledTransfers()"
      >
        <i aria-hidden="true" class="bb-icon bb-icon-arrow-back"></i>
        <span i18n="button label|Back button@@retail-transfer.edit.back-button">Back to Scheduled Transfers</span>
      </button>
      <h1 data-role="headings" class="pt-3 pb-4">{{ title }}</h1>
    </div>
    <div class="card card-body">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class InitiatePaymentJourneyWrapperComponent implements OnInit {
  readonly isEditMode = this.paymentsCommunicationService.isEditMode;
  title!: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly paymentsCommunicationService: PaymentsCommunicationService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.isEditMode) {
      this.title = this.route.snapshot.data.editModeTitle;
    } else {
      this.title = this.route.snapshot.data.modalTitle;
    }
  }

  navigateToScheduledTransfers() {
    this.router.navigate(['transfers', 'activity']);
  }
}
