import { NgModule } from '@angular/core';
import {
  PayBillsCommunicationService,
  PayBillsJourneyConfigurationToken,
  PayBillsJourneyModule,
  PAY_BILLS_JOURNEY_BILLPAY_BASE_PATH,
} from '@backbase/pay-bills-journey-ang';
import { BillpayCommunication } from '@backbase/retail/feature/communication';
import { APP_BILLPAY_INTEGRATOR_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [PayBillsJourneyModule.forRoot()],
  providers: [
    {
      provide: PayBillsJourneyConfigurationToken,
      useValue: {
        notificationDismissTime: 5000,
        paymentDetailsTitle: 'Payment Details',
        paymentDefaultCurrency: 'USD',
        multipleBillsMode: true,
        deliveryDateMessage: 'Delivered in 5 working days',
      },
    },
    {
      provide: PayBillsCommunicationService,
      useExisting: BillpayCommunication,
    },
    {
      provide: PAY_BILLS_JOURNEY_BILLPAY_BASE_PATH,
      useExisting: APP_BILLPAY_INTEGRATOR_BASE_PATH,
    },
  ],
})
export class PayBillsJourneyBundleModule {}
