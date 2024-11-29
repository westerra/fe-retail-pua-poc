import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FinancialInsightsCommunicationService } from './financial-insights-communication.service';

describe('FinancialInsightsCommunicationService', () => {
  let service: FinancialInsightsCommunicationService;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    service = TestBed.inject(FinancialInsightsCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call navigateToInsightsDashboard', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToInsightsDashboard('/insights-dashboard');
    expect(navigateSpy).toHaveBeenCalledWith(['/insights-dashboard'], Object({ queryParams: undefined }));
  });

  it('should call navigateToViewAllBudgets', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToViewAllBudgets();
    expect(navigateSpy).toHaveBeenCalledWith(['insights-dashboard/budgets']);
  });

  it('should call navigateToCreateBudget', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToCreateBudget('dashboard');
    expect(navigateSpy).toHaveBeenCalledWith(['budgets/create'], { state: { data: 'dashboard' } });
  });

  it('should call navigateToEditBudget', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToEditBudget({ categoryName: 'Travel', id: '12309879', amount: '900' });
    expect(navigateSpy).toHaveBeenCalledWith(
      ['budgets/edit', 'Travel', '12309879', '900'],
      Object({ state: Object({ data: undefined, arrangementIds: undefined, accountsSelected: undefined }) }),
    );
  });

  it('should call navigateToCategoryDetails', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToCategoryDetails({
      categoryName: 'Travel',
      periodStartDate: 19087,
      periodEndDate: 987609,
      arrangementIds: '',
      creditDebitIndicator: 'CRDT',
      accountsSelected: '',
    });
    expect(navigateSpy).toHaveBeenCalledWith([
      'insights-dashboard/budgets/category',
      'Travel',
      19087,
      987609,
      '',
      'CRDT',
      '',
    ]);
  });
});
