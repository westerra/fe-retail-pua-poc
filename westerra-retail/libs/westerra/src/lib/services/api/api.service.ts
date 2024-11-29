import { Injectable } from '@angular/core';
import { SsoService } from './sso/sso.service';
import { ApiServiceModule } from './../api/api.module';

@Injectable({
  providedIn: ApiServiceModule,
})
export class ApiService {
  constructor(public readonly sso: SsoService) {}
}
