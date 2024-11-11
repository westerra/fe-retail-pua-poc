import { NgModule } from '@angular/core';
import {
  ManagePocketsJourneyConfigurationToken,
  ManagePocketsJourneyModule,
  MANAGE_POCKETS_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  MANAGE_POCKETS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  MANAGE_POCKETS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  MANAGE_POCKETS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
  MANAGE_POCKETS_JOURNEY_POCKET_TAILOR_BASE_PATH,
} from '@backbase/manage-pockets-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_PAYMENT_BATCH_BASE_PATH,
  APP_POCKET_TAILOR_BASE_PATH,
} from '../../service-paths.module';

@NgModule({
  imports: [ManagePocketsJourneyModule.forRoot()],
  providers: [
    {
      provide: ManagePocketsJourneyConfigurationToken,
      useValue: {
        journeyCurrency: 'USD',
      },
    },
    {
      provide: MANAGE_POCKETS_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: MANAGE_POCKETS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: MANAGE_POCKETS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: MANAGE_POCKETS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_BATCH_BASE_PATH,
    },
    {
      provide: MANAGE_POCKETS_JOURNEY_POCKET_TAILOR_BASE_PATH,
      useExisting: APP_POCKET_TAILOR_BASE_PATH,
    },
  ],
})
export class ManagePocketsJourneyBundleModule {}
