import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EntitlementsModule } from '@backbase/foundation-ang/entitlements';
import { RetailLayoutModule } from '@backbase/retail/feature/layout';
import { HeaderModule } from '@backbase/ui-ang/header';
import { IconModule } from '@backbase/ui-ang/icon';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsCommunication } from '../communication/notifications-communication.service';
import { LayoutComponent } from './layout.component';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import { RtcChatButtonComponent } from './rtc-chat-button/rtc-chat-button.component';
import { ButtonModule } from '@backbase/ui-ang/button';
import { BadgeCounterModule } from '@backbase/ui-ang/badge-counter';
import { RetailChatJourneyModule, RtcCommunicationService } from '@backbase/real-time-communication-journey-ang';
import { RtcCommunicationService as RtcCommunicationServiceImplementation } from '../communication/rtc-communication.service';

@NgModule({
  imports: [
    ButtonModule,
    BadgeCounterModule,
    CommonModule,
    RouterModule,
    HeaderModule,
    IconModule,
    NgbDropdownModule,
    EntitlementsModule,
    RetailChatJourneyModule,
    RetailLayoutModule.forRoot(NotificationsCommunication),
  ],
  exports: [LayoutComponent],
  declarations: [LayoutComponent, NavigationMenuComponent, RtcChatButtonComponent],
  providers: [
    {
      provide: RtcCommunicationService,
      useExisting: RtcCommunicationServiceImplementation,
    },
  ],
})
export class LayoutModule {}
