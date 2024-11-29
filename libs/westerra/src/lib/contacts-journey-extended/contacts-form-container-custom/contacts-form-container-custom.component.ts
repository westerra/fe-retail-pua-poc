import { Component } from '@angular/core';
import { ContactManagerFormViewComponent } from '@backbase/internal-contact-manager-journey-feature';

@Component({
  selector: 'bb-contacts-form-container-custom',
  templateUrl: './contacts-form-container-custom.component.html',
})
export class ContactsFormContainerCustomComponent extends ContactManagerFormViewComponent {}
