import { Component,  } from '@angular/core';
import { AccountStatementRetailJourneyConfigurationService } from '@backbase/account-statement-retail-journey-ang';
import { Observable } from 'rxjs';

@Component({
  selector: 'bb-account-statement-retail-journey',
  templateUrl: './account-statement-journey.component.html',
  providers: [AccountStatementRetailJourneyConfigurationService]
})
export class AccountStatementJourneyComponent {
  config;
  title$: Observable<string | undefined>;
  showManageStatementsNavigation$: Observable<boolean>;
  manageStatementsNavigationUrl$: Observable<string>;
  entitlementsRequired$: Observable<string>;
  constructor(
    config: AccountStatementRetailJourneyConfigurationService
  ) {
    this.config = config
    this.title$ = this.config.title;
    this.showManageStatementsNavigation$ = this.config.showManageStatementsNavigation;
    this.manageStatementsNavigationUrl$ = this.config.manageStatementsNavigationUrl;
    // this.entitlementsRequired$ = this.config.hideManageStatementsNavigationWhenMissingPermissions.pipe(map((hide) => `AccountStatements.ManageStatements.${hide ? 'edit' : 'view'}`));
  }
}
