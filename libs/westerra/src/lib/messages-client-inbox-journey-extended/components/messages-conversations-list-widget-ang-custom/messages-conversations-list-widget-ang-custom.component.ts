import { Component } from '@angular/core';
import { MessagesConversationsListWidgetComponent } from '@backbase/messages-client-inbox-journey-feature';

@Component({
  selector: 'bb-messages-conversations-list-widget-ang-custom',
  templateUrl: './messages-conversations-list-widget-ang-custom.component.html',
  styleUrls: ['./messages-conversations-list-widget-ang-custom.component.scss'],
})
export class MessagesConversationsListWidgetAngCustomComponent extends MessagesConversationsListWidgetComponent {}
