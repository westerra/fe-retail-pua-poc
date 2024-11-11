import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { delay } from 'rxjs/operators';
import { entitlementsConfiguration } from './entitlementsConfiguration';

@Injectable()
export class EntitlementsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/api/access-control/client-api/v2/accessgroups/users/permissions/summary')) {
      //debugger;
      return of(
        new HttpResponse({
          status: 200,
          body: entitlementsConfiguration,
        }),
      ).pipe(delay(300));
    }
    return next.handle(req);
  }
}
