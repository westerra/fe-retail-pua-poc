import { HttpClient, HttpHeaders, HttpResponse, HttpEvent } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PayverisResponse } from './westerra-payveris-data.interfaces';
import { ServiceDataHttpConfig, HTTP_PARAMS_FACTORY, HttpParamsFactory } from '@backbase/foundation-ang/data-http';
import { BehaviorSubject } from 'rxjs';

const version = 'v2';
export const WESTERRA_PAYVERIS_DATA_CONFIG = new InjectionToken('westerra-payveris-data Data Service :: HTTP Config');

@Injectable({
  providedIn: 'root',
})
export class WesterraPayverisDataService {
  private title: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(
    private readonly http: HttpClient,
    @Inject(WESTERRA_PAYVERIS_DATA_CONFIG)
    private readonly config: ServiceDataHttpConfig,
    @Inject(HTTP_PARAMS_FACTORY)
    private readonly toHttpParams: HttpParamsFactory,
  ) {}

  createUserSession(headers: HttpHeaders = new HttpHeaders({})): Observable<HttpResponse<PayverisResponse>> {
    console.log(this.config)
    const uri = `${this.config.apiRoot}${this.config.servicePath ?? '/api'}/sso/client-api/v1/applications?name=payveris&autoenroll=true`;
    return this.http.request<PayverisResponse>('get', uri, {
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: true,
    });
  }
}
