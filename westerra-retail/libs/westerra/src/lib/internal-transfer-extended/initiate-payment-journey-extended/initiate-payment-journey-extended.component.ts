import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentConfigService,
  InitiatePaymentJourneyCommunicationService,
  InitiatePaymentJourneyComponent,
  InitiatePaymentNavigationService,
  ӨCreatePaymentConfigSetupService,
  ӨStateService,
} from '@backbase/initiate-payment-journey-ang';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { ErrorState } from '../../services/api/sso/sso.interface';
import {
  creditCardAccountsRecurringScheduledTransferErrorMessage,
  loanAccountsRecurringScheduledTransferErrorMessage,
  mortgageAccountProductExternalTypeIds,
  mulesoftErrorStatement,
} from '../../services/constants';

@Component({
  selector: 'bb-initiate-payment-journey-extended',
  templateUrl: './initiate-payment-journey-extended.component.html',
  styleUrls: ['./initiate-payment-journey-extended.component.scss'],
  providers: [
    ӨStateService,
    InitiatePaymentConfigService,
    ӨCreatePaymentConfigSetupService,
    InitiatePaymentNavigationService,
  ],
})
// extends InitiatePaymentJourneyComponent
export class InitiatePaymentJourneyExtendedComponent implements  OnDestroy, AfterContentChecked {
  public timeoutInterval1: any = null;
  public mortgageAccountExternalTypeIds = mortgageAccountProductExternalTypeIds;
  errorMessage = '';
  customErrorContainer: BehaviorSubject<any> = new BehaviorSubject(null);

  private readonly configService;
  private readonly communicator;

  constructor(
    configService: InitiatePaymentConfigService,
    @Optional()
    @Inject(INITIATE_PAYMENT_JOURNEY_COMMUNICATOR)
    communicator: InitiatePaymentJourneyCommunicationService,
    private _stateService: ӨStateService,
    private route: ActivatedRoute,
    private _router: Router,
    public api: ApiService,
    private cdf: ChangeDetectorRef,
  ) {
    // super(configService, communicator);
    this.configService = configService;
    this.communicator = communicator;
    if (communicator) {
      communicator.init({
        setupData(data) {
          configService.setup(data);
        },
      });
    } else {
      configService.setup();
    }
  }


  ngAfterContentChecked() {
    const alertContainer: any = document.querySelectorAll(
      'bb-adapted-review-container > fieldset > bb-alert-ui > ngb-alert > div.alert-body > div.alert-content > div',
    )?.[0];

    const amountContainer = document.querySelectorAll('bb-adapted-review-container > fieldset > div:nth-of-type(2)')?.[0];
    if (amountContainer) {
      this.setupCustomAlerts(amountContainer);
    }

    const successTextContainer: any = document.querySelectorAll(
      "bb-adapted-review-container > div.bb-text-align-center > div[data-role='adapted-success-message'] > div.bb-text-support > span:nth-of-type(2)",
    );
    successTextContainer?.[0]?.innerHTML ? (successTextContainer[0].innerHTML = ' to ') : '';

    const scheduleSuccessTextContainer: any = document.querySelectorAll(
      "bb-adapted-review-container > div.bb-text-align-center > div[data-role='adapted-success-message'] > span.bb-text-support",
    );
    scheduleSuccessTextContainer?.[0]?.innerHTML
      ? (scheduleSuccessTextContainer[0].innerHTML = this.updateScheduleSuccessMessage(
          scheduleSuccessTextContainer[0].innerHTML,
        ))
      : '';

    if (this.customErrorContainer.getValue() !== alertContainer) {
      this.customErrorContainer.next(alertContainer);
      this.updateErrorAlert();
    }
  }

  checkForMulesoftRelatedErrors(errorData: ErrorState | any) {
    return errorData?.error?.description?.includes(mulesoftErrorStatement) ||
      errorData?.error?.message?.includes('400 : ')
      ? true
      : false;
  }

  updateErrorAlert() {
    const errorAlertContainer: any = this.customErrorContainer.getValue();
    const data = this.api.sso.errorStatePaymentOrder.getValue();
    if (data.error && errorAlertContainer !== null && errorAlertContainer !== undefined) {
      const paymentScheduleContainer: any = document.getElementsByTagName('bb-payment-schedule-details')[0];
      const paymentReviewData = paymentScheduleContainer?.['__ngContext__']?.[8]?.['$implicit'];
      const initiatorData = paymentReviewData?.initiator;
      const scheduleData = paymentReviewData?.schedule;

      if (
        scheduleData?.frequency?.toLowerCase() !== 'once' &&
        initiatorData?.productKindName?.toLowerCase() === 'loan' &&
        this.checkForMulesoftRelatedErrors(data)
      ) {
        this.errorMessage = loanAccountsRecurringScheduledTransferErrorMessage;
      } else if (
        scheduleData?.frequency?.toLowerCase() !== 'once' &&
        initiatorData?.productKindName?.toLowerCase() === 'credit card' &&
        this.checkForMulesoftRelatedErrors(data)
      ) {
        this.errorMessage = creditCardAccountsRecurringScheduledTransferErrorMessage;
      } else {
        this.errorMessage = data?.error?.message;
      }

      errorAlertContainer.innerHTML = `<span data-role="failure-message">${
        this.errorMessage ? this.errorMessage : errorAlertContainer.innerText
      }</span>`;

      this.timeoutInterval1 = setTimeout(() => {
        this.errorMessage = '';
        this.api.sso.clearState();
      }, 10000);
    }
  }

  updateScheduleSuccessMessage(innerHTML: any): string {
    if (innerHTML.includes('You’ve just scheduled transfer')) {
      innerHTML = innerHTML.replace('scheduled', 'scheduled a');
    }
    return innerHTML;
  }

  setCustomAlertDiv(type: 'info' | 'warning' | 'danger', message: string): any {
    const iconTypeToBeUsed = type;

    const customAlertDiv = document.createElement('div');
    customAlertDiv.className = `bb-block bb-block--lg ng-star-inserted custom-special-alerts badge-${iconTypeToBeUsed}`;
    customAlertDiv.innerHTML = `<bb-alert-ui modifier="${iconTypeToBeUsed}"
        ><ngb-alert
          role="alert"
          class="alert show fade"
          aria-live="assertive"
          ><div class="alert-body" style="padding-left: 10px;padding-right: 10px">
            <bb-icon-ui class="alert-icon" data-role="alert-icon"
              ><em
                role="img"
                class="bb-icon bb-icon-${iconTypeToBeUsed} bb-icon--md bb-icon--${iconTypeToBeUsed}"
                aria-hidden="true"></em
            ></bb-icon-ui>
            <div class="alert-content">
              <strong
                role="heading"
                aria-level="2"
                data-role="alert-title"></strong>
              <div  data-role="alert-content">
                <span data-role="custom-alert-message" style="display: flex;
                text-align: justify;"> ${message} </span>
              </div>
            </div>
          </div>
        </ngb-alert></bb-alert-ui
      >`;

    return customAlertDiv;
  }

  setupCustomAlerts(previousContainer: any) {
    const customAlertsContainer = document.querySelectorAll(
      'bb-adapted-review-container > fieldset > div.custom-special-alerts',
    )?.[0];

    if (!customAlertsContainer) {
      let customAlertMessage = '';
      const paymentScheduleContainer: any = document.getElementsByTagName('bb-payment-schedule-details')[0];
      const paymentReviewData = paymentScheduleContainer?.['__ngContext__']?.[8]?.['$implicit'];
      const initiatorData =
        paymentReviewData.initiator.accountData.defaultRecord ?? paymentReviewData.initiator.accountData;
      const counterPartyData =
        paymentReviewData.counterparty?.accountData?.defaultRecord ?? paymentReviewData.counterparty.accountData;

      // Setup custom alert for transfers from Credit card
      const initiatorPartyProductKindName = initiatorData.productKindName;
      if (initiatorPartyProductKindName.includes('Credit Card')) {
        customAlertMessage = 'Standard cash advance rates and fees apply';
        previousContainer.after(this.setCustomAlertDiv('info', customAlertMessage));
      }

      // Setup custom alert for transfer to Mortgage accounts
      const isCounterPartyMortgage = this.mortgageAccountExternalTypeIds.includes(
        counterPartyData?.product?.externalTypeId,
      );
      if (isCounterPartyMortgage) {
        customAlertMessage =
          'Transfer payment will show in the mortgage transaction history once it’s processed on the following business day.';
        previousContainer.before(this.setCustomAlertDiv('info', customAlertMessage));
      }
    }
  }

  ngOnDestroy(): void {
    // super.ngOnDestroy();

    this.communicator?.reset();
    if (this.timeoutInterval1) {
      clearTimeout(this.timeoutInterval1);
    }
  }
}
