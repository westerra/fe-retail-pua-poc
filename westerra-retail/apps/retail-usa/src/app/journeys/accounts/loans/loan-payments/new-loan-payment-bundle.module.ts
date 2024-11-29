import { NgModule } from '@angular/core';
import { destroyHook, newLoansOptions, RETAIL_LOANS_PAYMENT } from '@backbase/loans-retail-journey';
import {
  InitiatePaymentDefaultRoute,
  InitiatePaymentJourneyModule,
  INITIATE_PAYMENT_CONFIG,
  PayordOmniPaymentConfigProvider,
  ReviewScreens,
  InitiatePaymentConfig,
} from '@backbase/initiate-payment-journey-ang';

import { loanPaymentProviders } from '../loan-payment-providers.util';
@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot({ route: InitiatePaymentDefaultRoute })],
  providers: [
    PayordOmniPaymentConfigProvider,
    ...loanPaymentProviders,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [RETAIL_LOANS_PAYMENT],
        businessFunctions: [RETAIL_LOANS_PAYMENT.businessFunction],
        options: {
          ...newLoansOptions,
          reviewScreenType: ReviewScreens.ADAPTED,
          header: () => '',
          enableCalendarService: true,
        },
        hooks: {
          onDestroy: destroyHook,
        },
      } as InitiatePaymentConfig,
    },
  ],
})
export class NewLoansPaymentJourneyBundleModule {}
