import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ImpersonationModule } from '@backbase/identity-auth/impersonation';
import { NotificationsBadgeModule, NotificationsCommunicationService } from '@backbase/notifications-ang';
import { IconModule } from '@backbase/ui-ang/icon';
import { LayoutModule } from '@backbase/ui-ang/layout';
import { LogoModule } from '@backbase/ui-ang/logo';
import { UserContextMenuWidgetModule } from '@backbase/user-context-menu-widget-ang';
import { RetailLayoutComponent } from './retail-layout.component';

@NgModule({
  declarations: [RetailLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
    UserContextMenuWidgetModule,
    LogoModule,
    LayoutModule,
    NotificationsBadgeModule,
    ImpersonationModule,
  ],
  exports: [RetailLayoutComponent, LayoutModule, NotificationsBadgeModule],
})
export class RetailLayoutModule {
  static forRoot(
    notificationServiceImplementation: new (router: Router) => NotificationsCommunicationService,
  ): ModuleWithProviders<RetailLayoutModule> {
    return {
      ngModule: RetailLayoutModule,
      providers: [
        {
          provide: NotificationsCommunicationService,
          useExisting: notificationServiceImplementation,
        },
      ],
    };
  }
}
