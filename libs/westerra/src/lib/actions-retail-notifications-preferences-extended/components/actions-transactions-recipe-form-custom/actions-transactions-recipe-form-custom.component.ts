import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActionsFormBuilderService } from '@backbase/actions-shared-data-access';
import { ӨActionsTransactionsRecipeFormComponent } from '@backbase/actions-shared-feature';
@Component({
  selector: 'bb-actions-transactions-recipe-form-custom',
  templateUrl: './actions-transactions-recipe-form-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ActionsFormBuilderService],
})
export class ActionsTransactionsRecipeFormCustomComponent extends ӨActionsTransactionsRecipeFormComponent {}
