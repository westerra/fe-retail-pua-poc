import { Component } from '@angular/core';
import {
  SecuritySettingsPasswordComponent,
  IdentityLoginSecurityJourneyConfigurationService,
} from '@backbase/identity-login-security-features';
import { NotificationService } from '@backbase/ui-ang/notification';
import { UserProfileWrapperService } from '@backbase/identity-user-profile-features';
import { BehaviorSubject } from 'rxjs';

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
  ) {
    super(configService, notificationService);

    this.getProfileData();
  }

  ngOnInit(): void {}

  getProfileData() {
    this.userProfileService.dataService.getUserProfile$.subscribe((res: any) => {
      this.profile$.next(res);
    });
  }
}
