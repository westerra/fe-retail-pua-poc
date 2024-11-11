import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'bb-ongoing-aggregation-alert',
  template: `
    <div *ngIf="showAlert">
      <div class="bb-block bb-block--xs"></div>
      <bb-alert-ui [title]="alertTitle" modifier="info" [dismissible]="true" (close)="showAlert = false">
        <p>{{ alertMessage }}</p>
      </bb-alert-ui>
    </div>
  `,
})
export class OngoingAggregationAlertComponent implements OnInit, OnDestroy {
  /**
   * Emits when there is an ongoing aggregation
   */
  @Input() ongoingAggregation$ = new Observable();
  /**
   * Label for alert title
   */
  readonly alertTitle = $localize`:Ongoing aggregation alert title|ongoing aggregation alert title@@product-summary-list-widget.ongoing-aggregation-alert.alert-ui.title:You have connected new accounts`;
  /**
   * Label for alert message
   */
  readonly alertMessage = $localize`:Ongoing aggregation alert message|ongoing aggregation alert message@@product-summary-list-widget.ongoing-aggregation-alert.alert-ui.message:We are working on adding your accounts. It may take some time before they display below.`;
  /**
   * Decides whether to show the alert notification
   */
  showAlert = false;

  private ongoingAggregationSubscription?: Subscription;

  ngOnInit(): void {
    this.ongoingAggregationSubscription = this.ongoingAggregation$.subscribe(() => {
      this.showAlert = true;
    });
  }

  ngOnDestroy(): void {
    this.ongoingAggregationSubscription?.unsubscribe();
  }
}
