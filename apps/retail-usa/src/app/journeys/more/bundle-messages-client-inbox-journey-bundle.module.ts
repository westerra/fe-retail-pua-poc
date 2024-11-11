import { NgModule, Provider } from '@angular/core';
import {
  MessagesClientInboxJourneyModule,
  MESSAGES_CLIENT_INBOX_JOURNEY_MESSAGES_BASE_PATH,
  MessagesClientInboxJourneyConfigurationToken,
  MessagesClientInboxJourneyConfiguration,
} from '@backbase/messages-client-inbox-journey-ang';
import { APP_MESSAGES_BASE_PATH } from '../../service-paths.module';
import { MessagesClientInboxJourneyExtendedModule } from '@backbase/westerra';

const CustomMessagesClientInboxJourneyConfiguration: Array<Provider> = [
  {
    provide: MessagesClientInboxJourneyConfigurationToken,
    useValue: {
      // customerServiceTitle: string;
      // hideAssignedToColumn: false,
      // maxAttachmentSize: '2',
      replyMessageMaxLength: '2000',
      maxSubjectLength: 1000,
      maxMessageLength: 2000,
    } as Partial<MessagesClientInboxJourneyConfiguration>,
  },
  {
    provide: MESSAGES_CLIENT_INBOX_JOURNEY_MESSAGES_BASE_PATH,
    useExisting: APP_MESSAGES_BASE_PATH,
  },
];

@NgModule({
  imports: [
    // MessagesClientInboxJourneyModule.forRoot(),
    MessagesClientInboxJourneyExtendedModule.forRoot(),
  ],
  providers: [
    // {
    //   provide: MESSAGES_CLIENT_INBOX_JOURNEY_MESSAGES_BASE_PATH,
    //   useExisting: APP_MESSAGES_BASE_PATH,
    // },
    CustomMessagesClientInboxJourneyConfiguration,
  ],
})
export class MessagesClientInboxJourneyBundleModule {}
