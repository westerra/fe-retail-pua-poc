import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Marker } from '@backbase/places-journey-ang/lib/components/bb-map-ui/map.component';
import { MarkerIcons, Place, PlaceItem } from '@backbase/places-journey-ang/lib/model/place-model';
import { PlacesGetParams } from '@backbase/places-journey-ang/lib/model/place-param-model';
import { MapUiCustomComponent } from '../map-ui-custom/map-ui-custom.component';

@Component({
  selector: 'bb-map-wrapper-custom',
  templateUrl: './map-wrapper-custom.component.html',
  styleUrls: ['./map-wrapper-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapWrapperCustomComponent implements OnInit, OnChanges {
  /**
   * API key need for the google maps to work.
   */
  @Input() apiKey: string;
  /**
   * Map config.
   */
  @Input() config: {};
  /**
   * Map zoom.
   */
  @Input() mapZoom: number;
  /**
   * Latitude for the coordinates.
   */
  @Input() latitude: number;
  /**
   * Longitude for the coordinates.
   */
  @Input() longitude: number;
  /**
   * Info window should be displayed after clicking on marker.
   */
  @Input() enableInfoWindow: boolean;
  /**
   * Object to describe the map marker icon.
   */
  @Input() icons: MarkerIcons | null;
  @Input() set locations(locations: Place[]) {
    this.places = locations;
    if (this.mapHelpers) {
      this.drawMarkers();
    }
  }
  @Input() set selectedPlaceId(id: string | undefined) {
    this.selectedId = id;
    if (this.mapHelpers) {
      this.drawMarkers();
    }
  }
  /**
   * EventEmitter for triggering a update event.
   */
  @Output() readonly update: EventEmitter<PlacesGetParams>;
  /**
   * EventEmitter for place selection update event.
   */
  @Output() readonly selected: EventEmitter<PlaceItem>;
  /**
   * EventEmitter for triggering a locate event.
   */
  @Output() readonly locate: EventEmitter<google.maps.LatLngLiteral>;
  /**
   * EventEmitter for triggering a mapReady event.
   */
  @Output() readonly mapReady: EventEmitter<undefined>;
  @ViewChild('bbMapInfoWindowContent') template: ElementRef<HTMLElement> | undefined;
  private currentLocationIconOptions;
  private mapHelpers;
  selectedId: string | undefined;
  places: Place[] | undefined;
  markers: Marker[] | Array<any>;
  infoWindow: google.maps.InfoWindow | undefined;
  /**
   * List of locations to be rendered.
   */
  get locations(): Place[] {
    return this.places || [];
  }
  /**
   * Selected place id.
   */
  get selectedPlaceId(): string | undefined {
    return this.selectedId;
  }

  constructor() {
    /**
     * API key need for the google maps to work.
     */
    this.apiKey = '';
    /**
     * Map config.
     */
    this.config = {};
    /**
     * Map zoom.
     */
    this.mapZoom = 0;
    /**
     * Latitude for the coordinates.
     */
    this.latitude = 0;
    /**
     * Longitude for the coordinates.
     */
    this.longitude = 0;
    /**
     * Info window should be displayed after clicking on marker.
     */
    this.enableInfoWindow = false;
    /**
     * Object to describe the map marker icon.
     */
    this.icons = {};
    /**
     * EventEmitter for triggering a update event.
     */
    this.update = new EventEmitter();
    /**
     * EventEmitter for place selection update event.
     */
    this.selected = new EventEmitter();
    /**
     * EventEmitter for triggering a locate event.
     */
    this.locate = new EventEmitter();
    /**
     * EventEmitter for triggering a mapReady event.
     */
    this.mapReady = new EventEmitter();
    this.markers = [];
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.mapHelpers) {
      return;
    }
    if (changes.latitude || changes.longitude) {
      this.mapHelpers.setCenter({
        lat: changes.latitude ? changes.latitude.currentValue : this.latitude,
        lng: changes.longitude ? changes.longitude.currentValue : this.longitude,
      });
    }
  }

  getInfoWindowContent(placeId) {
    const wrapperElement = this.template.nativeElement;
    const template = wrapperElement.querySelector(`div[data-place-id='${placeId}']`);
    return template ? template.innerHTML : '';
  }
  getDistance(bounds) {
    if (!bounds) {
      return 0;
    }
    return google.maps.geometry.spherical.computeDistanceBetween(bounds.getNorthEast(), bounds.getSouthWest()) / 1000;
  }
  emitMapUpdate() {
    if (!this.mapHelpers) {
      return;
    }
    const center = this.mapHelpers.getCenter();
    this.update.emit({
      latitude: center.lat(),
      longitude: center.lng(),
      radius: Math.ceil(this.getDistance(this.mapHelpers.getBounds()) / 2),
    });
  }
  setCurrentLocationMarker(location) {
    if (!this.mapHelpers) {
      return;
    }
    this.mapHelpers.createMarker({
      position: location,
      clickable: false,
      icon: this.currentLocationIconOptions,
      locationId: '',
    });
  }
  markerClicklistener(marker, place) {
    const helpers = this.mapHelpers;
    if (this.enableInfoWindow) {
      if (this.infoWindow) {
        this.infoWindow.close();
      }
      const content = this.getInfoWindowContent(place.id);
      this.infoWindow = helpers.createInfoWindow({ content });
      helpers.openInfoWindow(this.infoWindow, marker);
    }
    if (this.mapHelpers) {
      if (marker.locationId === this.selectedId) {
        this.selected.emit({
          id: '',
          latitude: 0,
          longitude: 0,
        });
      } else {
        this.selected.emit(this.places.find((location) => location.id === marker.locationId));
      }
    }
  }
  drawMarkers() {
    if (!Array.isArray(this.places)) {
      return;
    }
    // markers that are not needed anymore, should be cleared
    const placeIds = this.places.map((place) => place.id);
    const newMarkerList = [];
    this.markers.forEach((marker) => {
      if (placeIds.includes(marker.locationId)) {
        newMarkerList.push(marker);
      } else {
        // eslint-disable-next-line
        marker.setMap(null);
      }
    });
    this.markers = newMarkerList;
    // places markers on map
    this.places.forEach((place) => {
      let marker = this.markers.find((item) => item.locationId === place.id);
      if (marker === undefined) {
        marker = this.createMarker(place);
        this.markers.push(marker);
        marker.addListener('click', () => this.markerClicklistener(marker, place));
      }
      if (this.selectedId && placeIds.includes(this.selectedId)) {
        if (place.id === this.selectedId) {
          marker.setOpacity(1);
          marker.setIcon({
            url: marker.getIcon()?.url,
            scaledSize: new google.maps.Size(60, 60),
          });
        } else {
          marker.setOpacity(0.5);
          marker.setIcon({
            url: marker.getIcon()?.url,
          });
        }
      } else {
        marker.setOpacity(1);
        marker.setIcon({
          url: marker.getIcon()?.url,
        });
      }
    });
  }
  createMarker(place) {
    const helpers = this.mapHelpers;
    const position = {
      lat: place.latitude,
      lng: place.longitude,
    };
    // try to find place type icon or try to use fallback icon
    const defaultIcon =
      this.icons && Object.keys(this.icons).length ? this.icons[Object.keys(this.icons)[0]] : undefined;
    const iconUrl =
      place.placeType && this.icons && this.icons[place.placeType] ? this.icons[place.placeType] : defaultIcon;
    let marker = {
      position,
      locationId: place.id,
      title: $localize`:@@places.map.marker.title:map marker`,
    };
    // if there is no icon at all, use maps default pin
    if (iconUrl) {
      marker = {
        ...marker,
        ...{
          icon: {
            url: iconUrl,
          },
        },
      };
    }
    return helpers.createMarker(marker);
  }

  get options(): google.maps.MapOptions {
    return {
      center: {
        lat: this.latitude,
        lng: this.longitude,
      },
      zoom: this.mapZoom,
      disableDefaultUI: true,
      zoomControl: true,
      styles: [
        {
          featureType: 'poi',
          stylers: [{ visibility: 'off' }],
        },
      ],
    };
  }
  setMapOptions(component: MapUiCustomComponent) {
    this.mapHelpers = component.mapHelpers;
    this.mapHelpers.setMapOptions({
      mapTypeControlOptions: {
        mapTypeIds: [google.maps.MapTypeId.ROADMAP],
      },
    });
    this.mapHelpers.onMapEvent('idle', () => this.emitMapUpdate());
    this.currentLocationIconOptions = {
      path: google.maps.SymbolPath.CIRCLE,
      fillColor: '#4285F4',
      fillOpacity: 1,
      scale: 6,
      strokeColor: 'white',
      strokeWeight: 2,
    };
    if ('geolocation' in navigator) {
      const helpers = this.mapHelpers;
      navigator.geolocation.getCurrentPosition((location) => {
        const position = {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        };
        helpers.setCenter(position);
        this.setCurrentLocationMarker(position);
        this.locate.emit(position);
      });
    }
    // Everything set, emit that map is ready
    this.mapReady.emit();
  }
}
