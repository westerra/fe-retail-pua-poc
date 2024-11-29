/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';
import { ConversationsListTableHeadComponent } from '@backbase/internal-messages-client-inbox-journey-feature';

@Component({
  selector: 'tr[bb-conversations-list-table-head-ui-custom]',
  templateUrl: './conversations-list-table-head-ui.component.html',
  styleUrls: ['./conversations-list-table-head-ui.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
})
export class ConversationsListTableHeadUiComponent extends ConversationsListTableHeadComponent {}
