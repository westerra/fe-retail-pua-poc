import { NgModule, Provider } from '@angular/core';
import { DeepPartial } from '@backbase/identity-common-ang';
import {
  IdentitySelfServiceJourneyModule,
  IdentitySelfServiceJourneyConfiguration,
  IdentitySelfServiceJourneyConfigurationToken,
  UserLocalizationCommunicationsViewComponent,
  // IdentitySelfServiceJourneyComponent,
  UserLocalizationChangeLanguageViewComponent,
  UserLocalizationComponent,
} from '@backbase/identity-self-service-journey-ang';
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
  IdentitySelfServiceJourneyComponent,
  AddAddressViewCustomComponent,
  EditAddressViewCustomComponent,
  AddPhoneViewCustomComponent,
  EditPhoneViewCustomComponent,
  UserProfileViewCustomComponent,
  AddEmailViewCustomComponent,
  EditEmailViewCustomComponent,
} from '@backbase/westerra';
import {
  IdentityUserProfileJourneyComponent,
  ViewUserProfileViewComponent,
  AddEmailViewComponent,
  EditEmailViewComponent,
  AddPhoneViewComponent,
  EditPhoneViewComponent,
  AddAddressViewComponent,
  EditAddressViewComponent,
} from '@backbase/identity-user-profile-features';

export const userProfileDefaultRoutesCustom = {
  path: '',
  component: IdentityUserProfileJourneyComponent,
  children: [
    {
      path: '',
      // component: ViewUserProfileViewComponent,
      component: UserProfileViewCustomComponent,
    },
    {
      path: 'email/add',
      // component: AddEmailViewComponent,
      component: AddEmailViewCustomComponent,
    },
    {
      path: 'email/:emailAddressKey/edit',
      // component: EditEmailViewComponent,
      component: EditEmailViewCustomComponent,
    },
    {
      path: 'phone/add',
      // component: AddPhoneViewComponent,
      component: AddPhoneViewCustomComponent,
    },
    {
      path: 'phone/:phoneAddressKey/edit',
      // component: EditPhoneViewComponent,
      component: EditPhoneViewCustomComponent,
    },
    {
      path: 'address/add',
      // component: AddAddressViewComponent,
      component: AddAddressViewCustomComponent,
    },
    {
      path: 'address/:postalAddressKey/edit',
      // component: EditAddressViewComponent,
      component: EditAddressViewCustomComponent,
    },
    { path: '**', redirectTo: '' },
  ],
};

const defaultRoute = {
  path: '',
  component: IdentitySelfServiceJourneyComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path: 'profile',
      data: {
        title: $localize`:Tab label for managing user profile@@bb-identity-self-service-journey.tab-user-manage-profile:Profile`,
      },
      // children: [userProfileDefaultRoutes],
      children: [userProfileDefaultRoutesCustom],
    },
    // {
    //   path: 'user-localization',
    //   data: {
    //     title: $localize`:Tab label for changing user preferences@@bb-identity-self-service-journey.tab-localization:Localization`,
    //   },
    //   component: UserLocalizationComponent,
    //   children: [
    //     { path: '', redirectTo: 'communications', pathMatch: 'full' },
    //     {
    //       path: 'communications',
    //       component: UserLocalizationCommunicationsViewComponent,
    //     },
    //     {
    //       path: 'change-language',
    //       component: UserLocalizationChangeLanguageViewComponent,
    //     },
    //   ],
    // },
    {
      path: 'login-security',
      data: {
        title: $localize`:Tab label for login and security settings@@bb-identity-self-service-journey.tab-login-security:Login & Security`,
      },
      // children: [loginSecurityShellRoutes],
      loadChildren: () => import('@backbase/westerra').then((m) => m.IdentityLoginSecurityJourneyExtendedModule),
    },
    {
      path: 'devices',
      data: { title: $localize`:Tab label for managing devices@@bb-identity-self-service-journey.tab-devices:Devices` },
      children: [deviceManagementDefaultRoutes],
    },
  ],
};

const ProfileConfigProvider: Provider = {
  provide: IdentitySelfServiceJourneyConfigurationToken,
  useValue: {
    userManageProfile: {
      maxEmailAddresses: 1,
      maxPhoneNumbers: 3,
      maxPostalAddresses: 2,
      postalAddressTypes: ['Home', 'Mailing'],
      emailOperationsEnabled: ['EDIT', 'REMOVE'],
      phoneOperationsEnabled: ['EDIT', 'REMOVE'],
      addressOperationsEnabled: ['EDIT', 'REMOVE'],
      emailAddressIsPrimaryEditable: false,
      emailAddressIsTypeEditable: false,
      postalAddressIsPrimaryEditable: false,
      postalAddressIsTypeEditable: true,
      phoneNumberIsPrimaryEditable: false,
      phoneNumberIsTypeEditable: true,
    },
  } as DeepPartial<IdentitySelfServiceJourneyConfiguration>,
};

@NgModule({
  imports: [IdentitySelfServiceJourneyModule.forRoot({ route: defaultRoute })],
  providers: [ProfileConfigProvider],
})
export class SelfServiceJourneyBundleModule {}
