import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WeekDay } from '../../model/place-model';
import { PlaceItem } from '@backbase/places-journey-ang/lib/model/place-model';
import { PlaceAddress, Hour } from '@backbase/places-http-ang';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'bb-places-details-custom',
  templateUrl: './places-details-custom.component.html',
  styleUrls: ['./places-details-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class PlacesDetailsCustomComponent implements OnInit {
  @Input() place: PlaceItem | undefined;
  constructor() {}

  ngOnInit(): void {}

  // This returns array of weekDay numbers based on the WeekDay enum
  get weekDay(): number[] {
    const days = Object.keys(WeekDay);
    return days.slice(0, days.length / 2).map((day) => +day);
  }
  getWorkTimes(day: number, hours: Hour[]): Hour[] {
    return hours.filter((time) => time.day === day);
  }
  getFullAddress(address: PlaceAddress | undefined): string {
    return address ? encodeURI(`${address.postalCode} ${address.addressLine1}`) : '';
  }
}
