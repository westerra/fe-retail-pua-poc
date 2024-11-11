import { NgModule } from '@angular/core';
import {
  newLoansOptions,
  InitiateLoansPaymentDefaultRoute,
  InitiateLoansPaymentJourneyModule,
  PayordOmniLoansPaymentConfigProvider,
  INITIATE_LOANS_PAYMENT_CONFIG,
  destroyHook,
} from '@backbase/initiate-loans-payment-journey';
import { ReviewScreens } from '@backbase/initiate-payment-journey-ang';
import { RETAIL_LOANS_ADVANCE } from '@backbase/retail-loans-journey-ang';
import { loanPaymentProviders } from '../loan-payment-providers.util';

@NgModule({
  imports: [InitiateLoansPaymentJourneyModule.forRoot({ route: InitiateLoansPaymentDefaultRoute })],
  providers: [
    PayordOmniLoansPaymentConfigProvider,
    ...loanPaymentProviders,
    {
      provide: INITIATE_LOANS_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [RETAIL_LOANS_ADVANCE],
        businessFunctions: [RETAIL_LOANS_ADVANCE.businessFunction],
        options: { ...newLoansOptions, reviewScreenType: ReviewScreens.ADAPTED, header: () => '' },
        hooks: {
          onDestroy: destroyHook,
        },
      },
    },
  ],
})
export class NewLoansAdvanceJourneyBundleModule {}
