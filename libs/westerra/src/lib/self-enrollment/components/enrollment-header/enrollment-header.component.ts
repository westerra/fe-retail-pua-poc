import { Component, Input, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { EnrollmentUserData } from '../../utils/enrollment-models';

@Component({
  selector: 'bb-enrollment-header',
  templateUrl: './enrollment-header.component.html',
  styleUrls: ['./enrollment-header.component.scss'],
})
export class EnrollmentHeaderComponent implements OnInit {
  @Input() isAutoEnrollment: boolean = false;
  @Input() userData: EnrollmentUserData = null;
  constructor(private oAuthService: OAuthService) {}

  ngOnInit(): void {}

  onNavigateToLogin() {
    this.oAuthService.initLoginFlow();
  }
}