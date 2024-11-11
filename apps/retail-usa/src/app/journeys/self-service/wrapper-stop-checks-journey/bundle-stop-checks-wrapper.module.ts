import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  StopChecksJourneyConfiguration,
  StopChecksJourneyConfigurationToken,
  STOP_CHECKS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
  STOP_CHECKS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
  STOP_CHECKS_JOURNEY_STOP_CHECKS_BASE_PATH,
} from '@backbase/stop-checks-journey-ang';
import { ButtonModule } from '@backbase/ui-ang/button';
import { HeaderModule } from '@backbase/ui-ang/header';
import { IconModule } from '@backbase/ui-ang/icon';
import {
  APP_ARRANGEMENT_MANAGER_BASE_PATH,
  APP_PAYMENT_ORDER_BASE_PATH,
  APP_STOP_CHECKS_BASE_PATH,
} from '../../../service-paths.module';
import { StopChecksJourneyWrapperComponent } from './stop-checks-journey-wrapper.component';

@NgModule({
  declarations: [StopChecksJourneyWrapperComponent],
  providers: [
    {
      provide: StopChecksJourneyConfigurationToken,
      useValue: { shouldDisplayHeading: false } as StopChecksJourneyConfiguration,
    },
    {
      provide: STOP_CHECKS_JOURNEY_PAYMENT_ORDER_BASE_PATH,
      useExisting: APP_PAYMENT_ORDER_BASE_PATH,
    },
    {
      provide: STOP_CHECKS_JOURNEY_STOP_CHECKS_BASE_PATH,
      useExisting: APP_STOP_CHECKS_BASE_PATH,
    },
    {
      provide: STOP_CHECKS_JOURNEY_ARRANGEMENT_MANAGER_BASE_PATH,
      useExisting: APP_ARRANGEMENT_MANAGER_BASE_PATH,
    },
  ],
  imports: [
    IconModule,
    HeaderModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        component: StopChecksJourneyWrapperComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('../bundle-stop-checks.module').then((m) => m.StopChecksJourneyBundleModule),
          },
        ],
      },
    ]),
  ],
})
export class StopChecksJourneyWrapperBundleModule {}
