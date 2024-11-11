import { ModuleWithProviders, NgModule } from '@angular/core';
import { Routes, provideRoutes } from '@angular/router';
import { OrderChecksViewComponent } from './components/order-checks-view/order-checks-view.component';
import { HeaderModule } from '@backbase/ui-ang/header';
import { CommonModule } from '@angular/common';
import { ӨPaymentOrderHttpService } from '@backbase/initiate-payment-journey-ang';
import { OrderChecksService } from './services/order-checks.service';
import { AccountsTransactionsJourneyModule } from '@backbase/accounts-transactions-journey-ang';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';
import { DropdownMultiSelectModule } from '@backbase/ui-ang/dropdown-multi-select';

import { SharedFeatureFormsModule } from '@backbase/internal-payments-shared-feature-forms';
import { WesterraUiModule } from '@westerra-ui';

const customOrderCheckRoutes: Routes = [
  {
    path: '',
    component: OrderChecksViewComponent,
  },
];

@NgModule({
  declarations: [OrderChecksViewComponent],
  imports: [
    HeaderModule,
    CommonModule,
    SharedFeatureFormsModule,
    DropdownSingleSelectModule,
    DropdownMultiSelectModule,
    WesterraUiModule,

    AccountsTransactionsJourneyModule,
  ],
  exports: [OrderChecksViewComponent],
  providers: [OrderChecksService, ӨPaymentOrderHttpService],
})
export class OrderChecksModule {
  static forRoot(
    data: { routes: Routes; [key: string]: any } = { routes: customOrderCheckRoutes },
  ): ModuleWithProviders<OrderChecksModule> {
    return {
      ngModule: OrderChecksModule,
      providers: [provideRoutes(data.routes)],
    };
  }
}
