import { TestBed } from '@angular/core/testing';
import { TurnoversJourneyBundleModule } from './bundle-turnovers.module';

describe('TurnoversJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TurnoversJourneyBundleModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(TurnoversJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});
