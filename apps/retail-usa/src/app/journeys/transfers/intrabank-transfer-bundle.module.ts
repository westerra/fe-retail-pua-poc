import { NgModule } from '@angular/core';
import { IdentityManagementServiceMocksProvider } from '@backbase/data-ang/user';
import {
  INITIATE_PAYMENT_CONFIG,
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  InitiatePaymentConfig,
  InitiatePaymentJourneyModule,
  // INTRABANK_TRANSFER,
  PayordOmniPaymentConfigProvider,
  ReviewPaymentContainerComponent,
  Routes,
} from '@backbase/initiate-payment-journey-ang';
import { ReviewScreens } from '@backbase/initiate-payment-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';
import { initiatePaymentProviders } from './initiate-payment-providers.util';
import { CreatePaymentFormExtendedComponent, InitiatePaymentJourneyExtendedComponent } from '@backbase/westerra';
import { INTRABANK_TRANSFER } from './intrabank-transfer-payment-type-configuration';

const InitiatePaymentCustomRoute = {
  path: '',
  // component: InitiatePaymentJourneyComponent,
  component: InitiatePaymentJourneyExtendedComponent,
  children: [
    { path: '', redirectTo: Routes.FORM, pathMatch: 'full' },
    { path: Routes.FORM, component: CreatePaymentFormExtendedComponent },
    { path: Routes.REVIEW, component: ReviewPaymentContainerComponent },
  ],
};
@NgModule({
  imports: [InitiatePaymentJourneyModule.forRoot({ route: InitiatePaymentCustomRoute })],
  providers: [
    PayordOmniPaymentConfigProvider,
    IdentityManagementServiceMocksProvider,
    ...initiatePaymentProviders,
    {
      provide: INITIATE_PAYMENT_CONFIG,
      useValue: {
        paymentTypes: [INTRABANK_TRANSFER],
        businessFunctions: [INTRABANK_TRANSFER.businessFunction],
        options: {
          enablePaymentTemplateSelector: false,
          enableSavePaymentAsTemplate: false,
          reviewScreenType: ReviewScreens.ADAPTED,
          isModalView: false,
          header: () => '',
        },
      } as Partial<InitiatePaymentConfig>,
    },
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: PaymentsCommunicationService,
    },
  ],
})
export class IntrabankTransferJourneyBundleModule {}
