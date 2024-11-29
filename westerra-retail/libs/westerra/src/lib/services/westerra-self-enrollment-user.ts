import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  EnrollmentUserData,
  MemberBackbaseAutoEnrollmentPostRequest,
  MemberBackbaseEnrollmentPostRequest,
} from '../self-enrollment/utils/enrollment-models';

interface MemberEnrollmentIdPostRequest {
  identification: Array<object> | any;
  verification: Array<object>;
  entityLookup: {
    ssn: string;
  };
}

interface IdUser extends MemberEnrollmentIdPostRequest {
  identification: Array<object> | any;
  entities: Array<object> | any;
  preferredUsername: string | any;
}

export const defaultEnrollmentUserData = {
  identification: [{}],
  verification: [{}],
  entityLookup: { ssn: '' },
  entities: [{}],
  preferredUsername: '',
};

@Injectable({
  providedIn: 'root',
})
export class SelfEnrollmentUserService {
  private user: BehaviorSubject<IdUser> = new BehaviorSubject({
    identification: [{}],
    verification: [{}],
    entityLookup: { ssn: '' },
    entities: [{}],
    preferredUsername: '',
  });

  private autoEnrollmentUser: BehaviorSubject<MemberBackbaseAutoEnrollmentPostRequest> = new BehaviorSubject({
    identification: [{}],
    verification: [{}],
    entityLookup: { ssn: '' },
    entities: [{}],
    firstName: '',
    lastName: '',
    uuid: null,
    preferredUsername: '',
    accountNumber: '',
    dob: '',
    ssn: '',
  });

  setUser(user: IdUser | any) {
    this.user.next(user);
  }
  getUser(): IdUser {
    return this.user.getValue();
  }

  setAutoEnrollmentUser(user: MemberBackbaseAutoEnrollmentPostRequest | any) {
    this.autoEnrollmentUser.next(user);
  }
  getAutoEnrollmentUser(): MemberBackbaseAutoEnrollmentPostRequest {
    return this.autoEnrollmentUser.getValue();
  }
}
