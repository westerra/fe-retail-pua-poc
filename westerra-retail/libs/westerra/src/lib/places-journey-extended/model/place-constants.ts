/**
 * Default place type that will be used as fallback in case types are not configured in the app
 */
export const defaultPlaceType = 'bbDefaultPlaceType';
/**
 * Marker icon for default place type
 */
export const defaultPlaceTypeMarkerURI = 'assets/bb-places-journey-ang/bb-default-marker.svg';
/**
 * List icon name for default place type
 */
export const defaultPlaceTypeIcon = 'map';
/**
 * Ratio between foot and meter
 */
export const footInMeter = 3.28084;
/**
 * Ratio between meter and kilometer
 */
export const meterInKM = 1000;
/**
 * Ratio between foot and mile
 */
export const footInMile = 5280;

export const GoogleMapsScriptProtocol = {
  HTTP: 1,
  HTTPS: 2,
  AUTO: 3,
};

export declare enum GoogleMapsScriptProtocolType {
  HTTP = 1,
  HTTPS = 2,
  AUTO = 3,
}
