import { NgModule } from '@angular/core';

import {
  CampaignSpaceConfiguration,
  CampaignSpaceConfigurationToken,
  CampaignSpaceModule,
  CAMPAIGN_JOURNEY_ENGAGEMENT_BASE_PATH,
} from '@backbase/campaign-space-ang';
import { APP_ENGAGEMENT_BASE_PATH } from '../../../service-paths.module';

@NgModule({
  imports: [CampaignSpaceModule],
  exports: [CampaignSpaceModule],
  providers: [
    {
      provide: CAMPAIGN_JOURNEY_ENGAGEMENT_BASE_PATH,
      useExisting: APP_ENGAGEMENT_BASE_PATH,
    },
    {
      provide: CampaignSpaceConfigurationToken,
      useValue: {
        portalName: 'backbase-wc3:backbase-wc3:0',
        locale: 'en-US',
        designMode: false,
      } as CampaignSpaceConfiguration,
    },
  ],
})
export class CampaignSpaceJourneyBundleModule {}
