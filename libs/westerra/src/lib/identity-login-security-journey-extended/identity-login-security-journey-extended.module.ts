import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecuritySettingsPasswordExtendedComponent } from './components/security-settings-password-extended/security-settings-password-extended.component';
import { RouterModule } from '@angular/router';
import {
  IdentityLoginSecurityJourneyComponent,
  IdentityLoginSecurityJourneyConfigurationService,
} from '@backbase/identity-login-security-journey-ang';
import { IdentityLoginSecurityJourneyModule } from '@backbase/identity-login-security-journey-ang';
import { HeaderModule } from '@backbase/ui-ang/header';
import { SecurityCenterJourneyChangePasswordFormCustomComponent } from './components/security-center-journey-change-password-form-custom/security-center-journey-change-password-form-custom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InputValidationMessageModule } from '@backbase/ui-ang/input-validation-message';
import { InputPasswordModule } from '@backbase/ui-ang/input-password';
import { ModalModule } from '@backbase/ui-ang/modal';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ErrorCommonStateModule } from '@backbase/ui-ang/common-error-state';
import { ButtonModule } from '@backbase/ui-ang/button';
import { AlertModule } from '@backbase/ui-ang/alert';
import { IdentityManagementService } from '@backbase/user-http-ang';
import { NotificationService } from '@backbase/ui-ang/notification';
import { ChangePasswordFormModule, LoginSecurityFeaturesModule } from '@backbase/identity-login-security-journey-ang';

export const loginSecurityShellRoutesExtended = {
  path: '',
  component: IdentityLoginSecurityJourneyComponent,
  children: [
    {
      path: '',
      component: SecuritySettingsPasswordExtendedComponent,
    },
    {
      path: '**',
      redirectTo: '',
    },
  ],
};

@NgModule({
  declarations: [SecuritySettingsPasswordExtendedComponent, SecurityCenterJourneyChangePasswordFormCustomComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ChangePasswordFormModule,
    AlertModule,
    ButtonModule,
    ErrorCommonStateModule,
    HeaderModule,
    LoadingIndicatorModule,
    ModalModule,
    InputPasswordModule,
    InputValidationMessageModule,
    LoginSecurityFeaturesModule,
    IdentityLoginSecurityJourneyModule.forRoot({ route: loginSecurityShellRoutesExtended }),
  ],
  exports: [SecuritySettingsPasswordExtendedComponent],
  providers: [
    IdentityLoginSecurityJourneyConfigurationService,
    IdentityManagementService,
    NotificationService,
  ],
})
export class IdentityLoginSecurityJourneyExtendedModule {}
