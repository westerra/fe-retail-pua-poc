import { Component } from '@angular/core';
import { ConditionsService } from '@backbase/foundation-ang/entitlements';
import { from, Observable, startWith } from 'rxjs';
import { PERMISSIONS } from '../auth/permissions';

@Component({
  templateUrl: './layout.component.html',
})
export class LayoutComponent {
  readonly permissions = PERMISSIONS;

  displayNotificationSettingsButton$: Observable<boolean> = from(
    this.conditionService.resolveEntitlements(this.permissions.canViewManageNotifications),
  ).pipe(startWith(false));

  constructor(private conditionService: ConditionsService) {}
}
