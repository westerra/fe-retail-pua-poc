/* eslint-disable @angular-eslint/component-selector */
/* eslint-disable import/no-extraneous-dependencies */
import { Component } from '@angular/core';
import { ControlContainer, NgModelGroup } from '@angular/forms';

import { ConversationsListTableRowComponent } from '@backbase/internal-messages-client-inbox-journey-feature';

@Component({
  selector: 'tr[bb-conversations-list-table-row-ui-custom]',
  templateUrl: './conversations-list-table-row-ui.component.html',
  styleUrls: ['./conversations-list-table-row-ui.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgModelGroup }],
})
export class ConversationsListTableRowUiComponent extends ConversationsListTableRowComponent {}
