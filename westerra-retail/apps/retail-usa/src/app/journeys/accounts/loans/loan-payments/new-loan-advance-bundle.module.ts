import { NgModule } from '@angular/core';
import {
  InitiatePaymentDefaultRoute,
  InitiatePaymentJourneyModule,
  INITIATE_PAYMENT_CONFIG,
  PayordOmniPaymentConfigProvider,
  ReviewScreens,
  InitiatePaymentConfig,
} from '@backbase/initiate-payment-journey-ang';
import { destroyHook, newLoansOptions, RETAIL_LOANS_ADVANCE } from '@backbase/loans-retail-journey';
import { loanPaymentProviders } from '../loan-payment-providers.util';

@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot({ route: InitiatePaymentDefaultRoute })],
  providers: [
    PayordOmniPaymentConfigProvider,
    ...loanPaymentProviders,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [RETAIL_LOANS_ADVANCE],
        businessFunctions: [RETAIL_LOANS_ADVANCE.businessFunction],
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
export class NewLoansAdvanceJourneyBundleModule {}
