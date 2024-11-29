import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  EnrollmentUserData,
  IdUser,
  MemberBackbaseAutoEnrollmentPostResponse,
  MemberBackbaseEnrollmentPostRequest,
  MemberBackbaseEnrollmentPutRequest,
  SelfEnrollmentErrorState,
  SelfEnrollmentUsernamePasswordForm,
} from '../../utils/enrollment-models';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { termsAndConditions } from '../../utils/terms-and-conditions';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { EMPTY, catchError, mergeMap } from 'rxjs';
import { SelfEnrollmentUserService } from '../../../services/westerra-self-enrollment-user';
import { WesterraEnrollmentDataService } from '../../services/westerra-enrollment-data/westerra-enrollment-data.service';

@Component({
  selector: 'bb-create-username-view',
  templateUrl: './create-username-view.component.html',
  styleUrls: ['./create-username-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateUsernameViewComponent implements OnInit {
  @Input() errorStatus!: SelfEnrollmentErrorState;
  @Input() isLoading!: boolean;
  @Input() isAutoEnrollment = false;
  @Input() userData: EnrollmentUserData = null;
  @Input() data!: IdUser;
  @Output() continue: EventEmitter<any> = new EventEmitter<SelfEnrollmentUsernamePasswordForm | any>();
  @Output() readonly navigateToLogin = new EventEmitter();

  user: IdUser = this.userService.getUser();
  autoEnrolledUser: any = this.userService.getAutoEnrollmentUser();
  errorTitle = 'Unfortunately we could not create a new account for you';
  errorMsg: string | null = null;
  attempts = 0;
  attemptsTitle = 'Call Us at (518) 445-2730';
  attemptsMsg = 'Or email us at help@westerracu.com';
  isCreating = false;
  minUsernameLength = 6;
  passwordsMatch = false;
  minPasswordLength = 9;
  selectedEntities: Array<string> = [];

  public isSubmitted = false;
  createAccountForm: FormGroup | undefined;
  createAccountObject: MemberBackbaseEnrollmentPutRequest | any = {
    userName: this.isAutoEnrollment ? this.autoEnrolledUser?.preferredUsername : this.user.preferredUsername || '',
    password: '',
    ssn: '',
    serviceAgreementType: 'JOINT_ONLY',
    jointServiceAgreementType: 'PERSONAL_BUSINESS',
    acceptTerms: false,
  };
  personalInfoObject = {};

  public progressSteps = [];

  public selfProgressSteps = [
    {
      description: 'Identification',
      status: 'active',
    },
    {
      description: 'Create Account',
      status: 'active',
    },
  ];

  public autoProgressSteps = [
    {
      description: 'Identification',
      status: 'active',
    },
    {
      description: 'Verification',
      status: 'active',
    },
    {
      description: 'Create Account',
      status: 'active',
    },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private userService: SelfEnrollmentUserService,
    private service: WesterraEnrollmentDataService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    if (!this.isAutoEnrollment) {
      this.progressSteps = this.selfProgressSteps;
    } else {
      this.progressSteps = this.autoProgressSteps;
    }

    const termsAndConditionsDiv = document.getElementById('terms-and-conditions');
    termsAndConditionsDiv.innerHTML = termsAndConditions;

    this.createAccountForm = this.formBuilder.group({
      username: [
        this.createAccountObject.userName,
        Validators.compose([
          Validators.required,
          Validators.minLength(this.minUsernameLength),
          Validators.pattern(/^(?=[a-zA-Z0-9!*$@_.-]*$)(?!.*[~#^()+={}|\\,<>'"\\/;`%?: ]).{6,30}$/),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(this.minPasswordLength),
          Validators.pattern('^(?=.{9,})(?=.*[a-z])(?=.*[A-Z])(?=.*[{}()<>~@#$^*+=|,\';"`%?!:_.-]).*$'),
        ]),
      ],
      passwordRepeat: ['', Validators.compose([Validators.required, this.checkPasswordsAreEqual()])],
      email: [''],
      entityType: [''],
      entities: [''],
      acceptTerms: [null, [Validators.required]],
    });

    Object.assign(
      this.createAccountObject,
      { identification: this.user.identification },
      { verification: this.user.verification },
      { serviceAgreementType: 'JOINT_ONLY' },
    );

    if (this.user && this.user.entities) {
      const obj = this.user.entities;
      if (obj && obj.entities) {
        obj.entities.map((item: any) => {
          this.selectedEntities.push(item.entityId);
        });
      } else {
        obj.map((item: any) => {
          this.selectedEntities.push(item.entityId);
        });
      }
    } else if (this.autoEnrolledUser && this.autoEnrolledUser.entities) {
      const obj = this.autoEnrolledUser.entities;
      if (obj && obj.entities) {
        obj.entities.map((item: any) => {
          this.selectedEntities.push(item.entityId);
        });
      } else {
        obj.map((item: any) => {
          this.selectedEntities.push(item.entityId);
        });
      }
    }

    this.onChanges();
  }

  onChanges(): void {
    this.createAccountForm.valueChanges.subscribe((val) => {
      val.password === val.passwordRepeat ? (this.passwordsMatch = true) : (this.passwordsMatch = false);
      Object.assign(this.createAccountObject, {
        profile: { emailAddress: val.email.trim() },
        username: val.username.trim(),
        password: val.password.trim(),
        entities: this.selectedEntities,
      });

      this.cdr.detectChanges();
    });
  }

  onCancel() {
    this.navigateToLogin.emit();
  }

  ConfirmedValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  checkPasswordsAreEqual(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = this.createAccountForm?.controls['password'];
      const passwordRepeat = this.createAccountForm?.controls['passwordRepeat'];
      if (passwordRepeat?.errors && !passwordRepeat?.errors.confirmedValidator) {
        return null;
      }

      return password?.value !== passwordRepeat?.value ? { confirmedValidator: true } : null;
    };
  }

  private getControl(fieldName: string) {
    return this.createAccountForm?.controls[fieldName];
  }

  hasLengthError(field: string) {
    const fieldControl = this.getControl(field);
    if (!fieldControl || !fieldControl.errors) {
      return;
    }
    return fieldControl.value ? fieldControl.errors.minlength : true;
  }
  hasLowerCaseLetter() {
    return /[a-z]/.test(this.createAccountForm.value.password);
  }
  hasUpperCaseLetter() {
    return /[A-Z]/.test(this.createAccountForm.value.password);
  }
  hasNumber() {
    return /[0-9]/.test(this.createAccountForm.value.password);
  }
  hasSpecialChar() {
    return /[{}()<>~@#$^*+=|,';"`%?!:_.-]/.test(this.createAccountForm.value.password);
  }

  handleError(error: HttpErrorResponse | any) {
    this.attempts++;
    this.errorMsg = error.error.message || 'Error.';
    this.isCreating = false;
    window.scroll(0, 0);
    this.cdr.detectChanges();
    return EMPTY;
  }

  submit() {
    this.errorMsg = null;
    this.isCreating = true;

    this.isSubmitted = true;

    if (this.isAutoEnrollment) {
      Object.assign(this.personalInfoObject, {
        identification: [{ key: 'accountNumber', value: this.autoEnrolledUser.accountNumber }],
        verification: [
          { type: 'SSN', value: this.autoEnrolledUser.ssn.slice(5) },
          {
            type: 'DOB',
            value: this.autoEnrolledUser.dob,
          },
        ],
        entityLookup: { ssn: this.autoEnrolledUser.ssn },
      });
      const obj = this.personalInfoObject as MemberBackbaseEnrollmentPostRequest;

      this.service
        .postEnrollmentsBackbaseRecord(obj)
        .pipe(
          catchError((err) => this.handleError(err)),
          mergeMap((response: HttpResponse<MemberBackbaseAutoEnrollmentPostResponse>) => {
            const entities = response.body;
            const user: any = Object.assign({}, obj, { entities: entities });
            Object.assign(
              this.createAccountObject,
              { identification: user.identification },
              { verification: user.verification },
              { serviceAgreementType: 'JOINT_ONLY' },
            );

            if (user && user.entities) {
              const obj = user.entities;
              obj.entities.map((item: any) => {
                this.selectedEntities.push(item.entityId);
              });
            }

            this.createAccountObject.ssn = this.autoEnrolledUser.ssn;
            this.createAccountObject.userName = this.createAccountObject.username;
            delete this.createAccountObject.acceptTerms;

            return this.service.putEnrollmentsBackbaseRecord(this.createAccountObject);
          }),
        )
        .subscribe((response: any) => {
          window.scroll(0, 0);
          this.isCreating = false;
          this.continue.emit();
        });
    } else {
      this.service
        .putEnrollmentsBackbaseRecord(this.createAccountObject)
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe((res) => {
          window.scroll(0, 0);
          this.isCreating = false;
          this.continue.emit();
        });
    }
  }
}
