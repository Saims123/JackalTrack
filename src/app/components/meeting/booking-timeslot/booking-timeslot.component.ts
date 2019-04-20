import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import {
  TimeslotService,
  TimeslotPeriod,
  Timeslot
} from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionGroup,
  Student
} from 'src/app/services/supervision/supervision.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { mergeMap, tap } from 'rxjs/operators';
import { TimeslotConfirmationDialog } from '../timeslot-supervisor/dialogbox/confirmation-dialog-component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';

@Component({
  selector: 'app-booking-timeslot',
  templateUrl: './booking-timeslot.component.html',
  styleUrls: ['./booking-timeslot.component.scss']
})
export class BookingTimeslotComponent implements OnInit {
  timeslotGroup: TimeslotPeriod;
  group: SupervisionGroup;
  student: Student;
  constructor(
    public timeslotService: TimeslotService,
    private graphService: GraphService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.updateTimeslotInformation();
  }

  checkIfBooked(student) {
    if (student.uniqueID !== null) {
      return true;
    }
    return false;
  }

  bookTimeslot(selectedTimeslot) {
    this.ngZone.run(_ => {
      // Currently forcing the dialog component to run within Zone, so it's respondant to parent componet
      const dialogRef = this.dialog.open(TimeslotConfirmationDialog, {
        data: {
          meetingPeriod: this.timeslotGroup.meetingPeriod,
          timeslots: [selectedTimeslot]
        }
      });
      console.log(selectedTimeslot);
      dialogRef.afterClosed().subscribe(state => {
        if (state) {
          this.timeslotService
            .bookTimeslot(selectedTimeslot, this.student)
            .subscribe(_ => {
              this.updateTimeslotInformation();

              this.graphService.sentEmail(
                this.student.email,
                'JackalTrack Timeslot Booking',
                this.makeEmailContent(selectedTimeslot)
              );
            });
        }
      });
    });
  }
  unbookAllTimeslot() {
    console.log('I AM CLICKED');

    this.timeslotService
      .unbookTimeslots(this.student)
      .subscribe(_ => this.updateTimeslotInformation());
  }

  updateTimeslotInformation() {
    this.graphService
      .getMe()
      .pipe(
        tap(me => {
          this.student = {
            displayName: me.displayName,
            uniqueID: me.id,
            email: me.mail
          };
        }),
        mergeMap(student =>
          this.timeslotService.getTimeslotsViaSupervisorID(student.id)
        )
      )
      .subscribe((data: any) => {
        (this.group = data), (this.timeslotGroup = data);
        this.cdr.detectChanges();
      });
  }

  makeEmailContent(bookedTimeslot: Timeslot) {
    const message = `
    <h1>Timeslot Booking</h1>
    You have booked the following timeslot : Every ${moment(
      bookedTimeslot.startTime
    ).format('dddd')}
    from ${moment(bookedTimeslot.startTime).format('hh:mm a')}
    to  ${moment(bookedTimeslot.endTime).format('hh:mm a')}.
    `;
    return message;
  }
}
