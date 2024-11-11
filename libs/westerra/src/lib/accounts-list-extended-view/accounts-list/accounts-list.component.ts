/* eslint-disable import/no-extraneous-dependencies */
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AccountsTransactionsJourneyService,
  ExternalAccountAggregationService,
  AccountsCommunicationService,
  AccountsStateCommunicationService,
} from '@backbase/accounts-transactions-journey-ang';
import { AccountsExternalInfoService } from '@backbase/internal-at-shared-data-access-ang';
import { NotificationService } from '@backbase/ui-ang/notification';
import { ProductSummaryService } from './services/product-summary.service';
import { AccountsListBaseComponent } from '../accounts-list-base/accounts-list-base.component';

@Component({
  selector: 'bb-accounts-list',
  templateUrl: './accounts-list.component.html',
  providers: [ProductSummaryService],
})
export class AccountsListExtendedViewComponent extends AccountsListBaseComponent {
  /**
   * @internal
   */
  constructor(
    config: AccountsTransactionsJourneyService,
    router: Router,
    route: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef,
    externalAccountAggregationService: ExternalAccountAggregationService,
    accountsCommunicationService: AccountsCommunicationService,
    notificationService: NotificationService,
    accountsStateCommunication: AccountsStateCommunicationService,
    productKindsService: ProductSummaryService,
    accountsExternalInfoService: AccountsExternalInfoService,
  ) {
    super(
      config,
      router,
      route,
      changeDetectorRef,
      externalAccountAggregationService,
      notificationService,
      accountsCommunicationService,
      accountsStateCommunication,
      productKindsService,
      accountsExternalInfoService,
    );
  }
}
