import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  ActionsProductNotificationsSettingsRouterService,
  ActionsProductNotificationsSettingsDataService,
  ActionsProductNotificationsSettingsPropertiesService,
} from '@backbase/actions-retail-notification-preferences-journey-data-access';
import { ActionsStoreModel } from '@backbase/actions-shared-data-access';
import { SpecificationsWithAction, SpecificationIds, getPropertyValue } from '@backbase/actions-shared-util';
import { AccountArrangementItem } from '@backbase/arrangement-manager-http-ang';
import { BehaviorSubject, Observable, combineLatest, of } from 'rxjs';
import {
  catchError,
  first,
  map,
  mapTo,
  publishReplay,
  refCount,
  startWith,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'bb-actions-product-settings-page-custom',
  templateUrl: './actions-product-settings-page-custom.component.html',
})
export class ActionsProductSettingsPageCustomComponent implements OnInit {
  private readonly notificationDismissTime$$;
  private readonly specificationIDs$$;
  /**
   * Stream of account arrangement item data.
   */
  readonly account$: Observable<AccountArrangementItem>;
  private readonly accountId$;
  /**
   * Stream of Specifications with action recipe.
   */
  readonly specificationsWithActionRecipe$?: Observable<SpecificationsWithAction>;
  /**
   * Stream of loading flag indicators.
   */
  readonly isLoading$: Observable<boolean>;
  private readonly hasAccountLoadingError;
  /**
   * Stream of loading errors.
   */
  readonly loadingError$: Observable<boolean | Error | undefined>;
  /**
   * Specification IDs enum.
   */
  readonly specificationIds: typeof SpecificationIds;
  /**
   * Error notification header template.
   */
  @ViewChild('errorNotificationHeader', { read: TemplateRef, static: false })
  errorNotificationHeaderTemplate: TemplateRef<any>;
  /**
   * Error notification message template.
   */
  @ViewChild('errorNotificationMessage', { read: TemplateRef, static: false })
  errorNotificationMessageTemplate: TemplateRef<any>;
  constructor(
    public store: ActionsStoreModel,
    public routerService: ActionsProductNotificationsSettingsRouterService,
    public widgetDataService: ActionsProductNotificationsSettingsDataService,
    public widgetPropertiesService: ActionsProductNotificationsSettingsPropertiesService,
  ) {
    // this.store = store;
    // this.routerService = routerService;
    // this.widgetDataService = widgetDataService;
    // this.widgetPropertiesService = widgetPropertiesService;
    this.notificationDismissTime$$ = new BehaviorSubject(undefined);
    this.specificationIDs$$ = new BehaviorSubject(undefined);
    /**
     * Stream of Specifications with action recipe.
     */
    this.specificationsWithActionRecipe$ = this.store.specificationsWithActionRecipe$;
    this.hasAccountLoadingError = new BehaviorSubject(false);
    /**
     * Stream of loading errors.
     */
    this.loadingError$ = combineLatest([
      this.store.actionRecipesError$,
      this.store.specificationsError$,
      this.hasAccountLoadingError,
    ]).pipe(map((errors) => errors.find(Boolean)));
    /**
     * Specification IDs enum.
     */
    this.specificationIds = SpecificationIds;
    this.accountId$ = this.routerService.selectedAccountId$;
    this.account$ = this.accountId$.pipe(
      switchMap((id) => this.getAccount(id)),
      publishReplay(),
      refCount(),
    );
    this.isLoading$ = combineLatest([
      this.store.actionRecipesLoading$,
      this.store.specificationsLoading$,
      this.account$.pipe(mapTo(false), startWith(true)),
    ]).pipe(
      map((loadings) => {
        // return false;
        return loadings.some(Boolean);
      }),
    );
  }
  /**
   * Notification dismiss time value setter.
   * Configurable via model property.
   */
  @Input() set notificationDismissTime(value: number | undefined) {
    this.notificationDismissTime$$.next(value);
  }
  /**
   * Specification IDs value setter.
   * Configurable via model property.
   */
  @Input() set specificationIDs(value: string[] | undefined) {
    this.specificationIDs$$.next(value);
  }
  ngOnInit() {
    const specificationIdsStream = getPropertyValue(
      this.specificationIDs$$,
      this.widgetPropertiesService.getSpecificationIDs(),
    );
    this.accountId$.pipe(first(), withLatestFrom(specificationIdsStream)).subscribe(([accountId, specificationIDs]) => {
      const specificationIDsSet: Set<string> = new Set(specificationIDs);
      this.store.dispatchLoadSpecifications({ specificationIds: specificationIDsSet });
      this.store.dispatchLoadActionRecipes({
        specificationIds: specificationIDsSet,
        arrangementId: accountId,
      });
    });
  }
  /**
   * Method to submit action recipe form.
   *
   * @param formValue - action recipe form value
   */
  onSubmit(formValue) {
    const notificationDismissTime$ = getPropertyValue(
      this.notificationDismissTime$$,
      this.widgetPropertiesService.getNotificationDismissTimeProperty(),
    );
    combineLatest([this.accountId$, notificationDismissTime$])
      .pipe(first())
      .subscribe(([arrangementId, ttl]: any) => {
        const errorNotification: Notification | any = {
          header: Object.create(this.errorNotificationHeaderTemplate),
          message: Object.create(this.errorNotificationMessageTemplate),
          modifier: 'error',
          ttl,
        };
        this.store.dispatchSaveActionRecipe({
          actionRecipe: formValue,
          arrangementId,
          warningNotification: errorNotification,
        });
      });
  }
  getAccount(id) {
    return this.widgetDataService.getAccountById(id).pipe(
      catchError(() => {
        this.hasAccountLoadingError.next(true);
        return of({});
      }),
    );
  }
}
