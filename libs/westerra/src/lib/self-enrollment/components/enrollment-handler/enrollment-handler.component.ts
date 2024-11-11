import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EMPTY, Subscription, catchError, mergeMap } from 'rxjs';
import { EnrollmentUserData, MemberBackbaseAutoEnrollmentPostRequest, StepModel } from '../../utils/enrollment-models';
import { EnrollmentChallengeHandlerService } from '../../services/enrollment-challenge-handler/enrollment-challenge-handler.service';
import { WesterraEnrollmentDataService } from '../../services/westerra-enrollment-data/westerra-enrollment-data.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SelfEnrollmentUserService, defaultEnrollmentUserData } from '../../../services/westerra-self-enrollment-user';

@Component({
  selector: 'bb-enrollment-handler',
  templateUrl: './enrollment-handler.component.html',
  styleUrls: ['./enrollment-handler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnrollmentHandlerComponent implements OnInit, OnDestroy {
  currentStep: StepModel;
  currentStepSub: Subscription;
  uuid: string;
  isAutoEnrollment: boolean;
  userData: EnrollmentUserData = null;
  dummyUserData = {
    firstName: 'John',
    lastName: 'Doe',
    uuid: '1234',
  };

  isMobileUser: boolean = false;

  constructor(
    private stepsService: EnrollmentChallengeHandlerService,
    protected readonly activatedRoute: ActivatedRoute,
    private service: WesterraEnrollmentDataService,
    private selfService: SelfEnrollmentUserService,
    private _cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.uuid) {
        this.isAutoEnrollment = true;
        this.uuid = params.uuid;
        this.fetchAutoEnrollmentUserDetails();
      } else {
        this.isAutoEnrollment = false;
      }

      this.isMobileUser = params?.source === 'mobile';
    });

    this.currentStepSub = this.stepsService.getCurrentStep().subscribe((step: StepModel) => {
      this.currentStep = step;
    });
  }

  onNextStep() {
    if (!this.stepsService.isLastStep()) {
      this.stepsService.moveToNextStep();
    } else {
      this.onSubmit(this.activatedRoute);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe to avoid memory leaks and unexpected angular errors
    this.currentStepSub.unsubscribe();
  }

  onSubmit(currentRoute: ActivatedRoute): void {
    //this.activatedRoute.navigate(['../complete'], { relativeTo: currentRoute })
  }

  //Previous step
  onStepClick(step: StepModel) {
    this.stepsService.setCurrentStep(step);
  }

  fetchAutoEnrollmentUserDetails() {
    // TO BE REMOVED
    // this.userData = this.dummyUserData;

    this.service
      .getAutoEnrollmentDataUnverified(this.uuid)
      .pipe(
        catchError((err) => {
          return this.handleError(err);
        }),
      )
      .subscribe((res: any) => {
        const metadata = res.metadata;
        this.userData.firstName = metadata?.firstName;
        this.userData.lastName = metadata?.lastName;
        this.userData.uuid = this.uuid;

        const obj = defaultEnrollmentUserData as MemberBackbaseAutoEnrollmentPostRequest;
        const user = Object.assign({}, obj, {
          firstName: this.userData.firstName,
          lastName: this.userData.lastName,
          uuid: this.uuid,
        });
        this.selfService.setAutoEnrollmentUser(user);
      });
  }

  handleError(error: HttpErrorResponse) {
    this._cdr.detectChanges();
    return EMPTY;
  }
}
