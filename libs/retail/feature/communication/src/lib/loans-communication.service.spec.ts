import { TestBed } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { LoansCommunicationService } from './loans-communication.service';

describe('LoansCommunicationService', () => {
  let service: LoansCommunicationService;
  const routerStub = {
    navigate: jasmine.createSpy('navigate'),
  };

  const childRoute = { snapshot: { params: { selectedAccount: '123' } } };
  const activatedRouteStub = {
    snapshot: { params: { ab: 'kkkkk' } },
    firstChild: {
      snapshot: { params: {} },
      firstChild: childRoute,
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: Router,
          useValue: routerStub,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
    });
    service = TestBed.inject(LoansCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('init', () => {
    const setUpData = service.init({
      setupData() {
        return undefined;
      },
    });
    expect(setUpData).toEqual(undefined);
  });

  it('reset', () => {
    service.reset();
    expect(service['paymentData']).toEqual(undefined);
  });

  it('navigateToAccounts should call the navigate method', () => {
    routerStub.navigate.calls.reset();
    service.navigateToAccounts();
    expect(routerStub.navigate).toHaveBeenCalledWith(['my-accounts/list']);
  });

  it('navigateToLoanPayment should call the navigate method', () => {
    routerStub.navigate.calls.reset();
    service.navigateToLoanPayment();
    expect(routerStub.navigate).toHaveBeenCalledWith(['loans-payment'], { relativeTo: childRoute });
  });

  it('navigateToLoanAdvance should call the navigate method', () => {
    routerStub.navigate.calls.reset();
    service.navigateToLoanAdvance();
    expect(routerStub.navigate).toHaveBeenCalledWith(['loans-advance'], { relativeTo: childRoute });
  });
  it('closeEvent should call the correct navigate method', () => {
    routerStub.navigate.calls.reset();
    service.closeEvent();
    expect(routerStub.navigate).toHaveBeenCalledWith(['my-accounts/list']);
  });
});
