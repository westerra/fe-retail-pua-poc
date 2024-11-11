import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProvisioningStatusEnum } from '../../utils/enrollment-models';
import { EnrollmentUserService } from '../../services/enrollment-user/enrollment-user.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
// import * as AppStoreImg '../../assets/app-store-img.svg';

@Component({
  selector: 'bb-check-enrollment-status-page',
  templateUrl: './check-enrollment-status-page.component.html',
  styleUrls: ['./check-enrollment-status-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckEnrollmentStatusPageComponent implements OnInit {
  // phoneNumber: string = this.config.phoneNumber;
  // enrollmentStatus: ProvisioningStatusEnum;
  @Input() phoneNumber: string;
  @Input() enrollmentStatus: ProvisioningStatusEnum;
  @Input() isMobileUser: boolean = false;
  @Output() readonly navigateToLogin = new EventEmitter();

  googlePlayURL: string = 'https://play.google.com/store';
  appStoreURL: string = 'https://www.apple.com/ios/app-store';

  constructor(
    public readonly userService: EnrollmentUserService,
    private oAuthService: OAuthService,
    private route: Router,
  ) {}

  ngOnInit(): void {
    this.enrollmentStatus = this.userService.getStatus();
  }

  restartEnrollment() {
    location.reload();
  }

  onNavigateToLogin() {
    this.navigateToLogin.emit();
    this.oAuthService.initLoginFlow();
  }
}
