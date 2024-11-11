/*
 *
 *
 *
 *
 *
 *         WARNING: Editing this file may prevent future updates.
 *                  To maintain easy upgradability, do not edit this file.
 *
 *
 *
 *
 *
 */
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { LayoutService } from '@backbase/ui-ang/layout';
import { ErrorState } from 'libs/westerra/src/lib/services/api/api.models';
import { SsoService } from 'libs/westerra/src/lib/services/api/sso/sso.service';
import { filter, map } from 'rxjs';

@Component({
  selector: 'bb-app-maintenance',
  templateUrl: './maintenance.component.html',
})
export class MaintenanceComponent implements OnInit {
  readonly notificationsAllowedRoutes = 'conversation-view, arrangement-view, transaction-view';
  showError = false;
  errorMessage = '';
  link = '';
  linkText = '';
  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly titleService: Title,
    public readonly layoutService: LayoutService,
    public appSsoStateService: SsoService,
    private cdf: ChangeDetectorRef,
  ) {}
  ngOnInit() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          // find first route with a title set (if any)
          let lastRouteWithTitle = route;
          while (route.firstChild) {
            route = route.firstChild;
            if (this.getTitle(route)) {
              lastRouteWithTitle = route;
            }
          }
          return lastRouteWithTitle;
        }),
        filter((route: any) => route.outlet === 'primary'),
        map((route: any) => this.getTitle(route)),
        filter((title): title is string => title !== undefined),
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });

    this.appSsoStateService.clearState();
    this.appSsoStateService.errorState$.subscribe((data: ErrorState) => {
      if (data.error) {
        this.router.navigateByUrl('/accounts');
        this.showError = true;
        this.errorMessage = data.error.message;
        this.link = data.error?.link!;
        this.linkText = data.error?.linkText!;
        this.cdf.detectChanges();

        setTimeout(() => {
          this.showError = false;
          this.errorMessage = '';
          this.appSsoStateService.clearState();
        }, 10000);
      }
    });
  }

  private getTitle(route: ActivatedRoute): string | undefined {
    const routeData = route.snapshot.data;
    return routeData?.title ? routeData?.title : routeData?.custom?.title;
    // return routeData?.custom?.title;
  }
}
