import { NgModule } from '@angular/core';
import {
  ManageBillPaymentsJourneyConfiguration,
  ManageBillPaymentsJourneyConfigurationToken,
  ManageBillPaymentsJourneyModule,
  MANAGE_BILL_PAYMENTS_JOURNEY_BILLPAY_BASE_PATH,
  PaymentsFilterStatus,
} from '@backbase/manage-bill-payments-journey-ang';
import { APP_BILLPAY_INTEGRATOR_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [ManageBillPaymentsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManageBillPaymentsJourneyConfigurationToken,
      useValue: {
        pageFilter: PaymentsFilterStatus.HISTORICAL,
        pageTitle: 'History Payments',
      } as ManageBillPaymentsJourneyConfiguration,
    },
    {
      provide: MANAGE_BILL_PAYMENTS_JOURNEY_BILLPAY_BASE_PATH,
      useExisting: APP_BILLPAY_INTEGRATOR_BASE_PATH,
    },
  ],
})
export class ManageBillPaymentsHistoryJourneyBundleModule {}
