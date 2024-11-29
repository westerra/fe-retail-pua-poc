import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { DataHttpConfig, HTTP_PARAMS_FACTORY, HttpParamsFactory, ServiceDataHttpConfig } from '@backbase/foundation-ang/data-http';
import { AmplifiResponse } from './westerra-amplifi-data.interfaces';
import { Observable } from 'rxjs';
import { WesterraAmplifiDataModule } from './westerra-amplifi-data.module';
import { WESTERRA_AMPLIFI_DATA_CONFIG } from '../api/api.models';


const version = 'v2';

@Injectable({
  providedIn: 'root'
})

export class WesterraAmplifiDataService {

  constructor(private readonly http: HttpClient,
    @Inject(WESTERRA_AMPLIFI_DATA_CONFIG)
    private readonly config: ServiceDataHttpConfig,
    @Inject(HTTP_PARAMS_FACTORY)
    private readonly toHttpParams: HttpParamsFactory,) {

  }

  createUserSession(
    params?: undefined,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<AmplifiResponse>> {
    const url = `${this.config.apiRoot}/sso/client-api/v1/applications?name=amplify`;
    return this.http.request<AmplifiResponse>('get', url, {
      params: this.toHttpParams(params || {}),
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false,
    });
  }
}
