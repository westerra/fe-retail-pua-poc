import { InjectionToken, ModuleWithProviders, NgModule, Optional } from '@angular/core';
import {
  createServiceDataHttpConfig,
  DataHttpModule,
  DATA_HTTP_CONFIG,
  ServiceDataHttpConfig,
} from '@backbase/foundation-ang/data-http';
import { WESTERRA_DATA_SERVICE } from './api.models';

export function createSSODataServiceDataHttpConfig(
  globalConfig: ServiceDataHttpConfig,
  serviceConfig?: Partial<ServiceDataHttpConfig>,
) {
  return createServiceDataHttpConfig(globalConfig, serviceConfig ? serviceConfig : { servicePath: '' });
}

@NgModule({
  imports: [DataHttpModule],
  providers: [
    {
      provide: WESTERRA_DATA_SERVICE,
      useFactory: createSSODataServiceDataHttpConfig,
      deps: [DATA_HTTP_CONFIG, [new Optional(), WESTERRA_DATA_SERVICE]],
    },
  ],
})
export class ApiServiceModule {
  static forRoot(config: Partial<ServiceDataHttpConfig>): ModuleWithProviders<ApiServiceModule> {
    return {
      ngModule: ApiServiceModule,
      providers: [
        {
          provide: WESTERRA_DATA_SERVICE,
          useValue: config,
        },
      ],
    };
  }
}
