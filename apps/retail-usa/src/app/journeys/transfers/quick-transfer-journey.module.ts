import { NgModule } from '@angular/core';
import '@angular/localize/init';
import {
  QuickTransferJourneyModule,
  QUICK_TRANSFER_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  QUICK_TRANSFER_JOURNEY_CONTACT_MANAGER_BASE_PATH,
  QUICK_TRANSFER_JOURNEY_PAYMENT_ORDER_A2A_BASE_PATH,
  QUICK_TRANSFER_JOURNEY_PAYMENT_ORDER_BASE_PATH,
} from '@backbase/quick-transfer-journey-ang';
import {
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_CONTACT_MANAGER_BASE_PATH,
  APP_PAYMENT_ORDER_A2A_BASE_PATH,
  APP_PAYMENT_ORDER_BASE_PATH,
} from '../../service-paths.module';

@NgModule({
  imports: [QuickTransferJourneyModule],
  providers: [
    {
      provide: QUICK_TRANSFER_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
    {
      provide: QUICK_TRANSFER_JOURNEY_CONTACT_MANAGER_BASE_PATH,
      useExisting: APP_CONTACT_MANAGER_BASE_PATH,
    },
    {
      provide: QUICK_TRANSFER_JOURNEY_PAYMENT_ORDER_A2A_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_A2A_BASE_PATH,
    },
    {
      provide: QUICK_TRANSFER_JOURNEY_PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_BASE_PATH,
    },
  ],
})
export class QuickTransferJourneyBundleModule {}
