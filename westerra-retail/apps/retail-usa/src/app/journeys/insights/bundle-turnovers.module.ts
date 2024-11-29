import { NgModule } from '@angular/core';
import {
  TurnoversJourneyModule,
  TURNOVERS_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  TURNOVERS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  TURNOVERS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  TURNOVERS_JOURNEY_TRANSACTIONS_BASE_PATH,
} from '@backbase/turnovers-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_ARRANGEMENT_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_TRANSACTIONS_BASE_PATH,
} from '../../service-paths.module';

@NgModule({
  imports: [TurnoversJourneyModule.forRoot()],
  providers: [
    {
      provide: TURNOVERS_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: TURNOVERS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_BASE_PATH,
    },
    {
      provide: TURNOVERS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: TURNOVERS_JOURNEY_TRANSACTIONS_BASE_PATH,
      useExisting: APP_TRANSACTIONS_BASE_PATH,
    },
  ],
})
export class TurnoversJourneyBundleModule {}
