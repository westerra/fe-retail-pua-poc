import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardsManagementJourneyConfigService } from '@backbase/cards-management-journey-ang';

@Component({
  selector: 'bb-cards-list-view',
  templateUrl: './cards-list-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsListViewComponent{
  router: Router;
  route: ActivatedRoute;
  configService: CardsManagementJourneyConfigService;

  constructor(router: Router, route: ActivatedRoute, configService: CardsManagementJourneyConfigService) {
    this.router = router;
    this.route = route;
    this.configService = configService;
  }

  selectedCard(id) {
    this.router.navigate(['../details', { selectedCard: id }], {
      relativeTo: this.route,
    });
  }
  onNavigateTravelNotice() {
    this.router.navigate(['../travel-notice'], { relativeTo: this.route });
  }
}
