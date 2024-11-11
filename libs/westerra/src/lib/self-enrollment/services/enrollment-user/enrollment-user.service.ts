import { Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { EnrollmentErrorState, ProvisioningStatusEnum } from '../../utils/enrollment-models';

const initialEnrollmentsBackbasePostRequest = {
  profile: undefined,
  identification: undefined,
  verification: undefined,
  entityLookup: undefined,
  entities: undefined,
  preferredUsername: undefined,
  username: undefined,
  status: undefined,
  metadata: undefined,
};

const initialErrorState: EnrollmentErrorState = {
  isLoading: false,
  type: undefined,
  message: undefined,
  link: undefined,
  linkText: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class EnrollmentUserService {
  // private user: BehaviorSubject<IdUser> = new BehaviorSubject<IdUser>(null);
  private user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private enrollmentStatus: ProvisioningStatusEnum;

  // private enrollmentInformation: BehaviorSubject<IdUser> = new BehaviorSubject<IdUser>(
  //     initialEnrollmentsBackbasePostRequest
  // );
  private enrollmentInformation: BehaviorSubject<any> = new BehaviorSubject<any>(initialEnrollmentsBackbasePostRequest);

  enrollmentInformation$ = this.enrollmentInformation.asObservable();

  //   private errorState: BehaviorSubject<EnrollmentErrorState> = new BehaviorSubject(Object.assign({}, initialErrorState));
  // errorState$ = this.errorState.asObservable();

  private readonly errorStatus$$ = new Subject<EnrollmentErrorState>();
  readonly errorStatus$: Observable<EnrollmentErrorState> = this.errorStatus$$.asObservable();

  private identificationAttempts = 0;
  getIdentificationAttempts() {
    return this.identificationAttempts;
  }

  incrementIdentificationAttempts() {
    this.identificationAttempts++;
  }

  // setUser(user: IdUser) {
  //     this.user.next(user);
  // }
  // getUser(): IdUser {
  //     return this.user.getValue();
  // }

  setUser(user: any) {
    this.user.next(user);
  }
  getUser(): any {
    return this.user.getValue();
  }

  setStatus(status: ProvisioningStatusEnum) {
    this.enrollmentStatus = status;
  }

  getStatus() {
    return this.enrollmentStatus;
  }

  handleError(response: any) {
    const error = response?.error;
    const message = error?.message ?? response?.message;
    this.setStatus(ProvisioningStatusEnum.FAILED);
    this.errorStatus$$.next({ type: 'error', message: `${message}`, isLoading: false });

    return EMPTY;
  }

  clearError() {
    this.errorStatus$$.next(initialErrorState);
  }

  // setEnrollmentInformation(enrollmentInformation: Partial<IdUser>) {
  //     const currentValue = this.enrollmentInformation.getValue();
  //     const nextValue = Object.assign(currentValue, enrollmentInformation);

  //     this.enrollmentInformation.next(nextValue);
  // }

  setEnrollmentInformation(enrollmentInformation: Partial<any>) {
    const currentValue = this.enrollmentInformation.getValue();
    const nextValue = Object.assign(currentValue, enrollmentInformation);

    this.enrollmentInformation.next(nextValue);
  }
}
