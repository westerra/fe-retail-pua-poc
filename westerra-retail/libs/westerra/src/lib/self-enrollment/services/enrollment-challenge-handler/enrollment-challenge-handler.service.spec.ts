import { TestBed } from '@angular/core/testing';

import { EnrollmentChallengeHandlerService } from './enrollment-challenge-handler.service';

describe('EnrollmentChallengeHandlerService', () => {
  let service: EnrollmentChallengeHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnrollmentChallengeHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
