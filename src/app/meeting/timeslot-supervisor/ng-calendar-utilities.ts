import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';

export function floorToNearest(amount: number, precision: number) {
  return Math.floor(amount / precision) * precision;
}

export function ceilToNearest(amount: number, precision: number) {
  return Math.ceil(amount / precision) * precision;
}

export class CustomEventTitleFormatter extends CalendarEventTitleFormatter {
  weekTooltip(event: CalendarEvent, title: string) {
    if (!event.meta.tmpEvent && event.meta.tmpEvent !== undefined) {
      return super.weekTooltip(event, title);
    }
  }

}
