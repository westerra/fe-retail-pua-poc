import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsCommunicationService,
  ManageBillPaymentsJourneyConfiguration,
  ManageBillPaymentsJourneyConfigurationToken,
  ManageBillPaymentsJourneyModule,
  MANAGE_BILL_PAYMENTS_JOURNEY_BILLPAY_BASE_PATH,
} from '@backbase/manage-bill-payments-journey-ang';
import { BillpayCommunication } from '@backbase/retail/feature/communication';
import { APP_BILLPAY_INTEGRATOR_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsJourneyConfigurationToken,
      useValue: {
        pageTitle: 'Pending Payments',
      } as ManageBillPaymentsJourneyConfiguration,
    },
    {
      provide: ManageBillPaymentsCommunicationService,
      useExisting: BillpayCommunication,
    },
    {
      provide: MANAGE_BILL_PAYMENTS_JOURNEY_BILLPAY_BASE_PATH,
      useExisting: APP_BILLPAY_INTEGRATOR_BASE_PATH,
    },
  ],
})
export class ManageBillPaymentsJourneyBundleModule {}
