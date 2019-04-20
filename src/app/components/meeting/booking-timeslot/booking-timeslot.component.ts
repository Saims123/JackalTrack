import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TimeslotService, TimeslotPeriod } from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionService,
  SupervisionGroup,
  Student
} from 'src/app/services/supervision/supervision.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { mergeMap, tap } from 'rxjs/operators';

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
    private cdr: ChangeDetectorRef
  ) {
  }

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
    this.timeslotService
      .bookTimeslot(selectedTimeslot, this.student)
      .subscribe(_ => {
        this.updateTimeslotInformation();
      });
  }
  unbookAllTimeslot() {
    console.log('I AM CLICKED');

    this.timeslotService
      .unbookTimeslots(this.student)
      .subscribe(_ =>
        this.updateTimeslotInformation()
      );
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
        console.log(this.group), this.cdr.detectChanges();
      });
  }
}
