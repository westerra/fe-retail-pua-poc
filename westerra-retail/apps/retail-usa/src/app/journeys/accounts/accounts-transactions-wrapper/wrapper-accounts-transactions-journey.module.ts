import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import {
  QuickTransferJourneyCommunicationService,
  QuickTransferJourneyModule,
  QUICK_TRANSFER_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
} from '@backbase/quick-transfer-journey-ang';
import { AccountsStateCommunicationService } from '@backbase/retail/feature/communication';
import { QuickActionsComponent } from '../quick-actions.component';
import { CampaignSpaceJourneyBundleModule } from './campaign-space-journey.module';
import { AccountsTransactionsJourneyWrapperComponent } from './wrapper-accounts-transactions-journey.component';
import { APP_ARRANGEMENT_MANAGER_BASE_PATH, APP_TRANSACTIONS_BASE_PATH } from '../../../service-paths.module';
import { ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH } from '@backbase/accounts-transactions-journey-ang';
import { AlertModule } from '@backbase/ui-ang/alert';
import { HeaderModule } from '@backbase/ui-ang/header';

const routes: Routes = [
  {
    path: '',
    component: AccountsTransactionsJourneyWrapperComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('../bundle-accounts-transactions-journey.module').then(
            (m) => m.AccountsTransactionsJourneyBundleModule,
          ),
      },
    ],
  },
];

@NgModule({
  declarations: [AccountsTransactionsJourneyWrapperComponent, QuickActionsComponent],
  imports: [
    AlertModule,
    QuickTransferJourneyModule,
    RouterModule.forChild(routes),
    CommonModule,
    CampaignSpaceJourneyBundleModule,
    EntitlementsModule,
    HeaderModule
  ],
  providers: [
    {
      provide: QuickTransferJourneyCommunicationService,
      useExisting: AccountsStateCommunicationService,
    },
    {
      provide: ACCOUNTS_TRANSACTIONS_JOURNEY_TRANSACTIONS_BASE_PATH,
      useExisting: APP_TRANSACTIONS_BASE_PATH,
    },
    {
      provide: QUICK_TRANSFER_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
})
export class AccountsTransactionsJourneyBundleModule {}
