import { NgModule, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IdentitySelfServiceJourneyComponent } from './identity-self-service-journey.component';
import {
  defaultRoute as deviceManagementDefaultRoutes,
  IdentityDeviceManagementJourneyConfigurationToken,
  IdentityDeviceManagementJourneyModule,
} from '@backbase/identity-device-management-journey-ang';
import {
  IdentityLoginSecurityJourneyConfigurationToken,
  IdentityLoginSecurityJourneyModule,
  loginSecurityShellRoutes,
} from '@backbase/identity-login-security-journey-ang';
import {
  defaultRoute as userProfileDefaultRoutes,
  IdentityUserProfileJourneyConfigurationToken,
  IdentityUserProfileJourneyModule,
} from '@backbase/identity-user-profile-journey-ang';
import {
  UserLocalizationCommunicationsViewComponent,
  UserLocalizationChangeLanguageViewComponent,
  UserLocalizationComponent,
  IdentitySelfServiceJourneyConfigurationService,
  IdentitySelfServiceJourneyConfigurationToken,
  SelfServiceFeaturesModule,
} from '@backbase/identity-self-service-journey-ang';
import { IdentityCommonAngModule } from '@backbase/identity-common-ang';
import { AddAddressViewCustomComponent } from './components/add-address-view-custom/add-address-view-custom.component';
import { UserProfileFeaturesModule } from '@backbase/identity-user-profile-features';
import { EditAddressViewCustomComponent } from './components/edit-address-view-custom/edit-address-view-custom.component';
import { IdentityAddressRecordFormCustomComponent } from './components/identity-address-record-form-custom/identity-address-record-form-custom.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';
import { AddPhoneViewCustomComponent } from './components/add-phone-view-custom/add-phone-view-custom.component';
import { IdentityPhoneRecordFormCustomComponent } from './components/identity-phone-record-form-custom/identity-phone-record-form-custom.component';
import { EditPhoneViewCustomComponent } from './components/edit-phone-view-custom/edit-phone-view-custom.component';
import { HeaderModule } from '@backbase/ui-ang/header';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { ErrorCommonStateModule } from '@backbase/ui-ang/common-error-state';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { IconModule } from '@backbase/ui-ang/icon';
import { ButtonModule } from '@backbase/ui-ang/button';
import { CollapsibleModule } from '@backbase/ui-ang/collapsible';
import { CollapsibleAccordionModule } from '@backbase/ui-ang/collapsible-accordion';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { PhoneNumberModule } from '@backbase/ui-ang/phone-number-format-pipe';

import { SharedFeatureFormsModule } from '@backbase/internal-payments-shared-feature-forms';
import { UserProfileViewCustomComponent } from './components/user-profile-view-custom/user-profile-view-custom.component';
import { DropdownMultiSelectModule } from '@backbase/ui-ang/dropdown-multi-select';
import { AddEmailViewCustomComponent } from './components/add-email-view-custom/add-email-view-custom.component';
import { EditEmailViewCustomComponent } from './components/edit-email-view-custom/edit-email-view-custom.component';
import { IdentityEmailRecordFormCustomComponent } from './components/identity-email-record-form-custom/identity-email-record-form-custom.component';
import { IdentitySelfJourneyCustomService } from './services/identity-self-journey-custom.service';

export const defaultRoute = {
  path: '',
  component: IdentitySelfServiceJourneyComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path: 'profile',
      data: {
        title: $localize`:Tab label for managing user profile@@bb-identity-self-service-journey.tab-user-manage-profile:Profile`,
      },
      children: [userProfileDefaultRoutes],
    },
    {
      path: 'user-localization',
      data: {
        title: $localize`:Tab label for changing user preferences@@bb-identity-self-service-journey.tab-localization:Localization`,
      },
      component: UserLocalizationComponent,
      children: [
        { path: '', redirectTo: 'communications', pathMatch: 'full' },
        {
          path: 'communications',
          component: UserLocalizationCommunicationsViewComponent,
        },
        {
          path: 'change-language',
          component: UserLocalizationChangeLanguageViewComponent,
        },
      ],
    },
    {
      path: 'login-security',
      data: {
        title: $localize`:Tab label for login and security settings@@bb-identity-self-service-journey.tab-login-security:Login & Security`,
      },
      children: [loginSecurityShellRoutes],
    },
    {
      path: 'devices',
      data: { title: $localize`:Tab label for managing devices@@bb-identity-self-service-journey.tab-devices:Devices` },
      children: [deviceManagementDefaultRoutes],
    },
  ],
};

const userProfileJourneyConfigurationTokenFactory = (config) => ({
  hasFixedWidth: false,
  ...(config?.userManageProfile || {}),
});
const loginSecurityJourneyConfigurationTokenFactory = (config) => ({
  hasFixedWidth: false,
  ...(config?.userIdentitySecurityCenter || {}),
});
const deviceManagementJourneyConfigurationTokenFactory = (config) => ({
  hasFixedWidth: false,
  ...(config?.deviceInformation || {}),
});

const components = [
  IdentitySelfServiceJourneyComponent,
  AddAddressViewCustomComponent,
  EditAddressViewCustomComponent,
  IdentityAddressRecordFormCustomComponent,
  AddPhoneViewCustomComponent,
  IdentityPhoneRecordFormCustomComponent,
  EditPhoneViewCustomComponent,
  UserProfileViewCustomComponent,
  AddEmailViewCustomComponent,
  EditEmailViewCustomComponent,
  IdentityEmailRecordFormCustomComponent,
];
const innerModules = [
  IdentityCommonAngModule,
  SelfServiceFeaturesModule,
  IdentityLoginSecurityJourneyModule,
  IdentityUserProfileJourneyModule,
  IdentityDeviceManagementJourneyModule,
  UserProfileFeaturesModule,
];

const generalModules = [
  HeaderModule,
  CommonModule,
  RouterModule,
  ReactiveFormsModule,
  EmptyStateModule,
  ErrorCommonStateModule,
  LoadingIndicatorModule,
  IconModule,
  ButtonModule,
  CollapsibleModule,
  CollapsibleAccordionModule,
  InputCheckboxModule,
  PhoneNumberModule,
  SharedFeatureFormsModule,
  DropdownSingleSelectModule,
  DropdownMultiSelectModule,
];

@NgModule({
  imports: [...innerModules, ...generalModules],
  declarations: [...components],
  providers: [
    IdentitySelfServiceJourneyConfigurationService,
    IdentitySelfJourneyCustomService,
    {
      provide: IdentityUserProfileJourneyConfigurationToken,
      useFactory: userProfileJourneyConfigurationTokenFactory,
      deps: [[new Optional(), IdentitySelfServiceJourneyConfigurationToken]],
    },
    {
      provide: IdentityLoginSecurityJourneyConfigurationToken,
      useFactory: loginSecurityJourneyConfigurationTokenFactory,
      deps: [[new Optional(), IdentitySelfServiceJourneyConfigurationToken]],
    },
    {
      provide: IdentityDeviceManagementJourneyConfigurationToken,
      useFactory: deviceManagementJourneyConfigurationTokenFactory,
      deps: [[new Optional(), IdentitySelfServiceJourneyConfigurationToken]],
    },
  ],
  exports: [RouterModule, ...components],
})
export class IdentitySelfServiceJourneyModule {}
