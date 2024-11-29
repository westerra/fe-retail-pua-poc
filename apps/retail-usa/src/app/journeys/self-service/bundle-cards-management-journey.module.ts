/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import {
  CardsManagementJourneyModule,
  CARDS_MANAGEMENT_JOURNEY_CARDS_BASE_PATH,
  CardsManagementTravelNoticeGuard,
  TravelNoticeListViewComponent,
  TravelNoticeCreateViewComponent,
  CardProductsViewComponent,
  ENTITLEMENT_PERMISSIONS,
  CardProductConfirmationViewComponent,
  CardDeliveryConfirmationGuard,
} from '@backbase/cards-management-journey-ang';
import { APP_CARDS_BASE_PATH } from '../../service-paths.module';
import { CardsDetailViewComponent, CardsListViewComponent } from '@backbase/westerra';
import { Route } from '@angular/router';


const defaultRoutes: Route[] = [
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
    canActivate: [CardsManagementTravelNoticeGuard],
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: TravelNoticeListViewComponent,
      },
      {
        path: 'create',
        component: TravelNoticeCreateViewComponent,
      },
    ],
  },
  {
    path: 'create-new-card',
    component: CardProductsViewComponent,
    data: {
      entitlements: ENTITLEMENT_PERMISSIONS.canCreateCard,
    },
  },
  {
    path: 'card-confirmation',
    component: CardProductConfirmationViewComponent,
    canActivate: [CardDeliveryConfirmationGuard],
    data: {
      entitlements: ENTITLEMENT_PERMISSIONS.canCreateCard,
    },
  },
];



@NgModule({
  imports: [CardsManagementJourneyModule.forRoot({ routes: defaultRoutes })],
  providers: [
    {
      provide: CARDS_MANAGEMENT_JOURNEY_CARDS_BASE_PATH,
      useExisting: APP_CARDS_BASE_PATH,
    },
  ],
})
export class CardsManagementJourneyBundleModule { }
