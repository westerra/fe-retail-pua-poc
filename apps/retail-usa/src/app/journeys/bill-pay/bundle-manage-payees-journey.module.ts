import { NgModule } from '@angular/core';
import {
  ManagePayeesCommunicationService,
  ManagePayeesJourneyConfiguration,
  ManagePayeesJourneyConfigurationToken,
  ManagePayeesJourneyModule,
  MANAGE_PAYEES_JOURNEY_BILLPAY_BASE_PATH,
} from '@backbase/manage-payees-journey-ang';
import { BillpayCommunication } from '@backbase/retail/feature/communication';
import { APP_BILLPAY_INTEGRATOR_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [ManagePayeesJourneyModule.forRoot()],
  providers: [
    {
      provide: ManagePayeesJourneyConfigurationToken,
      useValue: {
        notificationDismissTime: 3000,
        multipleBillsMode: true,
      } as ManagePayeesJourneyConfiguration,
    },
    {
      provide: ManagePayeesCommunicationService,
      useExisting: BillpayCommunication,
    },
    {
      provide: MANAGE_PAYEES_JOURNEY_BILLPAY_BASE_PATH,
      useExisting: APP_BILLPAY_INTEGRATOR_BASE_PATH,
    },
  ],
})
export class ManagePayeesJourneyBundleModule {}
