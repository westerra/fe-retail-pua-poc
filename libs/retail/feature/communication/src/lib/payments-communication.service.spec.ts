import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InitiatePaymentJourneyComponentApi } from '@backbase/initiate-payment-journey-ang';
import { PaymentsCommunicationService } from './payments-communication.service';

describe('PaymentCommunicationService', () => {
  let service: PaymentsCommunicationService;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    router = TestBed.inject(Router);
    service = TestBed.inject(PaymentsCommunicationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('init', () => {
    const api: InitiatePaymentJourneyComponentApi = {
      setupData() {
        return undefined;
      },
    };
    const setupDataSpy = spyOn(api, 'setupData');
    service.init(api);
    expect(setupDataSpy).toHaveBeenCalledWith(service['paymentData']);
  });

  it('closeEvent', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.closeEvent();
    service['navigateToScheduledTransfers']();
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'activity']);
  });

  it('headerNavigationAction', () => {
    expect(typeof service.headerNavigationAction).toBe('function');
  });

  it('getPaymentRoute', () => {
    const bankTransfer = service['getPaymentRoute']('INTRABANK_TRANSFER');
    expect(bankTransfer).toEqual('money-to-member');

    const p2pTransfer = service['getPaymentRoute']('P2P_TRANSFER');
    expect(p2pTransfer).toEqual('money-to-someone');

    const defaultTransfer = service['getPaymentRoute']('');
    expect(defaultTransfer).toEqual('make-a-transfer');
  });

  it('reset', () => {
    service.reset();
    expect(service.isEditMode).toEqual(false);
    expect(service['paymentData']).toEqual(undefined);
  });

  it('should validate parameter for navigateToEditPayment', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const getPaymentRouteSpy = spyOn(service, <never>'getPaymentRoute').and.callThrough();
    service.navigateToEditPayment(null);
    expect(service.isEditMode).toEqual(undefined);
    expect(service.navigateToEditPayment(undefined)).toBe(undefined);
    expect(navigateSpy).not.toHaveBeenCalled();

    service.navigateToEditPayment({ status: null, version: 1, id: '12' });
    expect(getPaymentRouteSpy).toHaveBeenCalled();
    expect(service.isEditMode).toEqual(true);
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'make-a-transfer']);
  });

  it('should navigate to make-a-transfer for Internal Transfer', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToEditPayment({ paymentType: 'EXTERNAL_A2A', status: null, version: 1, id: '12' });
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'make-a-transfer']);
  });

  it('should navigate to money-to-member for Intrabank transfer', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToEditPayment({
      paymentType: 'INTRABANK_TRANSFER',
      status: null,
      version: 1,
      id: '12',
    });
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'money-to-member']);
  });

  it('should navigate to money-to-someone for External Transfer', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToEditPayment({ paymentType: 'P2P_TRANSFER', status: null, version: 1, id: '12' });
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'money-to-someone']);
  });

  it('should navigateToMakeTransfer', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.navigateToMakeTransfer('1');
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'make-a-transfer', { transferFrom: '1' }]);
  });

  it('should navigate to activity on closeEvent', () => {
    const navigateSpy = spyOn(router, 'navigate');
    service.closeEvent();
    expect(navigateSpy).toHaveBeenCalledWith(['transfers', 'activity']);
  });
});
