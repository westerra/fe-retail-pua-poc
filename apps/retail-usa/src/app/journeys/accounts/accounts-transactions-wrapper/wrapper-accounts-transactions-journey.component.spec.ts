import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountsTransactionsJourneyWrapperComponent } from './wrapper-accounts-transactions-journey.component';
import '@angular/localize/init';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RemoteConfigConfigurationToken, RemoteConfigModule } from '@backbase/remote-config-ang';
import { remoteConfigDefaults } from '../../../remote-config/remote-config';

describe('AccountsTransactionsJourneyWrapperComponent', () => {
  let component: AccountsTransactionsJourneyWrapperComponent;
  let fixture: ComponentFixture<AccountsTransactionsJourneyWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, RemoteConfigModule],
      declarations: [AccountsTransactionsJourneyWrapperComponent],
      providers: [
        {
          provide: RemoteConfigConfigurationToken,
          useValue: {
            appName: 'dummy-retail-web',
            appVersion: '0.0.7',
            defaults: remoteConfigDefaults,
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(AccountsTransactionsJourneyWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not show the maintenance banner after dismiss', () => {
    component.remoteConfigParameters.showMaintenanceBanner = true;

    component.hideMaintenanceBanner();

    fixture.detectChanges();

    const maintenanceBanner: HTMLElement = fixture.nativeElement.querySelector('[title="Maintenance alert"]');

    expect(component.remoteConfigParameters.showMaintenanceBanner).toBeFalse();
    expect(maintenanceBanner).toBeNull();
  });
});
