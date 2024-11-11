import { NgModule, Provider } from '@angular/core';
import {
  AnalysisType,
  IncomeSpendingAnalysisJourneyConfiguration,
  IncomeSpendingAnalysisJourneyConfigurationToken,
  IncomeSpendingAnalysisJourneyModule,
  INCOME_SPENDING_ANALYSIS_JOURNEY_ACCESS_CONTROL_BASE_PATH,
  INCOME_SPENDING_ANALYSIS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  INCOME_SPENDING_ANALYSIS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  INCOME_SPENDING_ANALYSIS_JOURNEY_TRANSACTIONS_BASE_PATH,
} from '@backbase/income-spending-analysis-journey-ang';
import {
  APP_ACCESS_CONTROL_BASE_PATH,
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_TRANSACTIONS_BASE_PATH,
} from '../../service-paths.module';

const IncomeAnalysisConfigProvider: Provider = {
  provide: IncomeSpendingAnalysisJourneyConfigurationToken,
  useValue: {
    analysisType: AnalysisType.INCOME,
  } as IncomeSpendingAnalysisJourneyConfiguration,
};

@NgModule({
  imports: [IncomeSpendingAnalysisJourneyModule.forRoot()],
  providers: [
    IncomeAnalysisConfigProvider,
    {
      provide: INCOME_SPENDING_ANALYSIS_JOURNEY_ACCESS_CONTROL_BASE_PATH,
      useExisting: APP_ACCESS_CONTROL_BASE_PATH,
    },
    {
      provide: INCOME_SPENDING_ANALYSIS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: INCOME_SPENDING_ANALYSIS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: INCOME_SPENDING_ANALYSIS_JOURNEY_TRANSACTIONS_BASE_PATH,
      useExisting: APP_TRANSACTIONS_BASE_PATH,
    },
  ],
})
export class IncomeAnalysisBundleModule {}
