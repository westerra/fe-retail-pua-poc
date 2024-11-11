import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AccountSummary, ProductKind } from '../../types';

@Component({
  selector: 'bb-product-kinds-list-extended',
  templateUrl: './product-kinds-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductKindsListComponent {
  /**
   * Product kinds data
   */
  @Input() productKinds: ProductKind[] = [];
  /**
   * Defines whether to show product kind icons.
   */
  @Input() showIcons = true;
  /**
   * Defines whether to show overdue accounts product kind
   */
  @Input() showOverdueAccounts = false;
  /**
   * Emits arrangement id when pay now is clicked
   */
  @Output() payNow = new EventEmitter<string>();
  /**
   * Output emits selected product
   */
  @Output() selectAccount = new EventEmitter<AccountSummary>();
  /**
   * Indicates whether the product kind card is expanded or collapsed.
   */
  readonly isProductKindExpanded: { [key: string]: boolean } = {};

  getItems(items) {
    console.log(items);
  }
}
