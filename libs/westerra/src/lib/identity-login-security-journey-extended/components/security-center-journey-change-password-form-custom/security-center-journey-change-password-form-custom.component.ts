import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ChangePasswordFormComponent } from '@backbase/identity-login-security-journey-ang';

@Component({
  selector: 'bb-security-center-journey-change-password-form-custom',
  templateUrl: './security-center-journey-change-password-form-custom.component.html',
  styleUrls: ['./security-center-journey-change-password-form-custom.component.scss'],
})
export class SecurityCenterJourneyChangePasswordFormCustomComponent extends ChangePasswordFormComponent {}
