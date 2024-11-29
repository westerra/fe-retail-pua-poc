import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'bb-loan-payment-journey-wrapper',
  template: `
    <div class="container-fluid">
      <div class="pb-1 pt-5" data-role="loan-payment-journey-header">
        <h1 class="pt-3 pb-4" i18n="@@retail-loan-payments.header">{{ title$ | async }}</h1>
      </div>
      <div class="bb-card">
        <div class="bb-card__body">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `,
})
export class LoanPaymentJourneyWrapperComponent {
  title$: Observable<string | undefined>;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.title$ = this.route.firstChild?.data.pipe(map((data) => data?.pageTitle));
  }
}
