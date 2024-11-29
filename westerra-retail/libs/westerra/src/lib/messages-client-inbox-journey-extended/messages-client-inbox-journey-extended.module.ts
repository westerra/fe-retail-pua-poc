import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, provideRoutes } from '@angular/router';
import {
  MessagesClientInboxJourneyComponent,
  MessagesClientInboxJourneyConfigService,
  MessagesClientInboxThreadComponent,
  MessagesManageConversationsComponent,
} from '@backbase/messages-client-inbox-journey-ang';

import {
  MessagesManipulationConfirmModalService,
  SharedMethodsService,
  BaseConversationsListPropertiesService,
  SharedMethodsModule,
} from '@backbase/internal-messages-shared-data-access';

import { MessagesEncodingService } from '@backbase/internal-messages-shared-util';

import {
  MessagesConversationsListFeatureService,
  MessagesConversationThreadFeatureService
} from '@backbase/internal-messages-client-inbox-journey-data-access';
import { MessagesUploadAttachmentsService,  BaseConversationsListFeatureModule } from '@backbase/internal-messages-shared-feature';
import { BadgeModule } from '@backbase/ui-ang/badge';
import { ButtonModule } from '@backbase/ui-ang/button';
import { CheckboxGroupModule } from '@backbase/ui-ang/checkbox-group';
import { DropdownMenuModule } from '@backbase/ui-ang/dropdown-menu';
import { EmptyStateModule } from '@backbase/ui-ang/empty-state';
import { IconModule } from '@backbase/ui-ang/icon';
import { InputCheckboxModule } from '@backbase/ui-ang/input-checkbox';
import { LoadButtonModule } from '@backbase/ui-ang/load-button';
import { LoadingIndicatorModule } from '@backbase/ui-ang/loading-indicator';
import { ModalModule } from '@backbase/ui-ang/modal';
import { FormsModule } from '@angular/forms';
import {
  PreventBubbleDownModule,
  MessagesRequestErrorModule,
  MessagesConversationMessageModule,
} from '@backbase/internal-messages-shared-ui';
import { MessagecenterHttpService } from '@backbase/messages-v5-http-ang';
import { KeyboardClickModule } from '@backbase/ui-ang/keyboard-click-directive';
import { TooltipModule } from '@backbase/ui-ang/tooltip-directive';
import { ConversationsListTableRowUiComponent } from './components/conversations-list-table-row-ui/conversations-list-table-row-ui.component';
import { ConversationsListTableHeadUiComponent } from './components/conversations-list-table-head-ui/conversations-list-table-head-ui.component';
import { ConversationsListTableUiCustomComponent } from './components/conversations-list-table-ui-custom/conversations-list-table-ui-custom.component';
import { MessagesConversationsListWidgetAngCustomComponent } from './components/messages-conversations-list-widget-ang-custom/messages-conversations-list-widget-ang-custom.component';
import { MessagesClientInboxListCustomComponent } from './components/messages-client-inbox-list-custom/messages-client-inbox-list-custom.component';

const uiModules = [
  FormsModule,
  BadgeModule,
  ButtonModule,
  CheckboxGroupModule,
  DropdownMenuModule,
  ModalModule,
  IconModule,
  InputCheckboxModule,
  LoadButtonModule,
  EmptyStateModule,
  LoadingIndicatorModule,
  TooltipModule,
  KeyboardClickModule,
  BaseConversationsListFeatureModule,
];

const innerModules = [
  MessagesRequestErrorModule,
  PreventBubbleDownModule,
  MessagesConversationMessageModule,
  SharedMethodsModule,
];

const uiComponents = [
  MessagesClientInboxListCustomComponent,
  MessagesConversationsListWidgetAngCustomComponent,
  ConversationsListTableUiCustomComponent,
  ConversationsListTableHeadUiComponent,
  ConversationsListTableRowUiComponent,
];

const serviceDependencies = [
  MessagesClientInboxJourneyConfigService,
  SharedMethodsService,
  MessagesEncodingService,
  MessagesConversationsListFeatureService,
  MessagesConversationThreadFeatureService,
  MessagesManipulationConfirmModalService,
  MessagesUploadAttachmentsService,
  BaseConversationsListPropertiesService,
  MessagecenterHttpService,
];

export const mailboxTypeTitles = {
  inbox: $localize`:Client Inbox Journey - Inbox mailbox type@@messages-client-inbox-journey.inbox.mailbox-type:Inbox`,
  // eslint-disable-next-line max-len
  outbox: $localize`:Client Inbox Journey - Outbox mailbox type@@messages-client-inbox-journey.outbox.mailbox-type:Outbox`,
  // eslint-disable-next-line max-len
  drafts: $localize`:Client Inbox Journey - Drafts mailbox type@@messages-client-inbox-journey.drafts.mailbox-type:Drafts`,
};
export const internalMessageJourneyRoutes: Routes = [
  {
    path: '',
    component: MessagesClientInboxJourneyComponent,
    children: [
      { path: '', redirectTo: 'inbox/list', pathMatch: 'full' },
      {
        path: 'inbox',
        data: { title: mailboxTypeTitles.inbox },
        component: MessagesManageConversationsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            // component: MessagesClientInboxListComponent,
            component: MessagesClientInboxListCustomComponent,
            data: { mailboxType: 'inbox' },
          },
          {
            path: 'conversation',
            component: MessagesClientInboxThreadComponent,
            data: { mailboxTypeTitle: mailboxTypeTitles.inbox },
          },
        ],
      },
      {
        path: 'outbox',
        data: { title: mailboxTypeTitles.outbox },
        component: MessagesManageConversationsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            // component: MessagesClientInboxListComponent,
            component: MessagesClientInboxListCustomComponent,
            data: { mailboxType: 'outbox' },
          },
          {
            path: 'conversation',
            component: MessagesClientInboxThreadComponent,
            data: { mailboxTypeTitle: mailboxTypeTitles.outbox },
          },
        ],
      },
      {
        path: 'drafts',
        data: { title: mailboxTypeTitles.drafts },
        component: MessagesManageConversationsComponent,
        children: [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          {
            path: 'list',
            // component: MessagesClientInboxListComponent,
            component: MessagesClientInboxListCustomComponent,
            data: { mailboxType: 'drafts' },
          },
          {
            path: 'conversation',
            component: MessagesClientInboxThreadComponent,
            data: { mailboxTypeTitle: mailboxTypeTitles.drafts },
          },
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [...uiComponents],
  imports: [CommonModule, ...uiModules, ...innerModules],
  exports: [...uiComponents],
  providers: [...serviceDependencies],
})
export class MessagesClientInboxJourneyExtendedModule {
  static forRoot(
    data: { routes: Routes; [key: string]: any } = { routes: internalMessageJourneyRoutes },
  ): ModuleWithProviders<MessagesClientInboxJourneyExtendedModule> {
    return {
      ngModule: MessagesClientInboxJourneyExtendedModule,
      providers: [provideRoutes(data.routes)],
    };
  }
}
