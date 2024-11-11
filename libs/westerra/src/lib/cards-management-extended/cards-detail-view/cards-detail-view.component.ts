import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CardsManagementJourneyConfigService } from '@backbase/cards-management-journey-ang';

@Component({
  selector: 'bb-cards-detail-view',
  templateUrl: './cards-detail-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardsDetailViewComponent implements OnInit {

  // @Input() headingClasses;
  // @Input() headingType;
  // @Input() heading;

  configService: any;
  router: any;
  route: any;

  constructor(router: Router, route: ActivatedRoute, configService: CardsManagementJourneyConfigService){
    this.router = router;
    this.route = route;
    this.configService = configService;
  }


  ngOnInit(): void {
  }


  onNavigateBack() {
    this.router.navigate(['../list'], { relativeTo: this.route });
  }


}
