import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutService } from '@backbase/ui-ang/layout';
import { RetailLayoutComponent } from './retail-layout.component';
import { Title } from '@angular/platform-browser';
import '@angular/localize/init';
import { MediaQueryService } from '@backbase/ui-ang/media-query-lib';
import { CssVariablesService } from '@backbase/ui-ang/css-variables-lib';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateTimeProvider, OAuthLogger, OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { SharedUserContextService, UserContextConfigurationToken } from '@backbase/shared/feature/user-context';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BACKBASE_APP_VERSION, BackbaseVersionConfig } from '@backbase/shared/util/app-core';

describe('RetailLayoutComponent', () => {
  let layoutComponentFixture: ComponentFixture<RetailLayoutComponent>;
  let router: Router;
  const routerEvent$ = new BehaviorSubject<RouterEvent>(null);
  let component;
  let oAuthService;
  let version: BackbaseVersionConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetailLayoutComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            outlet: 'primary',
            firstChild: {
              snapshot: {
                data: {},
              },
              outlet: 'primary',
            } as ActivatedRoute,
            snapshot: {
              data: {
                title: 'test',
              },
            },
          },
        },
        {
          provide: BACKBASE_APP_VERSION,
          useValue: {
            appVersion: 'xxx',
            calendarVersion: '2022.xx',
          },
        },
        {
          provide: OAuthService,
          useValue: {
            logOut: () => jasmine.createSpy(),
          },
        },
        LayoutService,
        Title,
        MediaQueryService,
        CssVariablesService,
        UrlHelperService,
        OAuthLogger,
        DateTimeProvider,
        SharedUserContextService,
        { provide: UserContextConfigurationToken, useValue: 'test' },
      ],
    }).compileComponents();

    layoutComponentFixture = TestBed.createComponent(RetailLayoutComponent);
    component = layoutComponentFixture.debugElement.componentInstance;

    router = TestBed.inject(Router);

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (<any>router).events = routerEvent$.asObservable();

    layoutComponentFixture.detectChanges();

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    (<any>router).events = routerEvent$.asObservable();

    oAuthService = TestBed.inject(OAuthService);

    version = TestBed.inject(BACKBASE_APP_VERSION);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should read the version', () => {
    expect(version.calendarVersion).toBe('2022.xx');
    expect(component.appVersion).toBe('2022.xx');
  });

  it('routeData should not empty', () => {
    component.ngOnInit();
    expect(component.routeData$).toBeTruthy();
  });

  it('displayNotificationSettingsButton should set correctly', () => {
    component.displayNotificationSettingsButton = true;
    layoutComponentFixture.detectChanges();

    expect(component.displayNotificationSettingsButton).toEqual(true);
  });

  it('should invoke logout', () => {
    const logOutSpy = spyOn(oAuthService, 'logOut');
    component.logout();
    expect(logOutSpy).toHaveBeenCalled();
  });
});
