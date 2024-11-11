import { NgModule } from '@angular/core';
import {
  CardsManagementJourneyModule,
  CARDS_MANAGEMENT_JOURNEY_CARDS_BASE_PATH,
  CardsManagementJourneyComponent,
  CardsTravelNoticeViewComponent,
  CardsManagementTravelNoticeGuard,
} from '@backbase/cards-management-journey-ang';
import { APP_CARDS_BASE_PATH } from '../../service-paths.module';
import { CardsDetailViewComponent, CardsListViewComponent } from '@backbase/westerra';

const defaultRoute = {
  path: '',
  component: CardsManagementJourneyComponent,
  children: [
    {
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    },
    {
      path: 'list',
      component: CardsListViewComponent,
    },
    {
      path: 'details',
      component: CardsDetailViewComponent,
    },
    {
      path: 'travel-notice',
      component: CardsTravelNoticeViewComponent,
      canActivate: [CardsManagementTravelNoticeGuard],
    },
  ],
};

@NgModule({
  imports: [CardsManagementJourneyModule.forRoot({ route: defaultRoute })],
  providers: [
    {
      provide: CARDS_MANAGEMENT_JOURNEY_CARDS_BASE_PATH,
      useExisting: APP_CARDS_BASE_PATH,
    },
  ],
})
export class CardsManagementJourneyBundleModule { }
