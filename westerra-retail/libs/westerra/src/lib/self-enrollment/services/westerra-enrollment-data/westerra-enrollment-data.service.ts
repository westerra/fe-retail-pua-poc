import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { HTTP_PARAMS_FACTORY, HttpParamsFactory, ServiceDataHttpConfig } from '@backbase/foundation-ang/data-http';
import {
  MemberBackbaseEnrollmentPostRequest,
  MemberBackbaseEnrollmentPostResponse,
  MemberBackbaseEnrollmentPutRequest,
  MemberMxSessionResponse,
} from '../../utils/enrollment-models';
import { EMPTY, Observable, catchError, pluck } from 'rxjs';
import { PayverisResponse } from '../../../services/api/sso/sso.models';
import { WESTERRA_ENROLLMENT_DATA_CONFIG } from '../../../services/api/api.models';

const version = 'v2';
@Injectable({
  providedIn: 'root',
})
export class WesterraEnrollmentDataService {
  constructor(
    private readonly http: HttpClient,
    @Inject(WESTERRA_ENROLLMENT_DATA_CONFIG) private readonly config: ServiceDataHttpConfig,
    @Inject(HTTP_PARAMS_FACTORY) private readonly toHttpParams: HttpParamsFactory,
  ) {}

  postEnrollmentsBackbaseRecord(
    body: MemberBackbaseEnrollmentPostRequest,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<MemberBackbaseEnrollmentPostResponse>> {
    const uri = `${this.config.apiRoot}/enrollment/client-api/${version}/enrollments/backbase`;
    return this.http.request<MemberBackbaseEnrollmentPostResponse>('post', uri, {
      body,
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false,
    });
  }

  putEnrollmentsBackbaseRecord(
    body: MemberBackbaseEnrollmentPutRequest,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<any>> {
    const uri = `${this.config.apiRoot}/enrollment/client-api/${version}/enrollments/backbase`;
    return this.http.request<any>('put', uri, {
      body,
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false,
    });
  }

  postEnrollmentsMxRecord(
    body: any,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<MemberMxSessionResponse>> {
    const uri = `${this.config.apiRoot}/enrollment/client-api/${version}/enrollments/mx`;
    return this.http.request<MemberMxSessionResponse>('post', uri, {
      body,
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false,
    });
  }

  getEnrollmentsMx(
    params?: undefined,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<MemberMxSessionResponse | any>> {
    const uri = `${this.config.apiRoot}/enrollment/client-api/${version}/enrollments/mx`;
    return this.http.request<MemberMxSessionResponse>('get', uri, {
      params: this.toHttpParams(params || {}),
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false,
    });
  }

  createUserSession(
    page: string,
    params?: undefined,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<PayverisResponse>> {
    const uri =
      page === 'SendMoneyDashboard'
        ? `${this.config.apiRoot}${this.config.servicePath}/client-api/${version}/sso/payveris?page=p2p`
        : `${this.config.apiRoot}${this.config.servicePath}/client-api/${version}/sso/payveris`;
    return this.http.request<PayverisResponse>('get', uri, {
      params: this.toHttpParams(params || {}),
      headers,
      observe: 'response',
      responseType: 'json',
      withCredentials: false,
    });
  }

  getAutoEnrollmentDataUnverified(
    uuid: string,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<any>> {
    ////TODO Response Interface
    const uri = `${this.config.apiRoot}/enrollment/client-api/${version}/enrollments/backbase?uuid=${uuid}`;
    return this.http
      .request<any>('get', uri, {
        ////TODO Response Interface
        headers,
        observe: 'response',
        responseType: 'json',
      })
      .pipe(
        catchError((response) => {
          return EMPTY;
        }),
        pluck('body'),
      );
  }

  getAutoEnrollmentDataVerified(
    uuid: string,
    ssn: string,
    headers: HttpHeaders = new HttpHeaders({}),
  ): Observable<HttpResponse<any>> {
    ////TODO Response Interface
    const uri = `${this.config.apiRoot}/enrollment/client-api/${version}/enrollments/backbase?uuid=${uuid}&verify=${ssn}`;
    return this.http.request<any>('get', uri, {
      ////TODO Response Interface
      headers,
      observe: 'response',
      responseType: 'json',
    });
  }
}
