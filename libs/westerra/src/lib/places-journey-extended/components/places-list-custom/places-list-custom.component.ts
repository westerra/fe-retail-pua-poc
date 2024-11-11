import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { PlaceTypes } from '@backbase/places-journey-ang';
import { Place, PlaceItem } from '@backbase/places-journey-ang/lib/model/place-model';
import { defaultPlaceTypeIcon, footInMeter, footInMile, meterInKM } from '../../model/place-constants';
import { Hour } from '@backbase/places-http-ang';

@Component({
  selector: 'bb-places-list-custom',
  templateUrl: './places-list-custom.component.html',
  styleUrls: ['./places-list-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class PlacesListCustomComponent implements OnInit {
  private readonly datePipe;
  /**
   * Map radius.
   */
  @Input() radius: number;

  /**
   * List of locations to be rendered.
   */
  @Input() set locations(locations: Place[]) {
    this.places = locations
      .map((place) => ({
        ...place,
        distance: this.calculateDistance(place),
      }))
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
  }
  /**
   * The Place selected by user
   */
  @Input() selectedPlaceId: string | undefined;
  /**
   * The current position retrieved by geolocation html5 api
   */
  @Input() currentPosition: google.maps.LatLngLiteral | undefined;
  /**
   * Use metric system for displaying distances.
   */
  @Input() isMetric: boolean;
  /**
   * Provide Place Types
   */
  @Input() placeTypes: PlaceTypes;
  /**
   * EventEmitter for triggering a place selection update event.
   */
  @Output() readonly selected: EventEmitter<PlaceItem>;
  @ViewChild('transM', { static: true }) transM: ElementRef | undefined;
  @ViewChild('transKm', { static: true }) transKm: ElementRef | undefined;
  @ViewChild('transFt', { static: true }) transFt: ElementRef | undefined;
  @ViewChild('transMi', { static: true }) transMi: ElementRef | undefined;
  places: PlaceItem[];
  /**
   * Uses Google geometry library to calculate distance between two points
   * Returns undefined if google library or current position is undefined
   * Returns distance in meters or feet, depending on measurment system property in the widget
   */

  constructor(datePipe: DatePipe) {
    this.datePipe = datePipe;
    /**
     * Map radius.
     */
    this.radius = 1;
    /**
     * Use metric system for displaying distances.
     */
    this.isMetric = true;
    /**
     * Provide Place Types
     */
    this.placeTypes = {};
    /**
     * EventEmitter for triggering a place selection update event.
     */
    this.selected = new EventEmitter();
    this.places = [];
  }

  ngOnInit(): void {}

  /**
   * Uses Google geometry library to calculate distance between two points
   * Returns undefined if google library or current position is undefined
   * Returns distance in meters or feet, depending on measurment system property in the widget
   */
  calculateDistance(place) {
    if (typeof google === 'undefined' || this.currentPosition === undefined) {
      return undefined;
    }
    const centerCoords = new google.maps.LatLng(this.currentPosition.lat, this.currentPosition.lng);
    const itemCoords = new google.maps.LatLng(place.latitude, place.longitude);
    const distance = google.maps.geometry.spherical.computeDistanceBetween(centerCoords, itemCoords);
    return this.isMetric ? distance : distance * footInMeter;
  }
  isStillOpen(hour, currentDate = new Date()) {
    const [closeHour, closeMinute] = hour.split(':').map((timePart) => +timePart);
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    return currentHour < closeHour || (currentHour === closeHour && currentMinute < closeMinute);
  }
  getDistanceUnits() {
    if (this.isMetric) {
      return [this.transM.nativeElement.textContent, this.transKm.nativeElement.textContent];
    }
    return [this.transFt.nativeElement.textContent, this.transMi.nativeElement.textContent];
  }
  onListItemClick(isOpen: boolean, place: PlaceItem): void {
    this.selected.emit(
      !isOpen
        ? place
        : {
            id: '',
            latitude: 0,
            longitude: 0,
          },
    );
    return;
  }
  getClosingHour(hours: Hour[] | undefined, currentDate: Date = new Date()): string | undefined {
    if (!hours) {
      return;
    }
    // in specs, Sunday is 7 and in JS it is 0, rest of the days match
    const currentDay = currentDate.getDay() || 7;
    const todayHours = hours.find((time) => time.day === currentDay);
    if (!todayHours) {
      return;
    }
    return (
      (this.isStillOpen(todayHours.close, currentDate) &&
        this.datePipe.transform(new Date('2000-01-01T' + todayHours.close), 'shortTime')) ||
      undefined
    );
  }
  getPlaceTypeIcon(type: string | undefined): string {
    return type && this.placeTypes[type] && this.placeTypes[type].iconName
      ? this.placeTypes[type].iconName
      : defaultPlaceTypeIcon;
  }
  formatDistance(distance: number): string {
    const distanceUnit = this.getDistanceUnits();
    const distanceUnitRatio = this.isMetric ? meterInKM : footInMile;
    let convertedDistance = Math.round(distance);
    let unit = distanceUnit[0];
    if (distance >= distanceUnitRatio) {
      unit = distanceUnit[1];
      convertedDistance /= distanceUnitRatio;
      if (convertedDistance >= 10) {
        // for distance over 10 km/mi show only integers
        convertedDistance = Math.round(convertedDistance);
      } else {
        // for distance more than 1 km/mi but smaller than 10 km/mi use one decimal point
        convertedDistance = Math.round(convertedDistance * 10) / 10;
      }
    }
    return `${convertedDistance} ${unit}`;
  }
}
