import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes } from '@angular/router';
import {  AccountStatementRetailViewComponent } from '@backbase/account-statement-retail-journey-ang';
import { EntitlementsGuard } from '@backbase/foundation-ang/entitlements';
import { AccountStatementJourneyComponent } from './account-statement-journey.component';


const routes: Routes = [];

export const accountStatementRetailJourney: Route = {
  path: '',
  component: AccountStatementJourneyComponent,
  canActivate: [EntitlementsGuard],
  data: {
    entitlements: 'AccountStatements.ManageStatements.view',
  },
  children: [
    {
      path: '',
      component: AccountStatementRetailViewComponent,
    },
    { path: '**', redirectTo: '', pathMatch: 'full' },
  ],
};

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountStatementJourneyRoutingModule { }