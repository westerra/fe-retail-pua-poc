import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { Identification } from '@backbase/payment-order-http-ang';
import { catchError } from 'rxjs';
import {
  Verification,
  IdUser,
  EnrollmentVerifyType,
  EnrollmentInformation,
  IdentificationFormResponse,
  Identification,
  EnrollmentsBackbasePostRequest,
  EnrollmentsBackbasePostPostResponseBody,
  EnrollmentUserData,
} from '../../utils/enrollment-models';
import { EnrollmentUserService } from '../../services/enrollment-user/enrollment-user.service';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'bb-identification-page',
  templateUrl: './identification-page.component.html',
  styleUrls: ['./identification-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentificationPageComponent implements OnInit {
  @Output() nextStep = new EventEmitter();
  @Input() isAutoEnrollment: boolean = false;
  @Input() userData: EnrollmentUserData = null;
  @Input() uuid!: string;

  verification = Verification;
  verifyType = EnrollmentVerifyType;

  identificationAttempts = 0;

  duplicatedMessage = false;
  enableAutoEnrollmentVerification: boolean = false;

  constructor(
    // protected readonly service: EnrollmentsService,
    public readonly userService: EnrollmentUserService,
    private oAuthService: OAuthService,
  ) {}

  ngOnInit(): void {
    this.identificationAttempts = this.userService.getIdentificationAttempts();
    this.userService.clearError();

    // TO BE UNCOMMENTED
    // if (this.isAutoEnrollment) {
    //     this.service
    //         .getEnrollmentInformation(this.uuid)
    //         .pipe(catchError((err) => this.userService.handleError(err)))
    //         .subscribe((info: EnrollmentInformation) => {
    //             const metadata = info.metadata;
    //             const profile = {
    //                 firstName: metadata.firstName,
    //                 lastName: metadata.lastName,
    //             };
    //             this.userService.setEnrollmentInformation({ profile: profile });
    //         });
    // }
  }

  onNavigateToLogin() {
    this.goToLoginPage();
  }

  goToLoginPage() {
    this.oAuthService.initLoginFlow();
  }

  onFormSubmit(formData: IdentificationFormResponse) {
    this.userService.incrementIdentificationAttempts();
    this.identificationAttempts = this.userService.getIdentificationAttempts();
    if (!formData || formData === null || formData === undefined) {
      window.scroll(0, 0);
      this.nextStep.emit();
      return;
    }

    const identification = this.getIdentification(formData);
    const verification = this.getVerification(formData);

    const data: EnrollmentsBackbasePostRequest = {
      identification: identification,
      verification: verification,
    };

    // TO BE UNCOMMENTED
    // this.service
    //     .postBackbase(data)
    //     .pipe(
    //         catchError((err) => {
    //             this.errorType(err);
    //             return this.userService.handleError(err);
    //         })
    //     )
    //     .subscribe((response: EnrollmentsBackbasePostPostResponseBody) => {
    //         const res = response;

    //         const entities = res.entities.map((entity) => {
    //             return entity.entityId;
    //         });

    //         const profile = {
    //             firstName: formData.firstName,
    //             lastName: formData.lastName,
    //         };

    //         const user: IdUser = {
    //             entities: entities,
    //             preferredUsername: res.preferredUsername,
    //             identification: data.identification,
    //             profile: profile,
    //             verification: data.verification,
    //             username: res.preferredUsername,
    //         };
    //         this.userService.setEnrollmentInformation(user);

    //         this.nextStep.emit();
    //     });
  }

  toVerifyData = (formData, dob, metadata) => {
    const verifySSN = formData.socialSecurityNumber ? true : false;
    const firstName = { type: this.verification.type.FIRSTNAME, value: metadata.firstname };
    const lastName = { type: this.verification.type.LASTNAME, value: metadata.lastname };

    if (verifySSN) {
      return [
        { type: this.verification.type.SSN, value: formData.socialSecurityNumber.slice(5) },
        {
          type: this.verification.type.DOB,
          value: dob,
        },
        firstName,
        lastName,
      ];
    } else {
      return [
        {
          type: this.verification.type.DOB,
          value: dob,
        },
        firstName,
        lastName,
      ];
    }
  };

  getIdentification(formData: IdentificationFormResponse) {
    const identification: Identification[] = [{ key: 'accountNumber', value: formData.accountNumber }];

    if (formData.socialSecurityNumber) {
      const ssnIdentification = { key: 'ssn', value: formData.socialSecurityNumber };
      identification.push(ssnIdentification);
    } else {
      const dobIdentification = { key: 'dob', value: formData.dateOfBirth };
      identification.push(dobIdentification);
    }

    return identification;
  }

  getVerification(formData: IdentificationFormResponse) {
    const verification: Verification[] = [];

    const firstNameVerification = { type: this.verification.type.FIRSTNAME, value: formData.firstName };
    verification.push(firstNameVerification);

    const lastNameVerification = { type: this.verification.type.LASTNAME, value: formData.lastName };
    verification.push(lastNameVerification);

    if (formData.socialSecurityNumber) {
      const ssnVerification = { type: this.verification.type.SSN, value: formData.socialSecurityNumber.slice(5) };
      verification.push(ssnVerification);
    } else {
      const dobVerificaiton = { type: this.verification.type.DOB, value: formData.dateOfBirth };
      verification.push(dobVerificaiton);
    }

    return verification;
  }

  errorType(err) {
    if (
      err.error.message ===
      'A user has already been enrolled with this identification information. Duplicates are not enabled'
    ) {
      this.duplicatedMessage = true;
    } else {
      this.duplicatedMessage = false;
    }
  }
}
