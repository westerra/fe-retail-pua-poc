import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PayverisResponse, REDIRECT_APPLICATION_NAME, RedirectRequest, RedirectResponse } from './sso.models';
import { ApiServiceModule } from './../api.module';
import { ErrorState, PaymentApiErrorInterface } from '../api.models';
import { OAuthService } from 'angular-oauth2-oidc';
import { Configurations } from '../configurations';

const initialErrorState: ErrorState = {
  error: undefined,
  isLoading: true,
};

const initialPaymentApiErrorState: PaymentApiErrorInterface = {
  status: undefined,
  error: undefined,
  api: undefined,
  errorObject: undefined,
};

@Injectable({
  providedIn: ApiServiceModule,
})
export class SsoService {
  //todo: move this into environment.ts
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

  sso = REDIRECT_APPLICATION_NAME;

  defaulEnrollCashbackMsg = `https://www.dreampoints.com/westerra/`;

  private errorState: BehaviorSubject<ErrorState> = new BehaviorSubject(Object.assign({}, initialErrorState));
  errorState$ = this.errorState.asObservable();
  public errorStatePaymentOrder: BehaviorSubject<ErrorState> = new BehaviorSubject(
    Object.assign({}, initialErrorState),
  );
  errorStatePaymentOrder$ = this.errorStatePaymentOrder.asObservable();
  private _apiUrl = 'No value';

  public paymentApiError: BehaviorSubject<PaymentApiErrorInterface> = new BehaviorSubject(
    Object.assign({}, initialPaymentApiErrorState),
  );
  paymentApiError$ = this.paymentApiError.asObservable();

  constructor(
    private readonly http: HttpClient,
    private oAuthService: OAuthService,
    @Optional() config?: Configurations,
  ) {
    if (config) {
      this._apiUrl = config.apiUrl;
    }
  }

  get(request: RedirectRequest): Observable<RedirectResponse> {
    const { name, internalArrangementId, autoEnroll, entityType } = request;

    let url = '/api/sso/client-api/v1/applications?';

    //required
    url = url + `name=${name}`;

    //optionals
    if (internalArrangementId) {
      url = url + `&internalArrangementId=${internalArrangementId}`;
    }
    if (autoEnroll) {
      url = url + `&autoEnroll=${autoEnroll}`;
    }
    if (entityType) {
      url = url + `&entityType=${entityType.toString()}`;
    }

    return this.http.get<RedirectResponse>(url.toString(), {
      headers: new HttpHeaders({
        authorization: 'BEARER ' + this.oAuthService.getAccessToken(),
      }),
      withCredentials: false,
    });
  }

  setState(updatedValues: Partial<ErrorState>) {
    const currentValue = this.errorState.getValue();
    const nextValue = Object.assign(currentValue, updatedValues);

    this.errorState.next(nextValue);
  }

  handleError(response: any) {
    const error = response.error;
    const message = error && error.message ? error.message : response.message;
    this.setState({ error: { type: 'error', message: `Error: ${message}` }, isLoading: false });
    //this.router.navigateByUrl("/accounts/my-accounts");
  }

  clearState() {
    this.setState(Object.assign({}, initialErrorState));
  }

  navigateToExternalLink(ssoAppName: string, redirectUrl: any) {
    //this.router.navigateByUrl("/my-accounts");
    window.open(redirectUrl, '_blank');
  }

  postDMI(key: string) {
    return this.http.post<any>(this.dmiURLLogin, { KEY: key });
  }

  getProfile() {
    const url = `${this._apiUrl}/user-manager/client-api/v2/users/me/profile`;

    return this.http.get<any>(url);
  }

  setStatePaymentOrder(updatedValues: Partial<ErrorState>) {
    const currentValue = this.errorStatePaymentOrder.getValue();
    const nextValue = Object.assign(currentValue, updatedValues);

    this.errorStatePaymentOrder.next(nextValue);
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
    // this.router.navigateByUrl("/accounts/my-accounts");
  }

  createUserSession(headers: HttpHeaders = new HttpHeaders({})): Observable<HttpResponse<PayverisResponse>> {
    const uri = `${this._apiUrl}/sso/client-api/v1/applications?name=payveris&autoenroll=true`;
    return this.http.request<PayverisResponse>('get', uri, {
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
    });
  }

  clearPaymentApiErrorState() {
    this.setPaymentApiError(Object.assign({}, initialPaymentApiErrorState));
  }

  setPaymentApiError(updatedValues: Partial<PaymentApiErrorInterface>) {
    const currentValue = this.paymentApiError.getValue();
    const nextValue = Object.assign(currentValue, updatedValues);
    this.paymentApiError.next(nextValue);
  }
}
