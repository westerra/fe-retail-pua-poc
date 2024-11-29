/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import {
  EditionTypeEnum,
  IdentitySelfEnrollmentJourneyModule,
  SelfEnrollmentJourneyConfig,
  SelfEnrollmentJourneyConfigurationToken,
} from '@backbase/identity-self-enrollment-journey';
import { SelfEnrollmentShellModule } from '@backbase/westerra';
import { customEnrollmentRoutes } from 'libs/westerra/src/lib/self-enrollment/utils/self-enrollment-utils';

const journeyConfiguration: SelfEnrollmentJourneyConfig = {
  // appUrl: 'environment.authLandingPage',
  appUrl: '/',
  termsConditionsUrl: '/terms_&_conditions',
  privacyPolicyUrl: '/privacy_policy',
  // phoneNumber: '(512) 467-8080 or (800) 252-8311',
  phoneNumber: '01800999777',
};

@NgModule({
  imports: [
    // IdentitySelfEnrollmentJourneyModule.forRoot({ routes: customEnrollmentRoutes })
    SelfEnrollmentShellModule.forRoot({ routes: customEnrollmentRoutes }),
  ],
  providers: [
    {
      provide: SelfEnrollmentJourneyConfigurationToken,
      useValue: journeyConfiguration,
    },
  ],
})
export class SelfEnrollmentJourneyBundleModule {}
