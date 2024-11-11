import { NgModule } from '@angular/core';
import { OrderChecksModule, ProductSummaryService } from '@backbase/westerra';
import {
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_CATEGORIES_MANAGEMENT_BASE_PATH,
  APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
  APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  APP_MESSAGES_BASE_PATH,
  APP_PAYMENT_BATCH_BASE_PATH,
  APP_TRANSACTIONS_BASE_PATH,
} from '../../service-paths.module';
import {
  ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
  ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
} from '@backbase/accounts-transactions-journey-ang';
import { initiatePaymentProviders } from '../transfers/initiate-payment-providers.util';
import { IdentityManagementServiceMocksProvider } from '@backbase/data-ang/user';
import {
  INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
  PayordOmniPaymentConfigProvider,
} from '@backbase/initiate-payment-journey-ang';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';

@NgModule({
  imports: [OrderChecksModule.forRoot()],
  providers: [
    ...initiatePaymentProviders,
    PayordOmniPaymentConfigProvider,
    IdentityManagementServiceMocksProvider,
    {
      provide: INITIATE_PAYMENT_JOURNEY_COMMUNICATOR,
      useExisting: PaymentsCommunicationService,
    },

    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_CATEGORIES_MANAGEMENT_BASE_PATH,
      useExisting: APP_CATEGORIES_MANAGEMENT_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
      useExisting: APP_FINANCIAL_INSTITUTION_MANAGER_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_MESSAGES_BASE_PATH,
      useExisting: APP_MESSAGES_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
      useExisting: APP_TRANSACTIONS_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_PAYMENT_BATCH_BASE_PATH,
      useExisting: APP_PAYMENT_BATCH_BASE_PATH,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
      useExisting: APP_EXTERNAL_ACCOUNT_AGGREGATOR_BASE_PATH,
    },
    ProductSummaryService,
  ],
})
export class OrderChecksBundleModule {}
