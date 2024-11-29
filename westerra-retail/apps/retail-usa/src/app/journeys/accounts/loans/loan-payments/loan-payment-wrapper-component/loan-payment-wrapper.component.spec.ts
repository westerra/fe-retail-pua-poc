import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LoanPaymentJourneyWrapperComponent } from './loan-payment-wrapper.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('LoanPaymentJourneyWrapperComponent', () => {
  let fixture: ComponentFixture<LoanPaymentJourneyWrapperComponent>;
  let component: LoanPaymentJourneyWrapperComponent;

  const activatedRouteStub = {
    firstChild: { data: of({ pageTitle: 'Loan Payment' }) },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoanPaymentJourneyWrapperComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
    });

    fixture = TestBed.createComponent(LoanPaymentJourneyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });
  it('header should be -Loan Payment-', () => {
    const elem = fixture.nativeElement.querySelector('[data-role="loan-payment-journey-header"] h1');
    expect(elem.textContent).toBe('Loan Payment');
  });
});
