import { Component, OnInit } from '@angular/core';
import { AccountStatementRetailJourneyConfigurationService } from '@backbase/account-statement-retail-journey-ang';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'bb-account-statement-journey',
  templateUrl: './account-statement-journey.component.html',
  providers: [AccountStatementRetailJourneyConfigurationService]
})
export class AccountStatementJourneyComponent implements OnInit {

  config;
  title$: Observable<string | undefined>;
  showManageStatementsNavigation$: Observable<boolean>;
  manageStatementsNavigationUrl$: Observable<string>;
  entitlementsRequired$: Observable<string>;
  constructor(config: AccountStatementRetailJourneyConfigurationService) {
    this.config = config;
    this.title$ = this.config.title;
    this.showManageStatementsNavigation$ = this.config.showManageStatementsNavigation;
    this.manageStatementsNavigationUrl$ = this.config.manageStatementsNavigationUrl;
    this.entitlementsRequired$ = this.config.hideManageStatementsNavigationWhenMissingPermissions.pipe(map((hide) => `AccountStatements.ManageStatements.${hide ? 'edit' : 'view'}`));
  }

  ngOnInit(): void {}
}