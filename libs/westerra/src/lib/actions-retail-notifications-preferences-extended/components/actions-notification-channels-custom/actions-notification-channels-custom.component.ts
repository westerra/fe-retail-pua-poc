import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ӨActionsNotificationChannelsComponent } from '@backbase/actions-shared-feature';

@Component({
  selector: 'bb-actions-notification-channels-custom',
  templateUrl: './actions-notification-channels-custom.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsNotificationChannelsCustomComponent extends ӨActionsNotificationChannelsComponent {}
