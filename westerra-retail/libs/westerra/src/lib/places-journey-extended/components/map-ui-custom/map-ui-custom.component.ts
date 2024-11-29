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
import { MapsAPIConfig } from '../../services/map-api-loader.service';
import { MapHelpersService } from '../../services/map-helpers.service';

@Component({
  selector: 'bb-map-ui-custom',
  templateUrl: './map-ui-custom.component.html',
  styleUrls: ['./map-ui-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapUiCustomComponent implements OnInit {
  private readonly helpers;
  /**
   * Map options object.
   */
  @Input() options: google.maps.MapOptions;
  /**
   * Map API configuration.
   */
  @Input() config: MapsAPIConfig;
  /**
   * EventEmitter for triggering a mapReady event.
   */
  @Output() readonly mapReady: EventEmitter<MapUiCustomComponent>;
  @ViewChild('bbMapContainer', { static: true }) mapContainer: ElementRef<HTMLElement> | undefined;

  constructor(helpers: MapHelpersService) {
    this.helpers = helpers;
    /**
     * Map options object.
     */
    this.options = {};
    /**
     * Map API configuration.
     */
    this.config = {};
    /**
     * EventEmitter for triggering a mapReady event.
     */
    this.mapReady = new EventEmitter();
  }
  get mapHelpers(): MapHelpersService {
    return this.helpers;
  }
  ngOnInit(): void {
    this.helpers
      .createMap(this.mapContainer?.nativeElement, this.options, this.config)
      .then(() => this.mapReady.emit(this));
  }
}
