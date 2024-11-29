import { Injectable } from '@angular/core';
import { GoogleMapsScriptProtocol, GoogleMapsScriptProtocolType } from '../model/place-constants';
// import { MapsAPIConfig } from '@backbase/places-journey-ang/lib/components/bb-map-ui/map-api-loader.service';

/**
 * Configuration for the {@link MapAPILoaderService}.
 */
export interface MapsAPIConfig {
  /**
   * The Google Maps API Key (see:
   * https://developers.google.com/maps/documentation/javascript/get-api-key)
   */
  apiKey?: string;
  /**
   * The Google Maps client ID (for premium plans).
   * When you have a Google Maps APIs Premium Plan license, you must authenticate
   * your application with either an API key or a client ID.
   * The Google Maps API will fail to load if both a client ID and an API key are included.
   */
  clientId?: string;
  /**
   * The Google Maps channel name (for premium plans).
   * A channel parameter is an optional parameter that allows you to track usage under your client
   * ID by assigning a distinct channel to each of your applications.
   */
  channel?: string;
  /**
   * Google Maps API version.
   */
  apiVersion?: string;
  /**
   * Host and Path used for the `<script>` tag.
   */
  hostAndPath?: string;
  /**
   * Protocol used for the `<script>` tag.
   */
  protocol?: GoogleMapsScriptProtocolType;
  /**
   * Defines which Google Maps libraries should get loaded.
   */
  libraries?: string[];
  /**
   * The default bias for the map behavior is US.
   * If you wish to alter your application to serve different map tiles or bias the
   * application, you can overwrite the default behavior (US) by defining a `region`.
   * See https://developers.google.com/maps/documentation/javascript/basics#Region
   */
  region?: string;
  /**
   * The Google Maps API uses the browser's preferred language when displaying
   * textual information. If you wish to overwrite this behavior and force the API
   * to use a given language, you can use this setting.
   * See https://developers.google.com/maps/documentation/javascript/basics#Language
   */
  language?: string;
}

@Injectable({
  providedIn: 'root',
})
export class MapAPILoaderService {
  private readonly scriptID;
  private readonly callbackName;
  private readonly apiLoadPromiseName;
  private readonly windowRef;
  private readonly documentRef;
  private configValue;

  // get config(): MapsAPIConfig;
  // set config(config: MapsAPIConfig);
  // get loadAPIPromise(): any;
  // private assignScriptLoadingPromise;
  // private getScriptSrc;

  constructor() {
    this.scriptID = 'bbGoogleMapsApiScript';
    this.callbackName = 'bbMapsAPILoader';
    this.apiLoadPromiseName = 'bbMapsAPILoaderPromise';
    this.windowRef = window;
    this.documentRef = document;
    this.configValue = {};
  }
  get config(): MapsAPIConfig {
    return this.configValue;
  }
  set config(config: MapsAPIConfig) {
    this.configValue = config;
  }
  get loadAPIPromise() {
    return this.windowRef[this.apiLoadPromiseName];
  }
  assignScriptLoadingPromise(scriptElem) {
    this.windowRef[this.apiLoadPromiseName] = new Promise<void>((resolve, reject) => {
      this.windowRef[this.callbackName] = () => {
        resolve();
      };
      scriptElem.onerror = (error) => {
        reject(error);
      };
    });
  }
  getScriptSrc(callbackName) {
    const protocolType = (this.configValue && this.configValue.protocol) || GoogleMapsScriptProtocol.HTTPS;
    let protocol = '';
    switch (protocolType) {
      case GoogleMapsScriptProtocol.HTTP:
        protocol = 'http:';
        break;
      case GoogleMapsScriptProtocol.HTTPS:
        protocol = 'https:';
        break;
    }
    const hostAndPath = this.configValue.hostAndPath || 'maps.googleapis.com/maps/api/js';
    // make sure we have places library for search component
    const libraries = this.configValue.libraries || [];
    if (libraries.indexOf('places') === -1) {
      this.configValue.libraries = [...libraries, 'places'];
    }
    const queryParams = {
      v: this.configValue.apiVersion || 'quarterly',
      callback: callbackName,
      key: this.configValue.apiKey,
      client: this.configValue.clientId,
      channel: this.configValue.channel,
      libraries: this.configValue.libraries,
      region: this.configValue.region,
      language: this.configValue.language,
    };
    const params = Object.keys(queryParams)
      .filter((key) => queryParams[key] !== undefined)
      .filter((key) => {
        // remove empty arrays
        return !Array.isArray(queryParams[key]) || (Array.isArray(queryParams[key]) && queryParams[key].length > 0);
      })
      .map((key) => {
        let value = queryParams[key];
        if (Array.isArray(value)) {
          // join arrays as comma seperated strings
          value = value.join(',');
        }
        return `${key}=${value}`;
      })
      .join('&');
    return `${protocol}//${hostAndPath}?${params}`;
  }
  load() {
    const window = this.windowRef;
    if (window.google && window.google.maps) {
      // Google maps already loaded on the page.
      return Promise.resolve();
    }
    if (this.loadAPIPromise) {
      return this.loadAPIPromise;
    }
    const script = this.documentRef.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.id = this.scriptID;
    script.src = this.getScriptSrc(this.callbackName);
    this.assignScriptLoadingPromise(script);
    this.documentRef.body.appendChild(script);
    return this.loadAPIPromise;
  }
}
