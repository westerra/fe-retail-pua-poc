/* eslint-disable import/no-extraneous-dependencies */
import { Component } from '@angular/core';
import {
  SecuritySettingsPasswordComponent,
  IdentityLoginSecurityJourneyConfigurationService,
} from '@backbase/internal-identity-login-security-features';
import { NotificationService } from '@backbase/ui-ang/notification';
import { UserProfileWrapperService } from '@backbase/internal-identity-user-profile-features';
import { BehaviorSubject } from 'rxjs';
import { IdentityManagementService } from '@backbase/user-http-ang';
import { ɵɵOidcAuthService } from '@backbase/internal-identity-auth';
import { LoginSecurityDataService } from '@backbase/internal-identity-login-security-data-access'
@Component({
  selector: 'bb-security-settings-password-extended',
  templateUrl: './security-settings-password-extended.component.html',
  styleUrls: ['./security-settings-password-extended.component.scss'],
})
export class SecuritySettingsPasswordExtendedComponent extends SecuritySettingsPasswordComponent {
  public profile$: BehaviorSubject<any> = new BehaviorSubject(undefined);


  constructor(
    configService: IdentityLoginSecurityJourneyConfigurationService,
    notificationService: NotificationService,
    private userProfileService: UserProfileWrapperService,
    dataService: LoginSecurityDataService,
    identityManagementService: IdentityManagementService, authService: ɵɵOidcAuthService,
    document: Document,
  ) {
    super(configService, notificationService, dataService, identityManagementService, authService, document);

    this.getProfileData();
  }


  getProfileData() {
    this.userProfileService.dataService.getUserProfile$.subscribe((res: any) => {
      this.profile$.next(res);
    });
  }
}
