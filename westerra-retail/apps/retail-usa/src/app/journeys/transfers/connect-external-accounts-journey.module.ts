import { NgModule } from '@angular/core';
import {
  ConnectExternalAccontsCommunicationService,
  ConnectExternalAccountsJourneyModule,
  CONNECT_EXTERNAL_ACCOUNTS_JOURNEY_PAYMENT_ORDER_A2A_BASE_PATH,
} from '@backbase/connect-external-accounts-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';
import { APP_PAYMENT_ORDER_A2A_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [ConnectExternalAccountsJourneyModule.forRoot()],
  providers: [
    {
      provide: ConnectExternalAccontsCommunicationService,
      useExisting: PaymentsCommunicationService,
    },
    {
      provide: CONNECT_EXTERNAL_ACCOUNTS_JOURNEY_PAYMENT_ORDER_A2A_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_A2A_BASE_PATH,
    },
  ],
})
export class ConnectExternalAccountsJourneyBundleModule {}
