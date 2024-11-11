import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ServiceDataHttpConfig, HttpParamsFactory, HTTP_PARAMS_FACTORY} from '@backbase/foundation-ang/data-http'
import { Inject, Injectable, InjectionToken } from '@angular/core';
// import { HttpResponse } from '@backbase/foundation-ang/web-sdk';
import { Observable } from 'rxjs';

export const WESTERRA_MANAGE_CONTACTS_DATA_CONFIG = new InjectionToken(
  'westerra-manage-contacts-data Data Service :: HTTP Config'
)
export interface CreateContactPostRequest {
  name: string,
  accounts: [{accountNumber: string}]
}

@Injectable({
  providedIn: 'root'
})
export class ManageContactsService {
  contactsServiceURI:string = 'contact-manager/client-api/v2/contacts'

  constructor(
    private readonly http: HttpClient,
    @Inject(HTTP_PARAMS_FACTORY) private readonly toHttpParams: HttpParamsFactory,
    @Inject(WESTERRA_MANAGE_CONTACTS_DATA_CONFIG) private readonly config: ServiceDataHttpConfig
  ) { }

  getContacts(
    params?: undefined,
    headers: HttpHeaders = new HttpHeaders({})
  ): Observable<HttpResponse<any>> {
    const uri = `${this.config.apiRoot}/${this.contactsServiceURI}?from=0&size=5`
    return this.http.request<any>('get', uri, {
      params: this.toHttpParams(params || {}),
      headers,
      observe: 'response',
      responseType: 'json'
    })
  }

  createContact(
    body: CreateContactPostRequest,
    headers: HttpHeaders = new HttpHeaders({})
  ): Observable<HttpResponse<any>> { 
    const uri = `${this.config.apiRoot}/${this.contactsServiceURI}`
    return this.http.request<any>('post', uri, {
      body,
      headers,
      observe: 'response',
      responseType: 'json'
    })
  }

  editContact() { }
}

