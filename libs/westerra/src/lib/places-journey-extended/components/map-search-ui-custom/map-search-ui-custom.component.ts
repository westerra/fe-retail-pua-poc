import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MapAPILoaderService, MapsAPIConfig } from '../../services/map-api-loader.service';
import { SearchBoxComponent } from '@backbase/ui-ang/search-box';

@Component({
  selector: 'bb-map-search-ui-custom',
  templateUrl: './map-search-ui-custom.component.html',
  styleUrls: ['./map-search-ui-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapSearchUiCustomComponent implements OnInit {
  private readonly loader;
  /**
   * Map autocomplete options object.
   */
  @Input() options: google.maps.places.AutocompleteOptions;
  /**
   * Map API configuration.
   */
  @Input() config: MapsAPIConfig;
  /**
   * EventEmitter for triggering a mapSearch event.
   */
  @Output() readonly mapSearch: EventEmitter<google.maps.places.PlaceResult>;
  @ViewChild('bbMapsearch', { static: true }) searchBox: SearchBoxComponent<string> | undefined;

  constructor(loader: MapAPILoaderService) {
    this.loader = loader;
    /**
     * Map autocomplete options object.
     */
    this.options = {};
    /**
     * Map API configuration.
     */
    this.config = {};
    /**
     * EventEmitter for triggering a mapSearch event.
     */
    this.mapSearch = new EventEmitter();
  }

  ngOnInit() {
    this.loader.config = this.config;
    this.loader.load().then(() => {
      const input = this.searchBox?.inputField;
      if (!input) {
        return;
      }
      const autocomplete = new google.maps.places.Autocomplete(input.nativeElement, this.options);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry) {
          this.mapSearch.emit(place);
        }
      });
    });
  }

  onSearchButtonClick() {
    const input = this.searchBox?.inputField;
    if (!input) {
      return;
    }
    // select first result and do the search
    google.maps.event.trigger(input.nativeElement, 'focus', {});
    google.maps.event.trigger(input.nativeElement, 'keydown', {
      keyCode: 40,
      stopPropagation: () => undefined,
      preventDefault: () => undefined,
    });
    google.maps.event.trigger(input.nativeElement, 'keydown', { keyCode: 13 }); // enter
  }
}
