import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InjectionToken, ModuleWithProviders, Optional } from "@angular/core";
import { createServiceDataHttpConfig, DATA_HTTP_CONFIG, DataHttpModule, ServiceDataHttpConfig } from "@backbase/foundation-ang/data-http";
import { WesterraAmplifiDataService } from './westerra-amplifi-data.service';
import { CONFIG_VALUE, WESTERRA_AMPLIFI_DATA_CONFIG } from '../api/api.models';

export function createWesterraEnrollmentDataServiceDataHttpConfig(globalConfig: ServiceDataHttpConfig, serviceConfig?: Partial<ServiceDataHttpConfig>) {
    return createServiceDataHttpConfig(globalConfig, serviceConfig ? serviceConfig : { "servicePath": "" });
}
@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DataHttpModule
    ],
    providers: [
        WesterraAmplifiDataService, 
        {
           provide: WESTERRA_AMPLIFI_DATA_CONFIG,
           useFactory: createWesterraEnrollmentDataServiceDataHttpConfig,
           deps: [DATA_HTTP_CONFIG, [new Optional(), CONFIG_VALUE]],
        },
        {
        provide: WESTERRA_AMPLIFI_DATA_CONFIG,
        useValue: DATA_HTTP_CONFIG
        }
]
})
export class WesterraAmplifiDataModule {
    static forRoot(config: Partial<ServiceDataHttpConfig>): ModuleWithProviders<WesterraAmplifiDataModule> {
        return {
            ngModule: WesterraAmplifiDataModule,
            providers: [
                {
                    provide: CONFIG_VALUE,
                    useValue: config,
                },
            ],
        };
    }
}
