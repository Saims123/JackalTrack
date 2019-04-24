import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { DatePipe } from '@angular/common';
import { Inject, LOCALE_ID } from '@angular/core';

export function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

export function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  constructor(@Inject(LOCALE_ID) private locale: string) {
    super();
  }

  week(event: CalendarEvent): string {
    return `<b>${new DatePipe(this.locale).transform(
      event.start,
      'hh:mm a',
      this.locale
    )}</b> ${event.title}`;
  }
}




