/**
 * Warning: Modification of this file
 * may prevent automatic updates of this project in the future.
 * More details: https://community.backbase.com/documentation/Retail-Apps/latest/web_app_upgradability_understand
 */
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export const XSRF_HEADER_NAME = 'X-XSRF-TOKEN';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(private readonly tokenService: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.tokenService.getToken();

    if (token) {
      req = req.clone({ headers: req.headers.set(XSRF_HEADER_NAME, token) });
    }
    return next.handle(req);
  }
}
