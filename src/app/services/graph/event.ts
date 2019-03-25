export class Event {
subject: string;
isAllDay: boolean;
  start: DateTimeTimeZone;
  end: DateTimeTimeZone;
}

export class DateTime {
  dateTime: string;
  timeZone: string;
}

export class EmailAddress {
  name: string;
  address: string;
}

export class DateTimeTimeZone {
  dateTime: string;
  timeZone: string;
}

