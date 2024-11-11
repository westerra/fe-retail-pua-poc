import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsFormBuilderService, ArrangementBasedRecipeModel } from '@backbase/actions-shared-data-access';
@Component({
  selector: 'bb-actions-account-balance-recipe-form-custom',
  templateUrl: './actions-account-balance-recipe-form-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ActionsFormBuilderService],
})
export class ActionsAccountBalanceRecipeFormCustomComponent extends ArrangementBasedRecipeModel {
  static idCounter: number;
  /**
   * Account balance action recipe ID.
   */
  readonly id: string;

  /* 
  Previously used pattern - '-?\\d{1,18}'
  */
  public balanceAmountPattern: string = '-?\\$?\\d*.?\\d{1,2}';

  constructor(actionsFormBuilderService: ActionsFormBuilderService) {
    super(actionsFormBuilderService);
    /**
     * Account balance action recipe ID.
     */
    this.id = `bb-actions-account-balance-recipe-form-${ActionsAccountBalanceRecipeFormCustomComponent.idCounter++}`;
  }
  /**
   * Method to patch the form with the amount and currency.
   *
   * @param amount - amount input value
   */
  onInlineEditAccept(amount: string) {
    let updatedAmount = amount.replace('$', '');
    if (this.formGroup) {
      const amountControl = this.formGroup.get('amount');
      if (amountControl) {
        amountControl.patchValue({
          amount: updatedAmount || '0',
          currency: amountControl.value.currency,
        });
      }
    }
  }

  updatedAmount(amount: string) {
    let amountNew = amount;
    let amountParts = amount.split('.');
    let fractionalPart = +('0.' + amountParts[1]) * 100;
    let roundedFractionalPart =
      fractionalPart > 1
        ? Math.floor(fractionalPart) < 10
          ? '.0' + Math.floor(fractionalPart).toString()
          : '.' + Math.floor(fractionalPart).toString()
        : '';

    amountNew = amountParts[0] + roundedFractionalPart;

    return amountNew;
  }
}
