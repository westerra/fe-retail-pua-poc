import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRoutes } from '@angular/router';
import { PayverisWidgetComponent } from './payveris-widget.component';
import { WesterraPayverisDataService } from '../services/payveris-service/westerra-payveris-data-service.service';
import { WesterraPayverisDataModule } from '../services/payveris-service/westerra-payveris-data.module';
import { HeaderModule } from '@backbase/ui-ang/header';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { AppSsoStateService, SSO } from '../services/api/app-sso-state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@backbase/ui-ang/button';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';

const payverisRoute = {
  path: '',
  component: PayverisWidgetComponent,
};

@NgModule({
  declarations: [PayverisWidgetComponent],
  imports: [CommonModule, HeaderModule, LoadingIndicatorModule, WesterraPayverisDataModule,
    LoadingIndicatorModule,
    ReactiveFormsModule,
    ButtonModule,
    EmptyStateModule,
    HeaderModule,],
  providers:[AppSsoStateService]
})
export class PayverisModuleModule {
  static forRoot(data = { route: payverisRoute }) {
    return {
      ngModule: PayverisModuleModule,
      providers: [provideRoutes([data.route])],
    };
  }
}
