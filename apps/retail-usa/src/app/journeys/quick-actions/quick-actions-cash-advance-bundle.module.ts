import { NgModule } from '@angular/core';
import {
  INITIATE_PAYMENT_CONFIG,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentJourneyModule,
  PayordOmniPaymentConfigProvider,
} from '@backbase/initiate-payment-journey-ang';
import { AccountsInitiatePaymentCommunication } from '@backbase/retail/feature/communication';
import { cashAdvancePaymentTypeConfig } from './initiate-payment-cash-advance-type';
import { initiatePaymentProviders } from '../transfers/initiate-payment-providers.util';

@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot()],
  providers: [
    PayordOmniPaymentConfigProvider,
    ...initiatePaymentProviders,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [cashAdvancePaymentTypeConfig],
        businessFunctions: [cashAdvancePaymentTypeConfig.businessFunction],
        options: {
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          pageSize: 100,

          isModalView: true,
          isEditPaymentModal: false,
          enableApprovals: true,
          enableNewPaymentButton: false,
          isOneOffToRecurrentAllowed: false,
          isRecurrentToOneOffAllowed: false,
          isErrorTitleDisplayed: true,
          checkClosedPaymentsAccess: false,
          defaultScheme: 'BBAN',
          defaultCountry: 'US',
          successEventName: 'bb.refresh.payments.list',
        },
      },
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: AccountsInitiatePaymentCommunication,
    },
  ],
})
export class QuickActionsCashAdvanceBundleModule {}