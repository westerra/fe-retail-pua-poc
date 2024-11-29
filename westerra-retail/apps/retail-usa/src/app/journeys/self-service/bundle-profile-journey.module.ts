import { LOCALE_ID, NgModule } from '@angular/core';
import {
  IdentitySelfServiceJourneyModule,
  IdentitySelfServiceJourneyConfiguration,
  IdentitySelfServiceJourneyConfigurationToken,
  SELF_SERVICE_ACCESS_CONTROL_BASE_PATH,
  SELF_SERVICE_ADDRESS_AUTOCOMPLETE_BASE_PATH,
  SELF_SERVICE_DEVICE_BASE_PATH,
  SELF_SERVICE_DEVICE_MANAGEMENT_V2_BASE_PATH,
  SELF_SERVICE_USER_MANAGER_BASE_PATH,
  IdentitySelfServiceJourneyComponent,
} from '@backbase/identity-self-service-journey-ang';
import {
  defaultRoute as deviceManagementDefaultRoutes,
} from '@backbase/identity-device-management-journey-ang';
import {
  AddAddressViewComponent,
  EditAddressViewComponent,
  IdentityUserProfileJourneyComponent,
  ViewUserProfileViewComponent,
} from '@backbase/identity-user-profile-journey-ang';
// import {
//   IdentitySelfServiceJourneyComponent,
//   AddAddressViewCustomComponent,
//   EditAddressViewCustomComponent,
//   AddPhoneViewCustomComponent,
//   EditPhoneViewCustomComponent,
//   UserProfileViewCustomComponent,
//   AddEmailViewCustomComponent,
//   EditEmailViewCustomComponent,
// } from '@backbase/westerra';
import { Route } from '@angular/router';
import { APP_ACCESS_CONTROL_BASE_PATH, APP_USER_BASE_PATH, APP_DEVICE_BASE_PATH, APP_DEVICE_MANAGEMENT_V2_BASE_PATH, APP_ADDRESS_AUTOCOMPLETE_BASE_PATH } from '../../service-paths.module';
import { environment } from '../../../environments/environment';
import { HeaderModule } from '@backbase/ui-ang/header';
import { AddEmailViewComponent, AddPhoneViewComponent, EditEmailViewComponent, EditPhoneViewComponent } from '@backbase/internal-identity-user-profile-ui';


const userProfileDefaultRoutesCustomtRoute: Route = {
  path: '',
  component: IdentityUserProfileJourneyComponent,
  children: [
    {
      path: '',
      component: ViewUserProfileViewComponent,
    },
    {
      path: 'email/add',
      component: AddEmailViewComponent,
    },
    {
      path: 'email/:emailAddressKey/edit',
      // component: EditEmailViewCustomComponent,
      component: EditEmailViewComponent,
    },
    {
      path: 'phone/add',
      // component: AddPhoneViewCustomComponent,
      component: AddPhoneViewComponent,
    },
    {
      path: 'phone/:phoneAddressKey/edit',
      // component: EditPhoneViewCustomComponent,
      component: EditPhoneViewComponent
    },
    {
      path: 'address/add',
      // component: AddAddressViewCustomComponent,
      component: AddAddressViewComponent,
    },
    {
      path: 'address/:postalAddressKey/edit',
      // component: EditAddressViewCustomComponent,
      component: EditAddressViewComponent,
    },
    { path: '**', redirectTo: '' },
  ],
};

const defaultRoute : Route = {
  path: '',
  // component: IdentitySelfServiceJourneyComponent,
  component: IdentitySelfServiceJourneyComponent,
  children: [
    { path: '', redirectTo: 'profile', pathMatch: 'full' },
    {
      path: 'profile',
      data: {
              title: $localize `:Tab label for managing user profile@@bb-identity-self-service-journey.tab-user-manage-profile:Profile`,
      },
          children: [userProfileDefaultRoutesCustomtRoute],
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
              title: $localize `:Tab label for login and security settings@@bb-identity-self-service-journey.tab-login-security:Login & Security`,
      },
      loadChildren: () => import('@backbase/westerra').then((m) => m.IdentityLoginSecurityJourneyExtendedModule),
    
    },
    {
      path: 'devices',
          data: { title: $localize `:Tab label for managing devices@@bb-identity-self-service-journey.tab-devices:Devices` },
      children: [deviceManagementDefaultRoutes],
    },
  ],
};

export function profileConfigProvider(locale: string): DeepPartial<IdentitySelfServiceJourneyConfiguration> {
  const identitySelfServiceJourneyConfiguration: DeepPartial<IdentitySelfServiceJourneyConfiguration> = {
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
    userIdentitySecurityCenter: {
      changeUsernameEnabled: true,
      changeUsernameSuccessPath: `${environment.baseHref}${locale}/logout/username-success`,
    },
};
  return identitySelfServiceJourneyConfiguration;
}


@NgModule({
  imports: [IdentitySelfServiceJourneyModule.forRoot({ routes: defaultRoute }), HeaderModule],
  providers: [ {
    provide: IdentitySelfServiceJourneyConfigurationToken,
    useFactory: profileConfigProvider,
    deps: [LOCALE_ID],
  },
  {
    provide: SELF_SERVICE_ACCESS_CONTROL_BASE_PATH,
    useExisting: APP_ACCESS_CONTROL_BASE_PATH,
  },
  {
    provide: SELF_SERVICE_USER_MANAGER_BASE_PATH,
    useExisting: APP_USER_BASE_PATH,
  },
  {
    provide: SELF_SERVICE_DEVICE_BASE_PATH,
    useExisting: APP_DEVICE_BASE_PATH,
  },
  {
    provide: SELF_SERVICE_DEVICE_MANAGEMENT_V2_BASE_PATH,
    useExisting: APP_DEVICE_MANAGEMENT_V2_BASE_PATH,
  },
  {
    provide: SELF_SERVICE_ADDRESS_AUTOCOMPLETE_BASE_PATH,
    useExisting: APP_ADDRESS_AUTOCOMPLETE_BASE_PATH,
  },],
})
export class SelfServiceJourneyBundleModule {}
