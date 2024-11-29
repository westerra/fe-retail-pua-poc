/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import {
  CreatePaymentFormComponent,
  INITIATE_PAYMENT_CONFIG,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentConfig,
  InitiatePaymentJourneyComponent,
  InitiatePaymentJourneyModule,
  // INTERNAL_TRANSFER,
  PayordOmniPaymentConfigProvider,
  ReviewPaymentContainerComponent,
  Routes,
} from '@backbase/initiate-payment-journey-ang';
import { ReviewScreens } from '@backbase/initiate-payment-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';
import { initiatePaymentProviders } from './initiate-payment-providers.util';
import { InitiatePaymentJourneyExtendedComponent } from '@backbase/westerra';
import { INTERNAL_TRANSFER } from './internal-transafer-payment-type-configuration';

const InitiatePaymentCustomRoute = {
  path: '',
  // component: InitiatePaymentJourneyComponent,
  component: InitiatePaymentJourneyExtendedComponent,
  children: [
    { path: '', redirectTo: Routes.FORM, pathMatch: 'full' },
    { path: Routes.FORM, component: CreatePaymentFormComponent },
    { path: Routes.REVIEW, component: ReviewPaymentContainerComponent },
  ],
};

@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot({ routes: InitiatePaymentCustomRoute })],
  providers: [
    PayordOmniPaymentConfigProvider,
    ...initiatePaymentProviders,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [INTERNAL_TRANSFER],
        businessFunctions: [INTERNAL_TRANSFER.businessFunction],
        options: {
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          reviewScreenType: ReviewScreens.ADAPTED,
          isModalView: false,
          header: () => '',
          paymentExecutionInBankTimeZoneMessage: '',
        },
      } as Partial<InitiatePaymentConfig>,
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class InternalTransferJourneyBundleModule { }
