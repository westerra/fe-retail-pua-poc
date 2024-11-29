import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Hour } from '@backbase/places-http-ang';

@Component({
  selector: 'bb-work-times-custom',
  templateUrl: './work-times-custom.component.html',
  styleUrls: ['./work-times-custom.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class WorkTimesCustomComponent  {
  private readonly datePipe;
  /**
   * The day number based on WeekDay enum
   */
  @Input() day: number;
  /**
   * Hours related to this day
   */
  @Input() hours: Hour[];

  constructor(datePipe: DatePipe) {
    this.datePipe = datePipe;
    /**
     * The day number based on WeekDay enum
     */
    this.day = 0;
    /**
     * Hours related to this day
     */
    this.hours = [];
  }


  toLocaleTime(hour: string): string {
    return this.datePipe.transform(new Date('2000-01-01T' + hour), 'shortTime') || hour;
  }
  isToday(day: number, today: number = new Date().getDay()): boolean {
    today = today || 7;
    return day === today;
  }
}
