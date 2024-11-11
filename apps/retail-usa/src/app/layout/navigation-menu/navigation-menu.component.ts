import { Component } from '@angular/core';
import { RemoteConfigService } from '@backbase/remote-config-ang';
import { PERMISSIONS } from '../../auth/permissions';
import { RetailAppRemoteConfig } from '../../remote-config/remote-config';
import { RtcCommunicationService } from '../../communication/rtc-communication.service';

@Component({
  selector: 'bb-navigation-menu',
  templateUrl: './navigation-menu.component.html',
})
export class NavigationMenuComponent {
  readonly permissions = PERMISSIONS;
  readonly showManageContacts = this.remoteConfigService.getValue('show_manage_contacts');
  public payverisHeader: any = {
    ShowDashboard: 'Bill Pay Dashboard',
    OneTimePayment: 'Pay Bills',
    ViewPaymentHistory: 'Payment Activity',
    SendMoneyDashboard: 'External Transfers & Pay People',
  };

  constructor(
    private remoteConfigService: RemoteConfigService<RetailAppRemoteConfig>,
    private rtcCommunicationService: RtcCommunicationService,
  ) {}

  toggleChatWindow() {
    this.rtcCommunicationService.toggleChatWindow();
  }
}
