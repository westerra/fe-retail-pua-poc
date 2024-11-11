import { NgModule } from '@angular/core';
import { DataHttpModule } from '@backbase/foundation-ang/data-http';
import { EnrollmentsService } from './generated/services/EnrollmentsService';

@NgModule({
    imports: [
        DataHttpModule
    ],
    providers: [
        EnrollmentsService
    ]
})

export class EnrollmentApiServiceModule {
}