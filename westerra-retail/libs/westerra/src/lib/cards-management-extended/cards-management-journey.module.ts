import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsListViewComponent } from './cards-list-view/cards-list-view.component';
import { CardsDetailViewComponent } from './cards-detail-view/cards-detail-view.component';
import { CardsManagementJourneyComponent } from './cards-management-journey.component';
import { CardsTravelNoticeViewComponent, CardsManagementTravelNoticeGuard, CardsSharedDataAccessModule, CardDetailsFeatureModule, CardsTravelNoticeModule } from '@backbase/cards-management-journey-ang';
import { RouterModule, Routes, provideRoutes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderModule } from '@backbase/ui-ang/header';




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
    CardDetailsFeatureModule,
    CardsTravelNoticeModule
  ],
  providers: [CardsManagementTravelNoticeGuard],

})

export class CardsManagementJourneyModule {
  static forRoot(data = { route: defaultRoute }) {
    return {
      ngModule: CardsManagementJourneyModule,
      providers: [provideRoutes([data.route] as Routes)],
    };
  }
}
