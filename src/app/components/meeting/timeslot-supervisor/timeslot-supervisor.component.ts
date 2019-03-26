import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';

import { CalendarEvent, CalendarEventTitleFormatter } from 'angular-calendar';
import { DayViewHourSegment, EventColor } from 'calendar-utils';
import { fromEvent } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { addDays, addMinutes, endOfWeek } from 'date-fns';
import {
  ceilToNearest,
  floorToNearest,
  CustomEventTitleFormatter
} from './ng-calendar-utilities';
import * as moment from 'moment';

import { TimeslotConfirmationDialog } from './dialogbox/confirmation-dialog-component';

import { TimeslotService } from 'src/app/services/timeslots/timeslot.service';
import { SupervisionService } from '../../../services/supervision.service';
import { GraphService } from '../../../services/graph/graph.service';

@Component({
  selector: 'app-timeslot-supervisor',
  templateUrl: './timeslot-supervisor.component.html',
  styleUrls: ['./timeslot-supervisor.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class TimeslotSupervisorComponent implements OnInit {
  viewDate = new Date();
  minDate = new Date();
  events: CalendarEvent[] = [];
  calColor: EventColor;

  dragToCreateActive = false;
  studentNo = 0;
  isDataLoaded = false;

  constructor(
    private cdr: ChangeDetectorRef,
    public studentService: SupervisionService,
    public graphService: GraphService,
    public dialog: MatDialog,
    public timeslotService: TimeslotService,
    private router: Router
  ) {
    this.calColor = { primary: '#e3bc08', secondary: '#FDF1BA' };
    this.studentService
      .getStudents()
      .subscribe(students => (this.studentNo = students.length));
  }

  ngOnInit(): void {
    this.importMicrosoftEvents();
  }

  importMicrosoftEvents() {
    const microsoftEvents: CalendarEvent[] = [];
    this.graphService
      .getEventsOnCurrentWeek()
      .then(data =>
        data.forEach(event => {
          microsoftEvents.push({
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            title: event.subject,
            color: this.calColor
          });
        })).then(() => {
        this.events = microsoftEvents;
      }).finally(() => {
        this.isDataLoaded = true;
        this.refresh();
      });
  }

  getNewTimeslots() {
    console.warn(this.events.filter(event => event.title === 'New Timeslot'));
    return this.events.filter(event => event.title === 'New Timeslot');
  }

  openDialog() {
    const dialogRef = this.dialog.open(TimeslotConfirmationDialog, {
      data: this.getNewTimeslots()
    });
    dialogRef.afterClosed().subscribe(timeslots => {
      this.timeslotService.initiateNewTimeslot(timeslots);
      this.router.navigate(['/timetable']);
    });
  }
  // Direct implementation from https://mattlewis92.github.io/angular-calendar/#/drag-to-create-events

  startDragToCreate(
    segment: DayViewHourSegment,
    mouseDownEvent: MouseEvent,
    segmentElement: HTMLElement
  ) {
    const dragToSelectEvent: CalendarEvent = {
      id: this.events.length,
      title: 'New Timeslot',
      start: segment.date,
      meta: {
        tmpEvent: true
      },
      actions: [
        {
          label: '<i style="font-size: 18px;" class="fa fa-fw fa-times"></i>',
          onClick: ({ event }: { event: CalendarEvent }): void => {
            this.events = this.events.filter(iEvent => iEvent !== event);
            console.log('Event deleted', event);
          }
        }
      ]
    };

    this.events = [...this.events, dragToSelectEvent];
    const segmentPosition = segmentElement.getBoundingClientRect();
    this.dragToCreateActive = true;
    const endOfView = endOfWeek(this.viewDate);

    fromEvent(document, 'mousedown')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe(() => {
        const newEnd = moment
          .utc(segment.date)
          .add(30, 'minutes')
          .toDate();
        dragToSelectEvent.end = newEnd;
      });

    fromEvent(document, 'mousemove')
      .pipe(
        finalize(() => {
          delete dragToSelectEvent.meta.tmpEvent;
          this.dragToCreateActive = false;
          this.refresh();
        }),
        takeUntil(fromEvent(document, 'mouseup'))
      )
      .subscribe((mouseMoveEvent: MouseEvent) => {
        const minutesDiff = ceilToNearest(
          mouseMoveEvent.clientY - segmentPosition.top,
          30
        );

        const daysDiff =
          floorToNearest(
            mouseMoveEvent.clientX - segmentPosition.left,
            segmentPosition.width
          ) / segmentPosition.width;

        const newEnd = addDays(addMinutes(segment.date, minutesDiff), daysDiff);
        if (newEnd > segment.date && newEnd < endOfView) {
          dragToSelectEvent.end = newEnd;
        }
        this.refresh();
      });
  }

  private refresh() {
    this.events = [...this.events];
    this.cdr.detectChanges();
  }
}
