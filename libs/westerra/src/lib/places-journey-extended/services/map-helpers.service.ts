import { Injectable } from '@angular/core';
import { MapAPILoaderService } from './map-api-loader.service';

@Injectable({
  providedIn: 'root',
})
export class MapHelpersService {
  private readonly loader;
  private map;

  constructor(loader: MapAPILoaderService) {
    this.loader = loader;
  }
  createMap(el, mapOptions, mapConfig = {}) {
    this.loader.config = mapConfig;
    return this.loader.load().then(() => {
      this.map = new google.maps.Map(el, mapOptions);
    });
  }
  setMapOptions(options) {
    this.map.setOptions(options);
  }
  /**
   * Creates a google map marker with the map context
   */
  createMarker(options: any = {}, addToMap = true) {
    if (addToMap) {
      options.map = this.map;
    }
    return new google.maps.Marker(options);
  }
  createInfoWindow(options) {
    return new google.maps.InfoWindow(options);
  }
  openInfoWindow(infoWindow, marker) {
    return infoWindow.open(this.map, marker);
  }
  onMapEvent(eventName, callback) {
    this.map.addListener(eventName, (arg) => callback(arg));
  }
  setCenter(latLng) {
    return this.map.setCenter(latLng);
  }
  getZoom() {
    return this.map.getZoom();
  }
  getBounds() {
    return this.map.getBounds();
  }
  getMapTypeId() {
    return this.map.getMapTypeId();
  }
  setZoom(zoom) {
    return this.map.setZoom(zoom);
  }
  getCenter() {
    return this.map.getCenter();
  }
  panTo(latLng) {
    return this.map.panTo(latLng);
  }
  panBy(x, y) {
    return this.map.panBy(x, y);
  }
  fitBounds(latLng) {
    return this.map.fitBounds(latLng);
  }
  panToBounds(latLng) {
    return this.map.panToBounds(latLng);
  }
  /**
   * Triggers the given event name on the map instance.
   */
  triggerMapEvent(eventName) {
    return google.maps.event.trigger(this.map, eventName);
  }
}
