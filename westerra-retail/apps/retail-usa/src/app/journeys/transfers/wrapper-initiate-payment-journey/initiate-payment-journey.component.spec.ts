import { KeyboardClickModule } from '@backbase/ui-ang/keyboard-click-directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InitiatePaymentJourneyWrapperComponent } from './initiate-payment-journey.component';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentsCommunicationService } from '@backbase/retail/feature/communication';

describe('InitiatePaymentJourneyWrapperComponent', () => {
  let component: InitiatePaymentJourneyWrapperComponent;
  let fixture: ComponentFixture<InitiatePaymentJourneyWrapperComponent>;

  const routerStub = { navigate: jasmine.createSpy('navigate') };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitiatePaymentJourneyWrapperComponent],
      imports: [RouterTestingModule, KeyboardClickModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                editModeTitle: 'Edit Mode Title',
                modalTitle: 'Modal Title',
              },
            },
          },
        },
        {
          provide: Router,
          useValue: routerStub,
        },
        PaymentsCommunicationService,
      ],
    });
  });

  const initComponent = (editMode: boolean) => {
    TestBed.overrideProvider(PaymentsCommunicationService, {
      useValue: {
        isEditMode: editMode,
      },
    });
    TestBed.compileComponents();
    fixture = TestBed.createComponent(InitiatePaymentJourneyWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  it('should be created', () => {
    initComponent(false);
    expect(component).toBeTruthy();
  });

  it('should show default title', () => {
    initComponent(false);
    expect(component.title).toBe('Modal Title');
  });

  it('should show title from edit mode', () => {
    initComponent(true);
    component.ngOnInit();
    expect(component.title).toBe('Edit Mode Title');
  });
  it('should navigate to scheduled payments on back button click', () => {
    initComponent(true);
    component.ngOnInit();
    const buttonElem = fixture.debugElement.nativeElement.querySelector('[data-role="back-to-payments-button"]');
    buttonElem.click();
    expect(routerStub.navigate).toHaveBeenCalledWith(['transfers', 'activity']);
  });
});
