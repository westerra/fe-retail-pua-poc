import { TestBed } from '@angular/core/testing';
import { ContactManagerJourneyBundleModule } from './bundle-contact-journey.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ContactManagerJourneyBundleModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ContactManagerJourneyBundleModule,
        HttpClientTestingModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
      ],
    });
  });

  it('initializes', () => {
    const module = TestBed.inject(ContactManagerJourneyBundleModule);
    expect(module).toBeTruthy();
  });
});
