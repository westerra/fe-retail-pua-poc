/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import {
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNT_STATEMENT_RETAIL_JOURNEY_CONFIGURATION_TOKEN,
  AccountStatementRetailJourneyConfiguration,
} from '@backbase/account-statement-retail-journey-ang';
import { APP_ACCOUNT_STATEMENT_BASE_PATH, APP_ARRANGEMENT_MANAGER_BASE_PATH } from '../../service-paths.module';
import { AccountStatementJourneyModule } from '@backbase/westerra';



@NgModule({
  imports: [AccountStatementJourneyModule.forRoot()],
  providers: [
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_CONFIGURATION_TOKEN,
      useValue: {
        productSummaryBusinessFunction: 'Manage Statements',
        productSummaryResourceName: 'Account Statements',
        showCategory: true,
        showDescription: true,
        showManageStatementsNavigation: true,
        manageStatementsNavigationUrl: '/self-service/manage-statements',
        hideManageStatementsNavigationWhenMissingPermissions: true,
      } as Partial<AccountStatementRetailJourneyConfiguration>,
    },
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_ACCOUNT_STATEMENT_BASE_PATH,
      useExisting: APP_ACCOUNT_STATEMENT_BASE_PATH,
    },
    {
      provide: ACCOUNT_STATEMENT_RETAIL_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
})
export class AccountStatementRetailJourneyBundleModule { }
