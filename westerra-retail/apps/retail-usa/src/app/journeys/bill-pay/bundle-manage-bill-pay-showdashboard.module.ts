import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayverisModuleModule } from '@backbase/westerra';
import { Route } from '@angular/router';

@NgModule({
  imports: [PayverisModuleModule.forRoot()],
  declarations: [],
})
export class BundleManageBillPayShowdashboardModule {}
