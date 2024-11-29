/* eslint-disable import/no-extraneous-dependencies */
import { Component } from '@angular/core';
import { ConversationsListTableComponent } from '@backbase/internal-messages-client-inbox-journey-feature';

@Component({
  selector: 'bb-conversations-list-table-ui-custom',
  templateUrl: './conversations-list-table-ui-custom.component.html',
  styleUrls: ['./conversations-list-table-ui-custom.component.scss'],
})
export class ConversationsListTableUiCustomComponent extends ConversationsListTableComponent {}
