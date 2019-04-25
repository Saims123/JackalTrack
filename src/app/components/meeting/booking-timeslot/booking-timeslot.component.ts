import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { TimeslotService, TimeslotPeriod, Timeslot } from 'src/app/services/timeslots/timeslot.service';
import { SupervisionGroup, Student, Supervisor } from 'src/app/services/supervision/supervision.service';
import { mergeMap, tap } from 'rxjs/operators';
import { TimeslotConfirmationDialog } from '../timeslot-creation/dialogbox/confirmation-dialog-component';
import { MatDialog } from '@angular/material';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CustomMailService } from 'src/app/services/graph/custom-mail.service';
import { GraphService } from 'src/app/services/graph/graph.service';

@Component({
  selector: 'app-booking-timeslot',
  templateUrl: './booking-timeslot.component.html',
  styleUrls: ['./booking-timeslot.component.scss']
})
export class BookingTimeslotComponent implements OnInit {
  timeslotGroup: TimeslotPeriod;
  group: SupervisionGroup;
  booker: Student;
  isError = false;
  isSupervisor = false;
  constructor(
    public timeslotService: TimeslotService,
    private customMailService: CustomMailService,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    private ngZone: NgZone,
    private toastService: ToastrService,
    private graphService: GraphService
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
      dialogRef.afterClosed().subscribe(state => {
        if (state) {
          if (!this.isSupervisor) {
            this.timeslotService.bookTimeslotAsStudent(selectedTimeslot, this.booker).subscribe(
              _ => {
                this.confirmBooking(selectedTimeslot);
              },
              // Phase FINAL: Error Handling
              error => {
                this.toastService.error(
                  `Failed to book timeslot ${JSON.stringify(error.message)}`,
                  'Timeslot Booking'
                );
              }
            );
          } else {
            // Edge case : Supervisor can self book an timeslot
            this.timeslotService.bookTimeslotAsSupervisor(selectedTimeslot, this.booker).subscribe(
              _ => {
                this.confirmBooking(selectedTimeslot);
              },
              // Phase FINAL: Error Handling
              error => {
                this.toastService.error(
                  `Failed to book timeslot ${JSON.stringify(error.message)}`,
                  'Timeslot Booking'
                );
              }
            );
          }
        }
      });
    });
  }
  unbookAllTimeslot() {
    if (this.isSupervisor) {
      this.timeslotService
        .unbookTimeslotsBySupervisor(this.booker)
        .subscribe(_ => this.updateTimeslotInformation());
    } else {
      this.timeslotService
        .unbookTimeslotsByStudent(this.booker)
        .subscribe(_ => this.updateTimeslotInformation());
    }
  }

  updateTimeslotInformation() {
    this.graphService
      .getMe()
      .pipe(
        tap(me => {
          this.booker = {
            displayName: me.displayName,
            uniqueID: me.id,
            email: me.mail
          };
        }),
        mergeMap(user => {
          //  Bug 3 : Check if it's student, thenswitch to different API output
          if (user.jobTitle === 'Student' && user.mail !== 'i7467177@bournemouth.ac.uk') {
            this.isSupervisor = false;
            return this.timeslotService.getTimeslotsViaStudentID(user.id);
          }
          this.isSupervisor = true;
          return this.timeslotService.getTimeslotsViaSupervisorID(user.id);
        })
      )
      .subscribe(
        (data: any) => {
          (this.group = data), (this.timeslotGroup = data);
          this.cdr.detectChanges();
        },
        error => {
          this.isError = true;
          this.toastService.error(error.message, 'Timeslot Retreival', {
            timeOut: 20000,
            progressBar: true
          });
        }
      );
  }

  // Helper Functions
  confirmBooking(selectedTimeslot) {
    // Phase 1 : Client confirm
    this.toastService.success(
      `Successfully booked timeslot ${JSON.stringify(selectedTimeslot)}`,
      'Timeslot Booking'
    );
    // Phase 2 : Email
    this.customMailService.sentEmailWithCC(
      this.booker.email,
      'JackalTrack Timeslot Booking',
      this.makeBookingEmailContent(selectedTimeslot),
      this.group.supervisor.email
    );
    // Phase 3 : Update UI and data
    this.updateTimeslotInformation();
  }

  makeBookingEmailContent(bookedTimeslot: Timeslot) {
    const message = `
    <h1>Timeslot Booking</h1>
    <strong>
    Start from : <time datetime="${this.timeslotGroup.meetingPeriod.start}">
    ${moment(this.timeslotGroup.meetingPeriod.start).format('dddd DD MMMM YYYY')} </time> -
    Until : <time datetime="${this.timeslotGroup.meetingPeriod.end}">
    ${moment(this.timeslotGroup.meetingPeriod.end).format('dddd DD MMMM YYYY')} </time>
    </strong>
    <br />
    ${this.booker.displayName} have booked the following timeslot :
    Every ${moment(bookedTimeslot.startTime).format('dddd')}
    from ${moment(bookedTimeslot.startTime).format('hh:mm a')}
    to  ${moment(bookedTimeslot.endTime).format('hh:mm a')}.
    `;
    return message;
  }
}
