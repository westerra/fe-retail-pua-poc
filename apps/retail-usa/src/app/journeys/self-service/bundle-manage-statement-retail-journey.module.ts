import { NgModule } from '@angular/core';
import {
  MANAGE_STATEMENTS_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
  MANAGE_STATEMENTS_JOURNEY_CONFIG_TOKEN,
  ManageStatementsJourneyConfiguration,
  ManageStatementsJourneyModule,
} from '@backbase/manage-statements-journey-ang';
import { APP_ACCOUNT_STATEMENT_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [ManageStatementsJourneyModule.forRoot()],
  providers: [
    {
      provide: MANAGE_STATEMENTS_JOURNEY_CONFIG_TOKEN,
      useFactory: function () {
        return {
          accountStatementsNavigationUrl: '/self-service/download-statements',
        } as Partial<ManageStatementsJourneyConfiguration>;
      },
    },
    {
      provide: MANAGE_STATEMENTS_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
      useExisting: APP_ACCOUNT_STATEMENT_BASE_PATH,
    },
  ],
})
export class ManageStatementsJourneyBundleModule {}
