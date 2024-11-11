import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { APP_ARRANGEMENT_MANAGER_BASE_PATH } from '../../../service-paths.module';
import { AccountsTransactionsJourneyBundleModule } from './wrapper-accounts-transactions-journey.module';

describe('AccountsTransactionsJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        AccountsTransactionsJourneyBundleModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        {
          provide: APP_ARRANGEMENT_MANAGER_BASE_PATH,
          useValue: 'test',
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(AccountsTransactionsJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});
