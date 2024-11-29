import { NgModule } from '@angular/core';
import {
  BillpaySsoJourneyModule,
  BILLPAY_SSO_JOURNEY_BILLPAY_BASE_PATH,
  BillpaySsoJourneyConfiguration,
  BillpaySsoJourneyConfigurationToken,
  BillPaySsoCommunicationService,
} from '@backbase/billpay-sso-journey-ang';
import { BillPaySsoCommunicationService as BillPaySsoCommunicationServiceImplementation } from '@backbase/retail/feature/communication';

import { APP_BILLPAY_INTEGRATOR_BASE_PATH } from '../../service-paths.module';

const billpaySsoJourneyConfiguration: Partial<BillpaySsoJourneyConfiguration> = {
  pageTitle: $localize`:@@billpay-sso-journey.page-title:Bill Pay`,
  iFrameSandboxAttributes: ['allow-same-origin', 'allow-scripts', 'allow-forms', 'allow-downloads'],
  ssoReloadBtnText: $localize`:@@billpay-sso-journey.sso-reload-button:Try Again`,
  defaultError: {
    errorTitle: $localize`:@@billpay-sso-journey.error-state.title:Oops, Loading Failed`,
    errorSubTitle: $localize`:@@billpay-sso-journey.error-state.subtitle:Something went wrong. Please try again.`,
  },
};

@NgModule({
  imports: [BillpaySsoJourneyModule.forRoot()],
  providers: [
    {
      provide: BillpaySsoJourneyConfigurationToken,
      useValue: billpaySsoJourneyConfiguration,
    },
    {
      provide: BILLPAY_SSO_JOURNEY_BILLPAY_BASE_PATH,
      useExisting: APP_BILLPAY_INTEGRATOR_BASE_PATH,
    },
    {
      provide: BillPaySsoCommunicationService,
      useExisting: BillPaySsoCommunicationServiceImplementation,
    },
  ],
})
export class BillpaySsoJourneyBundleModule {}
