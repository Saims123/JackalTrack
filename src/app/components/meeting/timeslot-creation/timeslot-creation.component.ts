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
import { ceilToNearest, floorToNearest, CustomEventTitleFormatter } from './ng-calendar-utilities';
import * as moment from 'moment';

import { TimeslotConfirmationDialog } from './dialogbox/confirmation-dialog-component';
import { ToastrService } from 'ngx-toastr';
import { TimeslotService, Timeslot, TimeslotPeriod } from 'src/app/services/timeslots/timeslot.service';
import { SupervisionService, Supervisor, Student } from '../../../services/supervision/supervision.service';
import { GraphService } from '../../../services/graph/graph.service';
import { CustomMailService } from '../../../services/graph/custom-mail.service';

@Component({
  selector: 'app-timeslot-creation',
  templateUrl: './timeslot-creation.component.html',
  styleUrls: ['./timeslot-creation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: CalendarEventTitleFormatter,
      useClass: CustomEventTitleFormatter
    }
  ]
})
export class TimeslotCreationComponent implements OnInit {
  viewDate = new Date();
  minDate = new Date();
  events: CalendarEvent[] = [];
  calColor: EventColor;

  meetingStartDate: Date;
  meetingEndDate: Date;

  dragToCreateActive = false;
  studentNumber = 0;
  isMicrosoftDataLoaded = false;
  supervisor: Supervisor;
  students: Student[] = [];
  constructor(
    private cdr: ChangeDetectorRef,
    private supervisionService: SupervisionService,
    public graphService: GraphService,
    private toastService: ToastrService,
    public timeslotService: TimeslotService,
    public dialog: MatDialog,
    private router: Router,
    private emailService: CustomMailService
  ) {
    this.calColor = { primary: '#e3bc08', secondary: '#FDF1BA' };
    this.importMicrosoftEvents();
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit(): void {
    this.supervisionService.supervisionGroup.subscribe(
      group => (
        (this.studentNumber = group[0].students.length),
        (this.students = group[0].students),
        (this.supervisor = group[0].supervisor),
        this.cdr.detectChanges()
      )
    );
  }

  importMicrosoftEvents() {
    const microsoftEvents: CalendarEvent[] = [];
    this.graphService
      .getEventsOnCurrentWeek()
      .then(data =>
        data.forEach(event => {
          microsoftEvents.push({
            start: moment.utc(event.start.dateTime).toDate(),
            end: moment.utc(event.end.dateTime).toDate(),
            title: event.subject,
            color: this.calColor
          });
        })
      )
      .then(() => {
        this.events = microsoftEvents;
      })
      .finally(() => {
        this.isMicrosoftDataLoaded = true;
        this.refresh();
      });
  }

  getNewTimeslots() {
    return this.events.filter(event => event.title === 'New Timeslot');
  }
  //  Consider moving to Timeslot Service for simplicity and code sanity sake
  getConvertedTimeslots() {
    const timeslots: Timeslot[] = [];
    this.getNewTimeslots().forEach(timeslot => {
      timeslots.push({
        day: moment(timeslot.start)
          .format('DDD')
          .toString(),
        startTime: moment.utc(timeslot.start).toJSON(),
        endTime: moment.utc(timeslot.end).toJSON()
      });
    });
    return timeslots.sort((timeslotA, timeslotB) => {
      return moment.utc(moment.utc(timeslotA.startTime)).diff(moment.utc(timeslotB.startTime));
    });
  }

  openDialog(_location) {
    const timeslotGroup = {
      meetingPeriod: {
        start: moment(this.meetingStartDate).format('YYYY-MM-DDTHH:mm'),
        end: moment(this.meetingEndDate)
          .hour(22) // Taking in account for BST
          .minute(59)
          .second(59)
          .format('YYYY-MM-DDTHH:mm'),
        location: _location
      },
      timeslots: this.getConvertedTimeslots()
    };
    const dialogRef = this.dialog.open(TimeslotConfirmationDialog, {
      data: timeslotGroup
    });
    dialogRef.afterClosed().subscribe(state => {
      if (state) {
        this.timeslotService
          .addNewTimeslot(timeslotGroup.timeslots, timeslotGroup.meetingPeriod)
          .subscribe(_ => {
            this.emailService.sentEmail(
              this.getStudentEmails(),
              'JackalTrack : New Timeslots',
              this.makeTimeslotEmailContent(timeslotGroup)
            );
          });
        this.router.navigate(['meeting/timetable']);
        this.toastService.success('Timeslot creation', 'Successfully created and sent to all students');
      }
    });
  }
  getStudentEmails() {
    return this.students.map(student => {
      return student.email;
    });
  }

  makeTimeslotEmailContent(timeslotInfo: TimeslotPeriod) {
    const message = `
    <h1>Timeslot Booking</h1>
    <h2>
    Supervisor ${this.supervisor.displayName} has created timeslots between:
    </h2>
    <div style="border: 1px solid black; border-radius: 15px;">
    <h3>
    Start from : <time>
    ${moment.utc(timeslotInfo.meetingPeriod.start).format('dddd DD MMMM YYYY')} </time>
    <br />
    Until : <time>
    ${moment.utc(timeslotInfo.meetingPeriod.end).format('dddd DD MMMM YYYY')} </time>
   </h3>
    </div>
    <br />
    Book your timeslot on :
    <a href="https://i7467177.bucomputing.uk/meeting/timeslots/booking">
    https://i7467177.bucomputing.uk/meeting/timeslots/booking
    </a>
    `;
    return message;
  }

  // Direct implementation from https://mattlewis92.github.io/angular-calendar/#/drag-to-create-events
  // Considering to split this as child component in future
  startDragToCreate(segment: DayViewHourSegment, mouseDownEvent: MouseEvent, segmentElement: HTMLElement) {
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
        const minutesDiff = ceilToNearest(mouseMoveEvent.clientY - segmentPosition.top, 30);

        const daysDiff =
          floorToNearest(mouseMoveEvent.clientX - segmentPosition.left, segmentPosition.width) /
          segmentPosition.width;

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
