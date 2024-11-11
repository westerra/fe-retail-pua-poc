import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MessagesClientInboxListComponent } from '@backbase/messages-client-inbox-journey-ang';

@Component({
  selector: 'bb-messages-client-inbox-list-custom',
  templateUrl: './messages-client-inbox-list-custom.component.html',
  styleUrls: ['./messages-client-inbox-list-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessagesClientInboxListCustomComponent extends MessagesClientInboxListComponent {}
