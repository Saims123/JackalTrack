import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  TimeslotService,
  Timeslot
} from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionService,
  Student
} from 'src/app/services/supervision/supervision.service';

@Component({
  selector: 'app-timetable-supervisor',
  templateUrl: './timetable-supervisor.component.html',
  styleUrls: ['./timetable-supervisor.component.scss']
})
export class TimetableSupervisorComponent implements OnInit {
  timeslots: Timeslot[] = [];
  students: Student[] = [];
  constructor(
    private timeslotService: TimeslotService,
    private supervisionService: SupervisionService,
    private cdr: ChangeDetectorRef
  ) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    this.timeslotService
      .getSupervisorTimeslotsFromNest()
      .subscribe((timeslots: Timeslot[]) => {
        this.timeslots = timeslots;
        this.cdr.detectChanges();
      });
    this.students = this.timeslotService.getStudentsNotBookedSlots();

    this.supervisionService.supervisionGroup.subscribe(
      group => (this.students = group.students)
    );
  }
}
