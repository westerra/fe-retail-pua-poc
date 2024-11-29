import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderChecksService } from '../../services/order-checks.service';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';
import { ApiService } from '../../../services/api/api.service';
import { AccountArrangementItem } from '@backbase/arrangement-manager-http-ang';
import { REDIRECT_APPLICATION_NAME, RedirectRequest, RedirectResponse } from '../../../services/api/sso/sso.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bb-order-checks-view-custom',
  templateUrl: './order-checks-view.component.html',
})
export class OrderChecksViewComponent implements OnInit, OnDestroy {
  showError = false;
  errorMessage = '';
  submitted = false;
  accountsList: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  orderCheckForm: FormGroup;

  constructor(private orderService: OrderChecksService, private api: ApiService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.updateAccountList();
    this.initializeForm();
  }

  initializeForm() {
    this.orderCheckForm = this.fb.group({
      account: ['', Validators.compose([Validators.required])],
    });
  }

  updateAccountList() {
    this.orderService.getOrderChecksAcceptableProducts().subscribe((res: any) => {
      this.accountsList.next(res);
    });
  }

  submit() {
    this.submitted = true;
    this.showError = false;
    if (!this.orderCheckForm.invalid) {
      this.callAction(this.orderCheckForm.controls.account.value);
    }
  }

  callAction(product: AccountArrangementItem) {
    this.showError = false;
    this.errorMessage = '';

    const redirectRequest: RedirectRequest = {
      name: REDIRECT_APPLICATION_NAME.HARLAND,
      internalArrangementId: product.id,
    };
    this.api.sso
      .get(redirectRequest)
      .pipe(catchError((err) => this.handleError(err)))
      .subscribe((redirectResponse: RedirectResponse) => {
        this.openRedirectInNewTab(redirectResponse, REDIRECT_APPLICATION_NAME.HARLAND);
        catchError((err) => this.handleError(err));
      });
  }

  private handleError(err: any) {
    this.showError = true;
    this.errorMessage = err.error.message ?? err.message;

    setTimeout(() => {
      this.showError = false;
      this.errorMessage = '';
    }, 3500);

    return EMPTY;
  }

  openRedirectInNewTab(response: RedirectResponse, expectedApplicationName: REDIRECT_APPLICATION_NAME) {
    if (response.name !== expectedApplicationName) {
      this.handleError(new Error('Response application name does not match expected application name.'));
    }

    window.open(response.ssourl), '_blank';
  }

  ngOnDestroy(): void {
    this.accountsList.complete();
  }
}
