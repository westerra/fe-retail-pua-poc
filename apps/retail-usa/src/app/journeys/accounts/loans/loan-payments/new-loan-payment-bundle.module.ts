import { NgModule } from '@angular/core';
import { RETAIL_LOANS_PAYMENT } from '@backbase/retail-loans-journey-ang';
import { ReviewScreens } from '@backbase/initiate-payment-journey-ang';
import {
  InitiateLoansPaymentDefaultRoute,
  InitiateLoansPaymentJourneyModule,
  PayordOmniLoansPaymentConfigProvider,
  INITIATE_LOANS_PAYMENT_CONFIG,
  newLoansOptions,
  destroyHook,
} from '@backbase/initiate-loans-payment-journey';
import { loanPaymentProviders } from '../loan-payment-providers.util';
@NgModule({
  imports: [InitiateLoansPaymentJourneyModule.forRoot({ route: InitiateLoansPaymentDefaultRoute })],
  providers: [
    PayordOmniLoansPaymentConfigProvider,
    ...loanPaymentProviders,
    {
      provide: INITIATE_LOANS_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [RETAIL_LOANS_PAYMENT],
        businessFunctions: [RETAIL_LOANS_PAYMENT.businessFunction],
        options: { ...newLoansOptions, reviewScreenType: ReviewScreens.ADAPTED, header: () => '' },
        hooks: {
          onDestroy: destroyHook,
        },
      },
    },
  ],
})
export class NewLoansPaymentJourneyBundleModule {}
