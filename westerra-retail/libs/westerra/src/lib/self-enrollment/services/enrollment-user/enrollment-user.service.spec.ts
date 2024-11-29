import { TestBed } from '@angular/core/testing';

import { EnrollmentUserService } from './enrollment-user.service';

describe('EnrollmentUserService', () => {
  let service: EnrollmentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
