import { NgModule } from '@angular/core';
import {
  IdentityPasswordResetJourneyModule,
  PasswordResetJourneyConfigurationToken,
} from '@backbase/identity-password-reset-journey';

@NgModule({
  imports: [IdentityPasswordResetJourneyModule.forRoot()],
  providers: [
    {
      provide: PasswordResetJourneyConfigurationToken,
      useValue: {
        appUrl: '/',
        phoneNumber: '1234567890',
      },
    },
  ],
})
export class PasswordResetJourneyBundleModule {}
