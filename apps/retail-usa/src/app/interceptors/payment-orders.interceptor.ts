import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '@backbase/westerra';

@Injectable()
export class PaymentOrdersInterceptor implements HttpInterceptor {
  constructor(public api: ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('client-api/v2/payment-orders') && request.method === 'POST') {
      return next.handle(request).pipe(
        map((response) => {
          if (response instanceof HttpResponse) {
            this.api.sso.clearState();
            if (response.body.status === 'REJECTED') {
              const message = response.body.reasonText ? response.body.reasonText : 'Error';
              this.api.sso.setStatePaymentOrder({
                error: {
                  type: 'error',
                  message: `${message}`,
                  description: response.body.errorDescription ? response.body.errorDescription : response.body,
                },
                isLoading: false,
              });
            }
          }
          return response;
        }),
      );
    } else if (request.url.includes('client-api/v2/payment-orders') && request.method === 'GET') {
      return next.handle(request).pipe(
        catchError((httpErrorResponse: HttpErrorResponse) => {
          this.api.sso.clearPaymentApiErrorState();
          this.api.sso.setPaymentApiError({
            status: httpErrorResponse.status,
            error: httpErrorResponse.error,
            api: request.url,
            errorObject: httpErrorResponse,
          });

          return throwError(httpErrorResponse);
        }),
      );
    }
    return next.handle(request);
  }
}
