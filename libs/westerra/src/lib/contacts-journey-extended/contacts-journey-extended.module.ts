import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactManagerFormViewCustomComponent } from './contact-manager-form-view-custom/contact-manager-form-view-custom.component';

import { ContactManagerJourneyFeatureModule } from '@backbase/contact-manager-journey-feature';
import { ContactManagerJourneyModule } from '@backbase/contact-manager-journey-ang';
import { ContactsFormContainerCustomComponent } from './contacts-form-container-custom/contacts-form-container-custom.component';
import { ContactFormCustomComponent } from './contact-form-custom/contact-form-custom.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BbIbanPipeModule } from '@backbase/ui-ang/iban-pipe';
import { ButtonModule } from '@backbase/ui-ang/button';
import { HeaderModule } from '@backbase/ui-ang/header';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputTextModule } from '@backbase/ui-ang/input-text';
import { InputValidationMessageModule } from '@backbase/ui-ang/input-validation-message';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { InputEmailModule } from '@backbase/ui-ang/input-email';
import {
  ConfirmActionDialogModule,
  EmailDomainModule,
  IbanValidatorModule,
  NoWhiteSpaceModule,
} from '@backbase/contact-shared-ui';

import { ContactFormModule, ContactHeaderModule } from '@backbase/contact-manager-journey-ui';

const innerDependencyModules = [
  ContactManagerJourneyFeatureModule,
  ContactManagerJourneyModule,
  ConfirmActionDialogModule,
  ContactFormModule,
  ContactHeaderModule,

  LoadingIndicatorModule,
  InputValidationMessageModule,
  InputTextModule,
  InputEmailModule,
];

const uiModules = [
  ButtonModule,
  IconModule,
  HeaderModule,
  BbIbanPipeModule,
  EmailDomainModule,
  IbanValidatorModule,
  NoWhiteSpaceModule,
];

@NgModule({
  declarations: [
    ContactManagerFormViewCustomComponent,
    ContactsFormContainerCustomComponent,
    ContactFormCustomComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ...innerDependencyModules, ...uiModules],
})
export class ContactsJourneyExtendedModule {}
