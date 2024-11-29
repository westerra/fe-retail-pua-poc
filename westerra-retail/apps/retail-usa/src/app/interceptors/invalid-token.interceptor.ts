import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';

const URL_PATH_BLACKLIST = ['/retail-app/self-enrollment', '/retail-app/auto-enrollment', '/retail-app/redirect'];

@Injectable()
export class InvalidTokenInterceptor implements HttpInterceptor {
  constructor(private readonly oAuthService: OAuthService, @Inject(DOCUMENT) private readonly _document: Document) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((httpErrorResponse: HttpErrorResponse) => {
        // const { error, status, statusText } = httpErrorResponse;
        const currentUserUri = this._document.location.pathname;

        if (httpErrorResponse.status === 401 && !URL_PATH_BLACKLIST.includes(currentUserUri)) {
          this.oAuthService.logOut();
        }

        return throwError(() => httpErrorResponse);
      }),
    );
  }
}
