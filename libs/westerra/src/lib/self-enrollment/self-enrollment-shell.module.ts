import { InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, provideRoutes } from '@angular/router';
import { customEnrollmentRoutes } from './utils/self-enrollment-utils';
import { EnrollmentHandlerComponent } from './components/enrollment-handler/enrollment-handler.component';
import { IdentificationPageComponent } from './components/identification-page/identification-page.component';
import { CreateUsernamePageComponent } from './components/create-username-page/create-username-page.component';
import { CheckEnrollmentStatusPageComponent } from './components/check-enrollment-status-page/check-enrollment-status-page.component';
import { EnrollmentChallengeHandlerService } from './services/enrollment-challenge-handler/enrollment-challenge-handler.service';
import { LogoModule } from '@backbase/ui-ang/logo';
import { EnrollmentWrapperComponent } from './components/enrollment-wrapper/enrollment-wrapper.component';
import { IdentificationViewComponent } from './components/identification-view/identification-view.component';
import { EnrollmentHeaderComponent } from './components/enrollment-header/enrollment-header.component';
import { EnrollmentProgressIndicatorComponent } from './components/enrollment-progress-indicator/enrollment-progress-indicator.component';
import { AlertModule } from '@backbase/ui-ang/alert';
import { ButtonModule } from '@backbase/ui-ang/button';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { InputDatepickerModule } from '@backbase/ui-ang/input-datepicker';
import { InputPasswordModule } from '@backbase/ui-ang/input-password';
import { InputTextModule } from '@backbase/ui-ang/input-text';
import { InputValidationMessageModule } from '@backbase/ui-ang/input-validation-message';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ModalModule } from '@backbase/ui-ang/modal';
import { ProgressbarModule } from '@backbase/ui-ang/progressbar';
import { ReactiveFormsModule } from '@angular/forms';
import { WesterraEnrollmentDataService } from './services/westerra-enrollment-data/westerra-enrollment-data.service';
import { CreateUsernameViewComponent } from './components/create-username-view/create-username-view.component';
import { EnrollmentsService } from './services/enrollment-api/generated/services/EnrollmentsService';
import {
  DATA_HTTP_CONFIG,
  DataHttpModule,
  ServiceDataHttpConfig,
  createServiceDataHttpConfig,
} from '@backbase/foundation-ang/data-http';
import { HeaderModule } from '@backbase/ui-ang/header';
import {
  CUSTOM_ENROLLMENT_HTTP_DATA_CONFIG,
  SelfEnrollmentJourneyConfigurationToken,
  WESTERRA_ENROLLMENT_DATA_CONFIG,
} from '../services/api/api.models';
import { environment } from 'apps/retail-usa/src/environments/environment';

export function createWesterraEnrollmentDataServieDataHttpConfig(
  globalConfig: ServiceDataHttpConfig,
  serviceConfig?: Partial<ServiceDataHttpConfig>,
) {
  return createServiceDataHttpConfig(globalConfig, serviceConfig ? serviceConfig : { servicePath: '' });
}

@NgModule({
  imports: [
    CommonModule,
    LogoModule,
    RouterModule,
    AlertModule,
    ButtonModule,
    DropdownSingleSelectModule,
    IconModule,
    InputDatepickerModule,
    InputPasswordModule,
    InputValidationMessageModule,
    InputTextModule,
    LoadButtonModule,
    LoadingIndicatorModule,
    ModalModule,
    ProgressbarModule,
    InputCheckboxModule,
    ReactiveFormsModule,
    DataHttpModule,
    HeaderModule,
  ],
  declarations: [
    EnrollmentHandlerComponent,
    IdentificationPageComponent,
    CreateUsernamePageComponent,
    CheckEnrollmentStatusPageComponent,
    EnrollmentWrapperComponent,
    IdentificationViewComponent,
    EnrollmentHeaderComponent,
    EnrollmentProgressIndicatorComponent,
    CreateUsernameViewComponent,
  ],
  providers: [
    {
      provide: DATA_HTTP_CONFIG,
      useExisting: WESTERRA_ENROLLMENT_DATA_CONFIG,
      useValue: {
        apiRoot: `${environment.apiRoot}`,
      },
    },
    {
      provide: SelfEnrollmentJourneyConfigurationToken,
      useValue: SelfEnrollmentJourneyConfigurationToken,
    },
    {
      provide: WESTERRA_ENROLLMENT_DATA_CONFIG,
      useFactory: createWesterraEnrollmentDataServieDataHttpConfig,
      deps: [DATA_HTTP_CONFIG, [new Optional(), CUSTOM_ENROLLMENT_HTTP_DATA_CONFIG]],
    },
    EnrollmentChallengeHandlerService,
    WesterraEnrollmentDataService,
    EnrollmentsService,
  ],
})
export class SelfEnrollmentShellModule {
  static forRoot(
    data: { routes: Routes; [key: string]: any } = { routes: customEnrollmentRoutes },
    config?: Partial<ServiceDataHttpConfig>,
  ): ModuleWithProviders<SelfEnrollmentShellModule> {
    return {
      ngModule: SelfEnrollmentShellModule,
      providers: [
        {
          provide: CUSTOM_ENROLLMENT_HTTP_DATA_CONFIG,
          useValue: config,
        },
        provideRoutes(data.routes),
      ],
    };
  }
}
