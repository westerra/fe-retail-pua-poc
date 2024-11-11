/* eslint-disable import/no-extraneous-dependencies */
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  combineLatest,
  delay,
  distinctUntilChanged,
  map,
  Observable,
  of,
  ReplaySubject,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import { getErrorMessage } from '@backbase/internal-at-shared-data-access-ang';
import { isEqual } from '@backbase/internal-at-shared-util-ang';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Data state service
 */
@Injectable({
  providedIn: 'root',
})
export class AccountsDataService<Data, Props> implements OnDestroy {
  private _isLoading$: BehaviorSubject<boolean>;
  private _loadingError$: BehaviorSubject<any>;
  private _requestParameters$: ReplaySubject<unknown>;
  _refresh$: BehaviorSubject<boolean>;
  /**
   * Indicates whether data loading is in progresss
   */
  readonly isLoading$: Observable<boolean>;
  /**
   * Stores the error occured during data loading
   */
  readonly loadingError$: Observable<HttpErrorResponse | undefined>;
  /**
   * Stores the error message of error occured during data loading
   */
  readonly loadingErrorMessage$: Observable<string | undefined>;
  /**
   * Data state
   */
  readonly data$: Observable<Data | undefined>;
  constructor() {
    this._isLoading$ = new BehaviorSubject(false);
    this._loadingError$ = new BehaviorSubject(undefined);
    this._requestParameters$ = new ReplaySubject();
    this._refresh$ = new BehaviorSubject(true);
    /**
     * Indicates whether data loading is in progresss
     */
    this.isLoading$ = this._isLoading$.pipe(delay(0));
    /**
     * Stores the error occured during data loading
     */
    this.loadingError$ = this._loadingError$.pipe(delay(0));
    /**
     * Stores the error message of error occured during data loading
     */
    this.loadingErrorMessage$ = this._loadingError$.pipe(map((error) => error && getErrorMessage(error)));
    /**
     * Data state
     */
    this.data$ = combineLatest([
      this._requestParameters$.pipe(
        distinctUntilChanged((previousValue: never, value) => isEqual(previousValue, value)),
      ),
      this._refresh$,
    ]).pipe(
      tap(() => {
        this._isLoading$.next(true);
        this._loadingError$.next(undefined);
      }),
      switchMap(([requestParameters]) =>
        this.getData$(requestParameters).pipe(
          catchError((error) => {
            this._loadingError$.next(error);
            return of(undefined);
          }),
        ),
      ),
      scan((cachedData, data) => this.mergeData(cachedData, data)),
      tap(() => this._isLoading$.next(false)),
      shareReplay({ bufferSize: 1, refCount: true }),
    );
  }
  /**
   * @internal
   */
  ngOnDestroy() {
    this._loadingError$.complete();
    this._isLoading$.complete();
    this._requestParameters$.complete();
    this._refresh$.complete();
  }
  /*
   * Set request parameters
   */
  setRequestParameters(requestParameters) {
    this._requestParameters$.next(requestParameters);
  }
  /*
   * Set request parameters
   */
  subscribeToRequestParameters(requestParameters$) {
    requestParameters$.subscribe(this._requestParameters$);
  }
  /*
   * Refreshes the list of product kinds
   */
  refreshData() {
    this._refresh$.next(true);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getData$(_parameters) {
    return of(undefined);
  }
  mergeData(_cachedData, data) {
    return data;
  }
}
