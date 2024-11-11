import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { QuickActionsComponent } from './quick-actions.component';

const LINKS = [
  {
    menuIcon: 'settings',
    title: $localize`:Link Title|Manage accounts@@accounts.quick-actions.span.manageAccounts:Manage Accounts`,
    url: '/my-accounts/manage',
  },
  // {
  //   menuIcon: 'flight',
  //   title: $localize`:Link Title|Set travel notice@@accounts.quick-actions.span.setTravelNotice:Set Travel Notice`,
  //   url: '/self-service/manage-cards/travel-notice',
  // },
  {
    menuIcon: 'receipt',
    title: $localize`:Link Title|Pay a bill@@accounts.quick-actions.span.payABill:Pay a Bill`,
    url: '/billpay/pay-bills',
  },
];

describe('QuickActionsComponent', () => {
  let quickActionsComponent: ComponentFixture<QuickActionsComponent>;
  let router: Router;
  let component;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuickActionsComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    quickActionsComponent = TestBed.createComponent(QuickActionsComponent);
    component = quickActionsComponent.componentInstance;
    quickActionsComponent.detectChanges();

    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(quickActionsComponent).toBeTruthy();
  });

  it('navigation items should be displayed', () => {
    component.links = LINKS;
    quickActionsComponent.detectChanges();

    const navigationItems = quickActionsComponent.debugElement.queryAll(By.css('.bb-navigation-item'));
    expect(navigationItems.length).toBe(LINKS.length);
  });
});
