import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ACTIVITY_MONITOR_CONFIG, ActivityMonitorConfig, ActivityMonitorService } from '@backbase/identity-auth';
import { HeaderModule } from '@backbase/ui-ang/header';
import { ModalModule } from '@backbase/ui-ang/modal';
import { ActivityMonitorComponent } from './container/activity-monitor.component';
import { ActivityMonitorLayoutComponent } from './layout/activity-monitor-layout.component';

const activityMonitorConfig: ActivityMonitorConfig = {
  maxInactivityDuration: 900,
  countdownDuration: 60,
};

const uiModules = [ModalModule, HeaderModule];

@NgModule({
  imports: [CommonModule, ...uiModules],
  declarations: [ActivityMonitorLayoutComponent, ActivityMonitorComponent],
  providers: [
    ActivityMonitorService,
    {
      provide: ACTIVITY_MONITOR_CONFIG,
      useValue: activityMonitorConfig,
    },
  ],
  exports: [ActivityMonitorComponent],
})
export class ActivityMonitorModule {}
