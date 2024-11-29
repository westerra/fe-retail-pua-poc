import { Injectable } from '@angular/core';
import { BillPaySsoCommunicationService as BillPaySSOCommunicationServiceAPI } from '@backbase/billpay-sso-journey-ang';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class BillPaySsoCommunicationService implements BillPaySSOCommunicationServiceAPI {
  constructor(private readonly oAuthService: OAuthService) {}

  /**
   * Method triggered whenever the Bill Pay SSO journey receives message event `paymentusApiCall` from external vendor Paymentus,
   * while the user performing some productivity actions (which web app not aware) inside the Bill Pay SSO Iframe.
   */
  onPaymentusApiMessageEvent(): void {
    /**
     * Extending session based on Apps session management configuration
     */
    this.oAuthService.refreshToken();
  }
}
