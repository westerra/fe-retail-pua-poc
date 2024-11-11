import { Component } from '@angular/core';
import { TransactionsListWidgetComponent } from '@backbase/transactions-list-widget-ang';
import { NavigationService, WidgetPropertiesService, BaseTransactionsWidget } from '@backbase/transactions-common-ang';

@Component({
  selector: 'bb-transactions-list-widget-extended',
  templateUrl: './transactions-list-widget-extended.component.html',
  // providers: [NavigationService, WidgetPropertiesService],
})
export class TransactionsListWidgetExtendedComponent extends TransactionsListWidgetComponent {}
