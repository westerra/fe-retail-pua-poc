import { TestBed } from '@angular/core/testing';
import {
  ActionsRetailNotificationPreferencesJourneyBundleModule,
  apiModeTypeGuard,
} from './bundle-actions-retail-notification-preferences-journey.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServicePathsModule } from '../../service-paths.module';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ActionsNotificationsPreferencesDataService } from '@backbase/actions-shared-data-access';

describe('ActionsRetailNotificationPreferencesJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        ActionsRetailNotificationPreferencesJourneyBundleModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
        ServicePathsModule,
      ],
      providers: [ActionsNotificationsPreferencesDataService],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(ActionsRetailNotificationPreferencesJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});

describe('apiModeTypeGuard', () => {
  it('should return should return engagements if no value', () => {
    expect(apiModeTypeGuard(undefined)).toBe('engagements');
  });

  it('apiModeTypeGuard should return correct value if value provided', () => {
    expect(apiModeTypeGuard('actions')).toBe('actions');
    expect(apiModeTypeGuard('engagements')).toBe('engagements');
  });
});
