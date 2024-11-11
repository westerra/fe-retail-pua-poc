/* eslint-disable import/no-extraneous-dependencies */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModule } from '@backbase/ui-ang/header';
import { CreatePaymentFormExtendedComponent } from './create-payment-form-component/create-payment-form-extended.component';

import { SharedFeatureFormsModule } from '@backbase/internal-payments-shared-feature-forms';
import { LocalizePaymentErrorModule } from '@backbase/ip-ui';
import { ConfirmationDialogModule, PaymentTemplateSelectorModule } from '@backbase/internal-payments-shared-ui';
import { InitiatePaymentJourneyExtendedComponent } from './initiate-payment-journey-extended/initiate-payment-journey-extended.component';
import { RouterModule } from '@angular/router';
import { AlertModule } from '@backbase/ui-ang/alert';

const components = [CreatePaymentFormExtendedComponent, InitiatePaymentJourneyExtendedComponent];

const modules = [
  SharedFeatureFormsModule,
  HeaderModule,
  LocalizePaymentErrorModule,
  ConfirmationDialogModule,
  AlertModule,
];

@NgModule({
  imports: [CommonModule, ...modules, RouterModule],
  declarations: [...components],
  providers: [PaymentTemplateSelectorModule],
  exports: [...modules, ...components],
})
export class InternalTRansferViewModule {}
