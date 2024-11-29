import { TestBed } from '@angular/core/testing';
import { CardsManagementJourneyBundleModule } from './bundle-cards-management-journey.module';

describe('CardsManagementJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CardsManagementJourneyBundleModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(CardsManagementJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});
