import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionsDetailExtendedComponent } from './components/transactions-detail-extended/transactions-detail-extended.component';
import { TransactionsDetailModalExtendedComponent } from './components/transactions-detail-modal-extended/transactions-detail-modal-extended.component';
import { BbDatePipeModule } from '@backbase/ui-ang/date-pipe';
import { TransactionsDetailWrapperComponent } from './components/transactions-detail-wrapper/transactions-detail-wrapper.component';
import {
  TransactionsListItemDetailsCustomizableDirective,
  TransactionsListConfirmationModalCustomizableDirective,
} from '@backbase/transactions-list-widget-ang';
import { TransactionsListWidgetModule } from '@backbase/transactions-list-widget-ang';
import { FormsModule } from '@angular/forms';
import { BadgeModule } from '@backbase/ui-ang/badge';
import { ButtonModule } from '@backbase/ui-ang/button';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { KeyboardClickModule } from '@backbase/ui-ang/keyboard-click-directive';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ModalModule } from '@backbase/ui-ang/modal';
import { TooltipModule } from '@swimlane/ngx-charts';

const requiredModules = [
  CommonModule,
  BbDatePipeModule,
  FormsModule,
  BadgeModule,
  ButtonModule,
  ModalModule,
  IconModule,
  InputCheckboxModule,
  LoadButtonModule,
  EmptyStateModule,
  LoadingIndicatorModule,
  TooltipModule,
  KeyboardClickModule,
];

const innerModules = [TransactionsListWidgetModule];

const components = [
  TransactionsDetailExtendedComponent,
  TransactionsDetailModalExtendedComponent,
  TransactionsDetailWrapperComponent,
];

const directives = [
  TransactionsListItemDetailsCustomizableDirective,
  TransactionsListConfirmationModalCustomizableDirective,
];

@NgModule({
  declarations: [...components],
  imports: [...requiredModules, ...innerModules],
  providers: [...directives],
})
export class TransactionsJourneyExtendedModule {}
