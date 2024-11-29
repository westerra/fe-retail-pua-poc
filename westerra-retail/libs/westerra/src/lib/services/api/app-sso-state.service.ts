import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ServiceDataHttpConfig } from '@backbase/foundation-ang/data-http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ErrorState, WESTERRA_SSO_DATA_CONFIG } from './api.models';
import { FormGroup } from '@angular/forms';

export enum SSO {
  harland = 'harland',
  dmi = 'dmi',
  amplify = 'amplify',
}

const initialErrorState: ErrorState = {
  error: undefined,
  isLoading: true,
};

export interface Link {
  id: string;
  title: any;
  route: any[];
  icon: any;
  description: any;
  dashboard: boolean;
  profile: boolean;
  externalLink: boolean;
  notInNavigation: boolean;
  defaultpage: boolean;
  ssoAppName: string;
  redirectUrl: string;
  children: Link[];
  expandable: boolean;
  nonav: boolean;
  featureFlag: string;
  permissions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AppSsoStateService {
  dmiURL =
    location.href.match(/dev/) || location.href.match(/sit/) || location.href.match(/uat/)
      ? 'https://mtgsvc.tv/'
      : 'https://mtgsvc.com/';
  dmiURLLogin =
    location.href.match(/dev/) || location.href.match(/sit/) || location.href.match(/uat/)
      ? 'https://mtgsvc.tv/SSO/SSOLogin.aspx'
      : 'https://mtgsvc.com/SSO/SSOLogin.aspx';
  // dmiURLForMakePayment = ((location.href.match(/dev/)) || (location.href.match(/sit/)) || (location.href.match(/uat/))) ? 'https://mtgsvc.tv/PaymentSilver/Index' : 'https://mtgsvc.com/PaymentSilver/Index';
  dmiURLForMakePayment =
    location.href.match(/dev/) || location.href.match(/sit/) || location.href.match(/uat/)
      ? 'https://mtgsvc.tv/SSO/X61Login.aspx'
      : 'https://mtgsvc.com/SSO/X61Login.aspx';

  sso = SSO;

  defaulEnrollCashbackMsg = `https://www.dreampoints.com/westerra/`;

  private errorState: BehaviorSubject<ErrorState> = new BehaviorSubject(Object.assign({}, initialErrorState));
  errorState$ = this.errorState.asObservable();

  private errorStatePaymentOrder: BehaviorSubject<ErrorState> = new BehaviorSubject(
    Object.assign({}, initialErrorState),
  );
  errorStatePaymentOrder$ = this.errorStatePaymentOrder.asObservable();

  makePaymentForm: BehaviorSubject<FormGroup | any> = new BehaviorSubject(null);

  private accountOnDisplay: BehaviorSubject<any> = new BehaviorSubject(null);
  accountOnDisplay$ = this.accountOnDisplay.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(WESTERRA_SSO_DATA_CONFIG)
    private readonly config: ServiceDataHttpConfig,
    private sanitizer: DomSanitizer,
  ) {}

  getSessionState(internalaccountid: string, ssoAppName: string, programType?: string) {
    let url = '';
    if (ssoAppName === this.sso.harland) {
      url = `${this.config.apiRoot}/sso/client-api/v1/applications?name=${ssoAppName}&internalArrangementId=${internalaccountid}`;
    } else if (ssoAppName === this.sso.amplify) {
      if (programType) {
        url = `${this.config.apiRoot}/sso/client-api/v1/applications?name=${ssoAppName}&program=${programType}`;
      } else {
        url = `${this.config.apiRoot}/sso/client-api/v1/applications?name=${ssoAppName}`;
      }
    } else if (ssoAppName === this.sso.dmi) {
      url = `${this.config.apiRoot}/sso/client-api/v1/applications?name=${ssoAppName}&internalArrangementId=${internalaccountid}`;
    }

    return this.http.get<any>(url);
  }

  postDMI(key: string) {
    return this.http.post<any>(this.dmiURLLogin, { KEY: key });
  }

  getProfile() {
    const url = `${this.config.apiRoot}/user-manager/client-api/v2/users/me/profile`;

    return this.http.get<any>(url);
  }

  navigateToExternalLink(ssoAppName: string, redirectUrl: any) {
    // let domain = window.location.href;
    // let url = `${window.location.href}?redirectUrl=${encodeURIComponent(`${redirectUrl}`)}`;
    // debugger;
    this.router.navigate(['/accounts/my-accounts'], { skipLocationChange: true });
    window.open(redirectUrl, 'popup');
  }

  setState(updatedValues: Partial<ErrorState>) {
    const currentValue = this.errorState.getValue();
    const nextValue = Object.assign(currentValue, updatedValues);

    this.errorState.next(nextValue);
  }

  setStatePaymentOrder(updatedValues: Partial<ErrorState>) {
    const currentValue = this.errorStatePaymentOrder.getValue();
    const nextValue = Object.assign(currentValue, updatedValues);

    this.errorStatePaymentOrder.next(nextValue);
  }

  handleError(response: any) {
    const error = response.error;
    const message = error && error.message ? error.message : response.message;
    this.setState({ error: { type: 'error', message: `Error: ${message}` }, isLoading: false });
    this.router.navigateByUrl('/accounts/my-accounts');
  }

  handleErrorAmplify(response: any) {
    const error = response.error;
    const message = error && error.message ? error.message : response.message;
    this.setState({
      error: {
        type: 'error',
        message: `${message}. Please enroll in the Rewards program`,
        link: `${this.defaulEnrollCashbackMsg}`,
        linkText: 'Sign In',
      },
      isLoading: false,
    });
    this.router.navigateByUrl('/accounts/my-accounts');
  }

  clearState() {
    this.setState(Object.assign({}, initialErrorState));
    this.setStatePaymentOrder(Object.assign({}, initialErrorState));
  }

  setMakePaymentFormValue(formValue) {
    this.makePaymentForm.next(formValue);
  }

  getMakePaymentFormValue() {
    return this.makePaymentForm.getValue();
  }

  setAccountOnDisplay(value) {
    this.accountOnDisplay.next(value);
  }

  getAccountOnDisplay() {
    return this.accountOnDisplay.getValue();
  }
}
