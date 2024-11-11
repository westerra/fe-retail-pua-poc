export var WeekDay;
(function (WeekDay) {
  WeekDay[(WeekDay['Monday'] = 1)] = 'Monday';
  WeekDay[(WeekDay['Tuesday'] = 2)] = 'Tuesday';
  WeekDay[(WeekDay['Wednesday'] = 3)] = 'Wednesday';
  WeekDay[(WeekDay['Thursday'] = 4)] = 'Thursday';
  WeekDay[(WeekDay['Friday'] = 5)] = 'Friday';
  WeekDay[(WeekDay['Saturday'] = 6)] = 'Saturday';
  WeekDay[(WeekDay['Sunday'] = 7)] = 'Sunday';
})(WeekDay || (WeekDay = {}));

export var GoogleMapsScriptProtocol;
(function (GoogleMapsScriptProtocol) {
  GoogleMapsScriptProtocol[(GoogleMapsScriptProtocol['HTTP'] = 1)] = 'HTTP';
  GoogleMapsScriptProtocol[(GoogleMapsScriptProtocol['HTTPS'] = 2)] = 'HTTPS';
  GoogleMapsScriptProtocol[(GoogleMapsScriptProtocol['AUTO'] = 3)] = 'AUTO';
})(GoogleMapsScriptProtocol || (GoogleMapsScriptProtocol = {}));

export interface MapDetails {
  center: google.maps.LatLng;
  bounds: google.maps.LatLngBounds | null | undefined;
  zoom: number;
}
export interface MarkerOptions extends google.maps.MarkerOptions {
  locationId: string;
}
export interface Marker extends google.maps.Marker {
  locationId: string;
}
