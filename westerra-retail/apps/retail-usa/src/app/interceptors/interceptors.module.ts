import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EntitlementsInterceptor } from './http-entitlementsInterceptor.interceptor';
import { NotificationInterceptor } from './http-notifications.interceptor';
import { HttpXsrfInterceptor } from './http-xsrf.interceptor';
import { InvalidTokenInterceptor } from './invalid-token.interceptor';
import { PaymentOrdersInterceptor } from './payment-orders.interceptor';

@NgModule({
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: EntitlementsInterceptor,
    //   multi: true,
    // },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: NotificationInterceptor,
    //   multi: true,
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpXsrfInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InvalidTokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PaymentOrdersInterceptor,
      multi: true,
    },
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true,
    // },
    // This seems to not be needed since we are using a live auth server now to authenticate.
    // {
    //   provide : HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true, deps: [HttpXsrfTokenExtractor]
    // }
  ],
})
export class InterceptorsModule {}
