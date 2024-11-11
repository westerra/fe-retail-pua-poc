import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiServiceModule } from './services/api/api.module';
import { Configurations } from './services/api/configurations';
import { AccountsListExtendedViewModule } from './accounts-list-extended-view/accounts-list-extended-view.module';
import { ProductSummaryService } from './accounts-list-extended-view/accounts-list/services/product-summary.service';
import { AccountDetailsTabExtendedModule } from './account-details-tab-extended/account-details-tab-extended.module';
import { SelfEnrollmentShellModule } from './self-enrollment/self-enrollment-shell.module';
import { EnrollmentHandlerComponent } from './self-enrollment/components/enrollment-handler/enrollment-handler.component';
import { LogoModule } from '@backbase/ui-ang/logo';
import { PayverisModuleModule } from './payveris-widget/payveris-widget.module';
import { CardsManagementJourneyModule } from './cards-management-extended/cards-management-journey.module';
import { IdentitySelfServiceJourneyComponent } from './identity-self-service-journey/identity-self-service-journey.component';
import { IdentitySelfServiceJourneyModule } from './identity-self-service-journey/identity-self-service-journey.module';
import { InternalTRansferViewModule } from './internal-transfer-extended/internal-transfer-extended-view.module';
import { WesterraUiModule } from '@westerra-ui';

@NgModule({
  imports: [
    CommonModule,
    ApiServiceModule,
    AccountsListExtendedViewModule,
    AccountDetailsTabExtendedModule,
    PayverisModuleModule,
    CardsManagementJourneyModule,
    // IdentitySelfServiceJourneyModule.forRoot()
    InternalTRansferViewModule,
    WesterraUiModule,
  ],
  exports: [SelfEnrollmentShellModule],
  providers: [SelfEnrollmentShellModule, ProductSummaryService],
  declarations: [],
})
export class WesterraModule {
  public static forRoot(config: Configurations): ModuleWithProviders<WesterraModule> {
    return {
      ngModule: WesterraModule,
      providers: [{ provide: Configurations, useValue: config }],
    };
  }
}
