import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SafeResourceUrl, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, pluck } from 'rxjs';
import { PayverisResponse } from '../services/payveris-service/westerra-payveris-data.interfaces';
import { WesterraPayverisDataService } from '../services/payveris-service/westerra-payveris-data-service.service';

@Component({
  selector: 'bb-payveris-widget',
  templateUrl: './payveris-widget.component.html',
})
export class PayverisWidgetComponent implements OnInit {
  payverisWidgetUrl?: SafeResourceUrl;
  error: any;
  restricted = false;
  isLoading: boolean | undefined;
  payverisWidgetUrls: SafeResourceUrl | SafeUrl = null;
  path: string | any = this.route.snapshot.routeConfig?.path;
  headerTitle: any = '';

  constructor(
    private service: WesterraPayverisDataService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
  ) {}

  handleResponse(sessionResponse: PayverisResponse | null = {}): void {
    const artifactId = sessionResponse?.ssourl;
    if (artifactId) {
      this.isLoading = false;
      const snapshot: any = this.route.snapshot;
      const payverisPage = snapshot._routerState.url?.split('/');
      this.payverisWidgetUrls = this.sanitizer.bypassSecurityTrustResourceUrl(
        `${this.payverisWidgetUrl}/${payverisPage?.pop()}?artifactId=${artifactId}`,
      );
    } else {
      this.isLoading = false;
    }
    this.cd.detectChanges();
  }

  ngOnInit() {
    const snapshot: any = this.route.snapshot;
    const activePath = snapshot._routerState.url;

    // switch (this.route.snapshot.routeConfig?.path) {
    switch (activePath) {
      case '/transfers/ShowDashboard':
        this.headerTitle = 'Bill Pay Dashboard';
        break;
      case '/transfers/OneTimePayment':
        this.headerTitle = 'Pay Bills';
        break;
      case '/transfers/ViewPaymentHistory':
        this.headerTitle = 'Payment Activity';
        break;
      case '/transfers/SendMoneyDashboard':
        this.headerTitle = 'External Transfers & Pay People';
        break;
      default:
        this.headerTitle = '';
    }

    this.cd.detectChanges();

    switch (window.location.host) {
      case 'digitalservices.westerracu.com':
        this.payverisWidgetUrl = 'https://billpay.payverisbp.com/pp/sso/eu/';
        break;
      default:
        this.payverisWidgetUrl = 'https://test.regrpayverisbp.com/pp/sso/eu/';
    }
    this.isLoading = true;

    // TO BE REMOVED
    // let sampleResponse = {
    //   name: 'payveris',
    //   ssourl: 'backbase-21291284b301ccfdf74b818d21435448',
    // };
    // this.handleResponse(sampleResponse);

    // TO BE UNCOMMENTED
    this.service
      .createUserSession()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status !== 404) {
            this.error = error;
          }
          if (error.status === 403) {
            this.restricted = true;
          }
          this.isLoading = false;
          return EMPTY;
        }),
        pluck('body'),
      )
      .subscribe((response: any | null) => {
        this.handleResponse(response);
      });
  }
}
