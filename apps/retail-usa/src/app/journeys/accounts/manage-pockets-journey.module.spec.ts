import { TestBed } from '@angular/core/testing';
import { ManagePocketsJourneyBundleModule } from './manage-pockets-journey.module';

describe('ManagePocketsJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ManagePocketsJourneyBundleModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(ManagePocketsJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});
