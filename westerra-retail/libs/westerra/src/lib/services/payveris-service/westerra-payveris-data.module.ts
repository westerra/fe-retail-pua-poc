import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, Optional } from '@angular/core';
import {
  createServiceDataHttpConfig,
  DATA_HTTP_CONFIG,
  DataHttpModule,
  ServiceDataHttpConfig,
} from '@backbase/foundation-ang/data-http';
import { WESTERRA_PAYVERIS_DATA_CONFIG, WesterraPayverisDataService } from './westerra-payveris-data-service.service';
export const CONFIG_VALUE = new InjectionToken('westerra-payveris-data Data Service :: Custom Http Config');
export function createWesterraPayverisDataServiceDataHttpConfig(
  globalConfig: ServiceDataHttpConfig,
  serviceConfig?: Partial<ServiceDataHttpConfig>,
) {
  return createServiceDataHttpConfig(globalConfig, serviceConfig ? serviceConfig : { servicePath: '' });
}
@NgModule({
  declarations: [],
  imports: [CommonModule, DataHttpModule],
  providers: [
    WesterraPayverisDataService,
    {
      provide: WESTERRA_PAYVERIS_DATA_CONFIG,
      useFactory: createWesterraPayverisDataServiceDataHttpConfig,
      deps: [DATA_HTTP_CONFIG, [new Optional(), CONFIG_VALUE]],
    },
  ],
})
export class WesterraPayverisDataModule {
  static forRoot(config: Partial<ServiceDataHttpConfig>): ModuleWithProviders<WesterraPayverisDataModule> {
    return {
      ngModule: WesterraPayverisDataModule,
      providers: [
        {
          provide: CONFIG_VALUE,
          useValue: config,
        },
      ],
    };
  }
}
