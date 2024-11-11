import { NgModule } from '@angular/core';
import {
  ARRANGEMENT_MANAGER_JOURNEY_BASE_PATH,
  AuthorizedUsersJourneyConfiguration,
  AuthorizedUsersJourneyConfigurationToken,
  AuthorizedUsersJourneyModule,
  AUTHORIZED_USER_JOURNEY_BASE_PATH,
  DEFAULT_UI_LEVELS_CONFIG,
  DEFAULT_UI_PERMISSIONS_CONFIG,
  LevelsMappingConfigImplementation,
} from '@backbase/authorized-users-journey-ang';
import { APP_ARRANGEMENT_MANAGER_BASE_PATH, APP_AUTHORIZED_USERS_BASE_PATH } from '../../service-paths.module';

@NgModule({
  imports: [AuthorizedUsersJourneyModule.forRoot()],
  providers: [
    {
      provide: AuthorizedUsersJourneyConfigurationToken,
      useValue: {
        levelsConfig: {
          mappings: new LevelsMappingConfigImplementation(),
          uiConfig: {
            ...DEFAULT_UI_LEVELS_CONFIG,
            ...DEFAULT_UI_PERMISSIONS_CONFIG,
          },
        } as Partial<AuthorizedUsersJourneyConfiguration<any, any>>,
      },
    },
    {
      provide: AUTHORIZED_USER_JOURNEY_BASE_PATH,
      useExisting: APP_AUTHORIZED_USERS_BASE_PATH,
    },
    {
      provide: ARRANGEMENT_MANAGER_JOURNEY_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
})
export class AuthorizedUsersJourneyBundleModule {}
