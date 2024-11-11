import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardsManagementJourneyRoutingModule } from './cards-management-journey-routing.module';
import { CardsListViewComponent } from './cards-list-view/cards-list-view.component';
import { CardsDetailViewComponent } from './cards-detail-view/cards-detail-view.component';
import { CardsManagementJourneyComponent } from './cards-management-journey.component';
import { CardDetailsFeatureModule, CardsListFeatureModule, CardsTravelNoticeModule, } from '@backbase/cards-management-journey-feature';
import { CardsTravelNoticeViewComponent, CardsManagementTravelNoticeGuard } from '@backbase/cards-management-journey-ang';
import { RouterModule, provideRoutes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '@backbase/ui-ang/header';
import { CardsSharedDataAccessModule } from '@backbase/cards-shared-data-access';
import { CardsHttpService } from '@backbase/cards-http-ang';


export const defaultRoute = {
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
  declarations: [CardsListViewComponent, CardsDetailViewComponent, CardsManagementJourneyComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HeaderModule,
    CardsSharedDataAccessModule,
    CardsListFeatureModule,
    CardDetailsFeatureModule,
    CardsTravelNoticeModule
  ],
  providers: [CardsManagementTravelNoticeGuard, CardsHttpService],

})

export class CardsManagementJourneyModule {
  static forRoot(data = { route: defaultRoute }) {
    return {
      ngModule: CardsManagementJourneyModule,
      providers: [provideRoutes([data.route])],
    };
  }
}
