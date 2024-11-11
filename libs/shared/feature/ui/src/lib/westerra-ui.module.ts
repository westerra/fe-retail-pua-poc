import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '@backbase/ui-ang/alert';
import { AmountModule } from '@backbase/ui-ang/amount';
import { AmountInputModule } from '@backbase/ui-ang/amount-input';
import { ButtonDirective, ButtonModule } from '@backbase/ui-ang/button';
import { DropdownSingleSelectModule } from '@backbase/ui-ang/dropdown-single-select';
import { EllipsisModule } from '@backbase/ui-ang/ellipsis';
import { HeaderModule } from '@backbase/ui-ang/header';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { InputTextModule } from '@backbase/ui-ang/input-text';
import { InputValidationMessageModule } from '@backbase/ui-ang/input-validation-message';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountSourceSelectorComponent } from './components/account-source-selector/account-source-selector.component';
import { BasicAccountItemUiComponent } from './components/basic-account-item-ui/basic-account-item-ui.component';
import { FocusDirective } from '@backbase/ui-ang/focus';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,

    FormsModule,
    ReactiveFormsModule,

    AlertModule,
    ButtonModule,
    LoadButtonModule,
    LoadingIndicatorModule,
    HeaderModule,
    AmountModule,
    IconModule,
    InputTextModule,
    InputValidationMessageModule,
    DropdownSingleSelectModule,
    InputCheckboxModule,
    NgbModule,
    EllipsisModule,
    AmountInputModule,
  ],
  declarations: [AccountSourceSelectorComponent, BasicAccountItemUiComponent],
  exports: [AccountSourceSelectorComponent, BasicAccountItemUiComponent],
  providers: [FocusDirective, ButtonDirective],
})
export class WesterraUiModule {}
