import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Validators, FormBuilder, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ErrorState } from '@backbase/retail-loans-journey-ang';
import { EMPTY, Subject, catchError, merge, pluck, takeUntil } from 'rxjs';
import {
  EnrollmentErrorMessage,
  EnrollmentUserData,
  IdentificationFormResponse,
  MemberBackbaseAutoEnrollmentPostRequest,
  MemberBackbaseEnrollmentPostRequest,
  MemberBackbaseEnrollmentPostResponse,
} from '../../utils/enrollment-models';
import { SelfEnrollmentUserService } from '../../../services/westerra-self-enrollment-user';
import { WesterraEnrollmentDataService } from '../../services/westerra-enrollment-data/westerra-enrollment-data.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

interface InputTextComponentEl {
  elem: ElementRef;
  inputEl: ElementRef;
}

const ErrorCode = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  Internal: 500,
};

@Component({
  selector: 'bb-identification-view',
  templateUrl: './identification-view.component.html',
  styleUrls: ['./identification-view.component.scss'],
})
export class IdentificationViewComponent implements OnInit {
  @Input() accountNumberMaxLength = 10;
  @Input() errorStatus!: ErrorState;
  @Input() attempts = 0;
  @Input() duplicatedMessage!: boolean;
  @Input() isAutoEnrollment = false;
  @Input() userData: EnrollmentUserData = null;
  @Output() next: EventEmitter<any> = new EventEmitter<IdentificationFormResponse | any>();
  @Output() navigateToLogin: EventEmitter<any> = new EventEmitter();

  public isAutoIdentification = false;

  public progressSteps = [];
  public selfProgressSteps = [
    {
      description: 'Identification',
      status: 'active',
    },
    {
      description: 'Create Account',
      status: 'pending',
    },
  ];

  public autoProgressSteps1 = [
    {
      description: 'Identification',
      status: 'active',
    },
    {
      description: 'Verification',
      status: 'pending',
    },
    {
      description: 'Create Account',
      status: 'pending',
    },
  ];

  public autoProgressSteps2 = [
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
      status: 'pending',
    },
  ];

  public sampleErrorMessages = EnrollmentErrorMessage;

  nav = 'select';
  today = new Date();
  dayArray: Array<string> = [];
  yearArray: Array<string> = [];
  errorLinkStyling = 'text-decoration: underline; color: #fff';
  errorMsg: string | null = null;
  error?: number;
  isIdentifying = false;
  dobOptions = {
    month: [
      { label: 'Jan', value: '01' },
      { label: 'Feb', value: '02' },
      { label: 'Mar', value: '03' },
      { label: 'Apr', value: '04' },
      { label: 'May', value: '05' },
      { label: 'Jun', value: '06' },
      { label: 'Jul', value: '07' },
      { label: 'Aug', value: '08' },
      { label: 'Sep', value: '09' },
      { label: 'Oct', value: '10' },
      { label: 'Nov', value: '11' },
      { label: 'Dec', value: '12' },
    ],
    day: [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
      '27',
      '28',
      '29',
      '30',
      '31',
    ],
  };

  personalInfoForm = this.fb.group({
    entityId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3)])],
    ssn: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9)])],
    month: ['', Validators.compose([Validators.required])],
    day: ['', Validators.compose([Validators.required])],
    year: ['', Validators.compose([Validators.required])],
  });

  autoPersonalInfoForm = this.fb.group({
    // entityId: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(3)])],
    ssn: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9)])],
  });

  autoVerificationForm = this.fb.group({
    ssn: ['', Validators.compose([Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9)])],
    account: ['', Validators.required],
    dob: ['', Validators.required],
  });

  personalInfoObject: any = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private service: WesterraEnrollmentDataService,
    private userService: SelfEnrollmentUserService,
  ) {}

  ngOnInit() {
    if (!this.isAutoEnrollment) {
      this.progressSteps = this.selfProgressSteps;
    } else {
      if (this.autoPersonalInfoForm.get('ssn').value && this.autoPersonalInfoForm.get('ssn').value !== '') {
        this.isAutoIdentification = false;
        this.progressSteps = this.autoProgressSteps2;
      } else {
        this.isAutoIdentification = true;
        this.progressSteps = this.autoProgressSteps1;
      }
    }
    this.onChanges();
    this.getYearsArray();
  }

  getYearsArray() {
    for (let i = this.today.getFullYear(); i >= this.today.getFullYear() - 120; i--) {
      const year = i.toString();
      this.yearArray.push(year);
    }
  }

  getMonth() {
    return this.personalInfoForm.value.month.label;
  }

  onChanges(): void {
    this.personalInfoForm.valueChanges.subscribe((val) => {
      const formattedDob = `${val.year}-${val.month.value}-${val.day}T00:00:00`;

      switch (this.getMonth()) {
        case 'Feb':
          this.dayArray = this.dobOptions.day.slice(0, 29);
          break;
        case 'Apr':
        case 'Jun':
        case 'Sep':
        case 'Nov':
          this.dayArray = this.dobOptions.day.slice(0, 30);
          break;
        default:
          this.dayArray = this.dobOptions.day;
      }

      Object.assign(this.personalInfoObject, {
        identification: [{ key: 'accountNumber', value: val.entityId }],
        verification: [
          { type: 'SSN', value: val.ssn.slice(5) },
          {
            type: 'DOB',
            value: formattedDob,
          },
        ],
        entityLookup: { ssn: val.ssn },
      });
    });
  }

  isFieldValid(fieldName: string) {
    const control = this.getControl(fieldName);
    return control && (control.valid || control.untouched);
  }

  private getControl(fieldName: string) {
    if (this.isAutoEnrollment) {
      if (this.isAutoIdentification) {
        return this.autoPersonalInfoForm?.controls[fieldName];
      } else {
        return this.autoVerificationForm?.controls[fieldName];
      }
    } else {
      return this.personalInfoForm?.controls[fieldName];
    }

    // return this.personalInfoForm?.controls[fieldName];
  }

  hasError(field: string, type: string) {
    const fieldControl = this.getControl(field);
    if (!fieldControl || !fieldControl.errors) {
      return;
    }
    return fieldControl.errors[type];
  }

  hasPatternError(field: string) {
    const fieldControl = this.getControl(field);
    if (!fieldControl || !fieldControl.errors) {
      return;
    }
    return fieldControl.errors.pattern;
  }

  hasLengthError(field: string) {
    const fieldControl = this.getControl(field);
    if (!fieldControl || !fieldControl.errors) {
      return;
    }
    return fieldControl.errors.minlength;
  }
  hasRequiredError(field: string) {
    const fieldControl = this.getControl(field);
    if (!fieldControl || !fieldControl.errors) {
      return;
    }
    return fieldControl.errors.required;
  }

  get isNotIdentified() {
    return (
      this.error === ErrorCode.NotFound || this.error === ErrorCode.BadRequest || this.error === ErrorCode.Forbidden
    );
  }
  get badData() {
    return this.errorMsg === 'SSN does not match' || this.errorMsg === 'DOB does not match';
  }
  get duplicateUser() {
    return (
      this.errorMsg ===
      'A user has already been enrolled with this identification information. Duplicates are not enabled'
    );
  }
  get notInvited() {
    return this.errorMsg === 'Enrollment is not supported until invited';
  }
  get isLockedOut() {
    return false;
  }
  get isSystemErrorOccurred(): boolean {
    return this.error === ErrorCode.Internal;
  }

  onCancel() {
    this.navigateToLogin.emit();
  }

  handleError(error: HttpErrorResponse | any) {
    this.error = error.status;
    this.errorMsg = error.error.message || error.message || null;
    this.isIdentifying = false;
    this.cdr.detectChanges();
    return EMPTY;
  }

  submit() {
    this.errorMsg = null;
    this.isIdentifying = true;

    if (this.isAutoEnrollment) {
      if (this.isAutoIdentification) {
        if (this.autoPersonalInfoForm.valid) {
          const ssn = this.autoPersonalInfoForm.get('ssn');

          if (ssn && ssn.value) {
            const ssnValue = ssn.value;

            // TO BE REMOVED
            // let data = {
            //   metadata: {
            //     firstName: this.userData.firstName,
            //     lastName: this.userData.lastName,
            //     dob: new Date().toISOString(),
            //     accountNumber: '123-12412-1212',
            //   },
            // };
            // this.prepareAutoEnrollmentForm(data);

            // TO BE UNCOMMENTED
            this.service
              .getAutoEnrollmentDataVerified(this.userData.uuid, ssnValue)
              .pipe(
                catchError((err) => {
                  const error = err.error;
                  this.errorMsg = this.sampleErrorMessages.default;
                  this.cdr.detectChanges();
                  return EMPTY;
                }),
                pluck('body'),
              )
              .subscribe((response: any) => {
                this.prepareAutoEnrollmentForm(response);
              });
          }
        } else {
          console.log(this.autoPersonalInfoForm.hasError);
        }
      } else {
        if (this.autoVerificationForm.valid) {
          const account = this.autoVerificationForm.get('account').value;
          const dob = this.autoVerificationForm.get('dob').value;
          const ssn = this.autoVerificationForm.get('ssn').value;

          if (account && dob && ssn) {
            const savedUser = this.userService.getAutoEnrollmentUser();
            savedUser.accountNumber = account;
            savedUser.dob = dob;
            savedUser.ssn = ssn;
            savedUser.firstName = this.userData.firstName;
            savedUser.lastName = this.userData.lastName;
            Object.assign(savedUser, {
              identification: [{ key: 'accountNumber', value: account }],
              verification: [
                { type: 'SSN', value: ssn.slice(5) },
                {
                  type: 'DOB',
                  value: dob,
                },
              ],
              entityLookup: { ssn: ssn },
            });

            const obj = savedUser as MemberBackbaseAutoEnrollmentPostRequest;
            const user = Object.assign({}, obj, { preferredUsername: this.userData.preferredUsername });
            this.userService.setAutoEnrollmentUser(user);
            this.isIdentifying = false;
            this.next.emit();
          }
        } else {
          console.log(this.autoVerificationForm.hasError);
        }
      }
    } else {
      if (this.personalInfoObject['identification'] !== undefined) {
        this.personalInfoObject['identification'][0].value = parseInt(
          this.personalInfoObject['identification'][0].value,
        );
        this.personalInfoObject['identification'][0].value = JSON.stringify(
          this.personalInfoObject['identification'][0].value,
        );
      }
      const obj = this.personalInfoObject as MemberBackbaseEnrollmentPostRequest;

      this.service
        .postEnrollmentsBackbaseRecord(obj)
        .pipe(catchError((err) => this.handleError(err)))
        .subscribe((response: HttpResponse<MemberBackbaseEnrollmentPostResponse | any>) => {
          const res = response.body;
          const user = Object.assign({}, obj, { preferredUsername: res.preferredUsername }, { entities: res.entities });
          this.userService.setUser(user);
          this.isIdentifying = false;
          this.next.emit();
        });
    }
  }

  prepareAutoEnrollmentForm(response: any) {
    const metadata = response.metadata;
    this.userData.firstName = metadata.firstName;
    this.userData.lastName = metadata.lastName;
    const dob = metadata.dob;
    const accountNumber = metadata.accountNumber;
    if (metadata && metadata.DOB) {
      const dob = metadata.DOB.split('T')[0].concat('T00:00:00');
    } else {
      const dob = metadata.dob.split('T')[0].concat('T00:00:00');
    }

    this.cdr.detectChanges();

    if (dob) {
      this.userData.preferredUsername = response.username;
      this.userData.ssn = this.autoPersonalInfoForm.get('ssn').value;

      this.autoVerificationForm.get('ssn')?.setValue(this.userData.ssn);
      this.autoVerificationForm.get('ssn')?.setErrors(null);
      this.autoVerificationForm.get('account')?.setValue(accountNumber);
      this.autoVerificationForm.get('dob')?.setValue(dob);
      this.autoVerificationForm.get('dob')?.setErrors(null);
      this.autoVerificationForm.get('dob')?.setErrors({ incorrect: false });

      this.isAutoIdentification = false;
      this.progressSteps = this.autoProgressSteps2;
      this.isIdentifying = false;

      this.cdr.detectChanges();
    }
  }
}
