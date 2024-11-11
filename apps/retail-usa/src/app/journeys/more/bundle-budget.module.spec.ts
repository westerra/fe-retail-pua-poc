import { TestBed } from '@angular/core/testing';
import { BudgetJourneyModule } from '@backbase/budget-journey-ang';
import { BudgetConfigProvider, BudgetJourneyBundleModule } from './bundle-budget.module';

describe('BudgetJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BudgetJourneyBundleModule,
        BudgetJourneyModule.forRoot({
          route: {},
        }),
      ],
      providers: [BudgetConfigProvider],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(BudgetJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});
