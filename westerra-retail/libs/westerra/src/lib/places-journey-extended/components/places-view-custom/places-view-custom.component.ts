/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PlacesJourneyConfigService, PlacesMeasurementSystem, PlacesService } from '@backbase/places-journey-ang';
import { MapAPILoaderService, MapsAPIConfig } from '../../services/map-api-loader.service';
import { MapHelpersService } from '../../services/map-helpers.service';
import { MarkerIcons, Place, PlaceItem } from '@backbase/places-journey-ang/lib/model/place-model';
import { PlacesGetParams } from '@backbase/places-journey-ang/lib/model/place-param-model';
import { Observable, Subject, catchError, filter, map, of, switchMap } from 'rxjs';
import { PlacesError } from '@backbase/places-journey-ang/lib/model/place-error-model';
import { defaultPlaceType, defaultPlaceTypeMarkerURI } from '../../model/place-constants';
import { parseError } from '../../model/place-error-model';

@Component({
  selector: 'bb-places-view-custom',
  templateUrl: './places-view-custom.component.html',
  styleUrls: ['./places-view-custom.component.scss'],
  providers: [PlacesJourneyConfigService, PlacesService, MapAPILoaderService, MapHelpersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlacesViewCustomComponent implements OnInit {
  readonly config: PlacesJourneyConfigService;
  private readonly service;
  private readonly cd;
  private readonly loader;
  error: PlacesError | undefined;
  selectedView: 'list' | 'map';
  smallScreen: boolean | undefined;
  currentLocation: string | undefined;
  currentPosition: google.maps.LatLngLiteral | undefined;
  latitude: number;
  longitude: number;
  radius: number;
  limitList: number | undefined;
  types: string[];
  isLoading: boolean;
  private groupBtnRef;
  private mapConfigObject;
  private geocoder;
  private readonly mapParamsSubject;
  private readonly mapParams;
  readonly locations: Observable<Place[]>;
  readonly selectedPlaceId: Subject<string>;
  private readonly resolveAsset;
  // This is required to show info window only on mobile screen
  @ViewChild('groupBtns') set groupBtns(elRef: ElementRef | undefined) {
    this.groupBtnRef = elRef;
    setTimeout(() => {
      if (!this.groupBtnRef) {
        return;
      }
      this.smallScreen = window.getComputedStyle(this.groupBtnRef.nativeElement).display !== 'none';
    }, 0);
  }

  constructor(
    config: PlacesJourneyConfigService,
    service: PlacesService,
    cd: ChangeDetectorRef,
    loader: MapAPILoaderService,
  ) {
    this.config = config;
    this.service = service;
    this.cd = cd;
    this.loader = loader;
    this.selectedView = 'list';
    this.latitude = 0;
    this.longitude = 0;
    this.radius = 1;
    this.types = [];
    this.isLoading = true;
    this.mapConfigObject = {};
    this.mapParamsSubject = new Subject();
    this.mapParams = this.mapParamsSubject.asObservable();
    this.locations = this.mapParams.pipe(
      filter((params) => params !== undefined),
      switchMap((params) => this.service.getPlaces(params)),
      map((data: Array<any> | any) => {
        this.isLoading = false;
        return this.config.limitList ? data?.slice(0, this.config.limitList) : data;
      }),
      catchError((error) => {
        this.isLoading = false;
        this.handleError(error);
        return of([]);
      }),
    );
    this.selectedPlaceId = new Subject();
    this.resolveAsset = (placeType) => {
      const found = this.placeTypes.find((type) => type === placeType);
      return found ? this.config.placeTypes[found].markerUrl || defaultPlaceTypeMarkerURI : defaultPlaceTypeMarkerURI;
    };
    this.latitude = this.config.latitude;
    this.longitude = this.config.longitude;
    this.radius = this.config.radius;
    this.limitList = this.config.limitList;
  }

  ngOnInit() {
    this.mapConfigObject = {
      apiKey: this.config.apiKey,
      libraries: ['geometry'],
    };
    this.loadApi(this.mapConfigObject).then(() => {
      this.getCurrentLocation();
    });
    this.locationUpdate({
      latitude: this.config.latitude,
      longitude: this.config.longitude,
      radius: this.config.radius,
    });
  }

  loadApi(mapConfig = {}) {
    this.loader.config = mapConfig;
    return this.loader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      return;
    });
  }
  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        this.currentPosition = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };
        if (!this.geocoder) {
          return;
        }
        this.geocoder.geocode({ location: this.currentPosition }, (results, status) => {
          if (status === google.maps.GeocoderStatus.OK && results[0]) {
            const route = results[0].address_components.filter((item) => item.types.find((type) => type === 'route'));
            this.currentLocation = route[0].long_name || results[0].formatted_address;
          }
        });
      });
    }
  }
  handleError(error) {
    this.error = parseError(error);
  }
  get groupBtns(): ElementRef<any> | undefined {
    return this.groupBtnRef;
  }
  get mapConfig(): MapsAPIConfig {
    return this.mapConfigObject;
  }
  get placeTypes(): string[] {
    return Object.keys(this.config.placeTypes);
  }
  get markerIcon(): MarkerIcons {
    const types = [defaultPlaceType].concat(this.placeTypes);
    const assets = types.map((type) => this.resolveAsset(type));
    const icons = {};
    for (let i = 0; i < assets.length; i++) {
      icons[types[i]] = assets[i];
    }
    return icons;
  }
  /**
   * @deprecated Icons will be deprecated in favor of a non-observable approach provided by `markerIcon`
   */
  get icons(): Observable<MarkerIcons> {
    return of(this.markerIcon);
  }
  get isMetric(): boolean {
    return this.config.measurementSystem !== PlacesMeasurementSystem.METRIC;
  }
  filterTypes(values: { [type: string]: boolean }) {
    const types = [];
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        types.push(key);
      }
    });
    return types;
  }
  locationUpdate(params: PlacesGetParams) {
    this.latitude = params.latitude;
    this.longitude = params.longitude;
    this.radius = params.radius || this.config.radius;
    this.types = params.types || this.types;
    this.cd.detectChanges();
    this.mapParamsSubject.next({
      ...params,
      radius: this.config.radius,
      types: this.types,
    });
  }
  handleTypeSearch(types: string[]) {
    this.isLoading = true;
    this.locationUpdate({
      latitude: this.latitude,
      longitude: this.longitude,
      radius: this.radius,
      types,
    });
  }
  handleMapSearch(place: google.maps.places.PlaceResult) {
    this.isLoading = true;
    if (!place.geometry) {
      return;
    }
    this.locationUpdate({
      latitude: place.geometry.location.lat(),
      longitude: place.geometry.location.lng(),
      radius: this.config.radius,
      types: this.types,
    });
  }
  updatePlaceSelection(place: PlaceItem) {
    this.selectedPlaceId.next(place.id);
  }
  onMapReady() {
    // Map is there, so we don't use list limit property to determine list size. Map's zoom and radius parameter are driving it from now on
    this.limitList = undefined;
    this.locationUpdate({
      latitude: this.latitude,
      longitude: this.longitude,
      radius: this.radius,
      types: this.types,
    });
  }
}
