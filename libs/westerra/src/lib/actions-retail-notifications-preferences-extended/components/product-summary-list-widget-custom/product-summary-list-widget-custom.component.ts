import { Component } from '@angular/core';
import { ProductSummaryNotificationsService } from '../../services/product-summary-notifications.service';
import { ProductSummaryBaseComponent } from '../product-summary-base/product-summary-base.component';
import { AccountsExternalInfoService } from '../../services/accounts-external-info.service';
import { PubSubService } from '@backbase/foundation-ang/web-sdk';

@Component({
  selector: 'bb-product-summary-list-widget-custom',
  templateUrl: './product-summary-list-widget-custom.component.html',
  providers: [ProductSummaryNotificationsService],
})
export class ProductSummaryListWidgetCustomComponent extends ProductSummaryBaseComponent {
  constructor(
    service: ProductSummaryNotificationsService,
    accountsExternalInfoService: AccountsExternalInfoService,
    eventBusService: PubSubService,
  ) {
    super(service, accountsExternalInfoService, eventBusService);
  }
}
