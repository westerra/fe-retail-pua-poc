import { NgModule } from '@angular/core';
import {
  LoansJourneyModule,
  LOAN_JOURNEY_COMMUNICATOR,
  RETAIL_LOANS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  RETAIL_LOANS_JOURNEY_LOANS_BASE_PATH,
} from '@backbase/retail-loans-journey-ang';
import { LoansCommunicationService } from '@backbase/retail/feature/communication';
import { APP_ARRANGEMENT_MANAGER_BASE_PATH, APP_LOANS_JOURNEY_BASE_PATH } from '../../../service-paths.module';

@NgModule({
  imports: [LoansJourneyModule.forRoot()],
  providers: [
    {
      provide: LOAN_JOURNEY_COMMUNICATOR,
      useExisting: LoansCommunicationService,
    },
    {
      provide: RETAIL_LOANS_JOURNEY_LOANS_BASE_PATH,
      useExisting: APP_LOANS_JOURNEY_BASE_PATH,
    },
    {
      provide: RETAIL_LOANS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
})
export class LoansJourneyBundleModule {}
