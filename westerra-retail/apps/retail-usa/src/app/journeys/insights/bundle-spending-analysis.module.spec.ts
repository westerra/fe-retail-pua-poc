import { TestBed } from '@angular/core/testing';
import { SpendingAnalysisBundleModule } from './bundle-spending-analysis.module';

describe('SpendingAnalysisBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SpendingAnalysisBundleModule],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(SpendingAnalysisBundleModule);
    expect(module).toBeTruthy();
  });
});
