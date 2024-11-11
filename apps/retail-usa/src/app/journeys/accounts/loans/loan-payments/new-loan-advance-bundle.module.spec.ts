import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { InitiatePaymentConfig, ReviewScreens } from '@backbase/initiate-payment-journey-ang';
import { NewLoansAdvanceJourneyBundleModule } from './new-loan-advance-bundle.module';
import { RETAIL_LOANS_ADVANCE } from '@backbase/retail-loans-journey-ang';
import { destroyHook, INITIATE_LOANS_PAYMENT_CONFIG } from '@backbase/initiate-loans-payment-journey';

describe('NewLoansAdvanceJourneyBundleModule', () => {
  let module: NewLoansAdvanceJourneyBundleModule;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, NewLoansAdvanceJourneyBundleModule],
    });

    module = TestBed.inject(NewLoansAdvanceJourneyBundleModule);
  });

  it('initializes', () => {
    expect(module).toBeTruthy();
  });

  it('should inject correct payment configs with INITIATE_PAYMENT_CONFIG', inject(
    [INITIATE_LOANS_PAYMENT_CONFIG],
    (injectService: InitiatePaymentConfig) => {
      expect(injectService.paymentTypes).toEqual([RETAIL_LOANS_ADVANCE], 'paymentTypes');
      expect(injectService.businessFunctions).toEqual([RETAIL_LOANS_ADVANCE.businessFunction], 'businessFunctions');
      expect(injectService.options.reviewScreenType).toEqual(ReviewScreens.ADAPTED, 'reviewScreenType');
      expect(injectService.options.header({} as any)).toEqual('', '');
      expect(injectService.hooks).toEqual(
        {
          onDestroy: destroyHook,
        },
        'hooks',
      );
    },
  ));
});
