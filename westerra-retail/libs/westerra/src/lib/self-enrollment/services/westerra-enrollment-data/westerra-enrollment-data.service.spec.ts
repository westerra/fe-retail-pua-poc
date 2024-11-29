import { TestBed } from '@angular/core/testing';

import { WesterraEnrollmentDataService } from './westerra-enrollment-data.service';

describe('WesterraEnrollmentDataService', () => {
  let service: WesterraEnrollmentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WesterraEnrollmentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
