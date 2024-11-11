import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import {
  EnrollmentUserData,
  IdUser,
  ProvisioningStatusEnum,
  SelfEnrollmentJourneyConfig,
  SelfEnrollmentUsernamePasswordForm,
} from '../../utils/enrollment-models';
import {
  EncrypedEntitySummary,
  EnrollmentsBackbasePostPostResponseBody,
  EnrollmentsBackbasePutRequest,
  EnrollmentsService,
  JointServiceAgreementTypes,
  ServiceAgreementTypes,
} from '../../services/enrollment-api/generated';
import { EnrollmentUserService } from '../../services/enrollment-user/enrollment-user.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { catchError, mergeMap } from 'rxjs';
import { SelfEnrollmentJourneyConfigurationToken } from '../../../services/api/api.models';

@Component({
  selector: 'bb-create-username-page',
  templateUrl: './create-username-page.component.html',
  styleUrls: ['./create-username-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsernamePageComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  @Input() isAutoEnrollment: boolean = false;
  @Input() userData: EnrollmentUserData = null;

  data: IdUser;

  constructor(
    // protected readonly service: EnrollmentsService,
    public readonly userService: EnrollmentUserService,
    private oAuthService: OAuthService,
    @Inject(SelfEnrollmentJourneyConfigurationToken) readonly config: SelfEnrollmentJourneyConfig,
  ) {}

  ngOnInit(): void {
    this.userService.clearError();
    this.userService.enrollmentInformation$.subscribe((data: IdUser) => {
      this.data = data;
    });
  }

  onNavigateToLogin() {
    this.goToLoginPage();
  }

  goToLoginPage() {
    this.oAuthService.initLoginFlow();
  }

  onContinue(formData: SelfEnrollmentUsernamePasswordForm) {
    if (!formData || formData === null || formData === undefined) {
      window.scroll(0, 0);
      this.userService.setStatus(ProvisioningStatusEnum.COMPLETE);
      this.nextStep.emit();
      return;
    }

    const user = this.data;

    const enrollmentPutRequest: EnrollmentsBackbasePutRequest = {
      entities: user.entities,
      identification: user.identification,
      password: formData.password,
      username: formData.username,
      verification: user.verification,
      profile: user.profile,
      jointServiceAgreementType: JointServiceAgreementTypes.ALL_PERSONAL,
      serviceAgreementType: ServiceAgreementTypes.ENTITIES_BUSINESS_JOINT,
    };

    //   this.service
    //       .putBackbase(enrollmentPutRequest)
    //       .pipe(catchError((err) => this.userService.handleError(err)))
    //       .subscribe(() => {
    //           this.userService.setStatus(ProvisioningStatusEnum.COMPLETE);
    //           this.nextStep.emit();
    //       });
  }
}
