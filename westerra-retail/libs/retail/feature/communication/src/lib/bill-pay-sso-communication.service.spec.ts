import { BillPaySsoCommunicationService } from './bill-pay-sso-communication.service';
import { OAuthService } from 'angular-oauth2-oidc';

describe('BillPaySsoCommunicationService', () => {
  let service: BillPaySsoCommunicationService;
  const mockOAuthService = jasmine.createSpyObj<OAuthService>('OAuthService', ['refreshToken']);

  beforeEach(() => {
    service = new BillPaySsoCommunicationService(mockOAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call refreshToken', () => {
    service.onPaymentusApiMessageEvent();
    expect(mockOAuthService.refreshToken).toHaveBeenCalled();
  });
});
