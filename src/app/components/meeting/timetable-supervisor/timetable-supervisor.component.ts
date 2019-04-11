import { Component, OnInit } from '@angular/core';
import {
  TimeslotService,
  Timeslot
} from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionService,
  Student
} from 'src/app/services/supervision/supervision.service';
import { SupervisorService } from 'src/app/services/supervision/supervisor.service';

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
    private supervision: SupervisionService,
    private supervisor: SupervisorService
  ) {}

  ngOnInit() {
    this.supervisor.getSupervisor().subscribe(supervisor => {
      this.supervision
        .getSupervisionGroupFromNest(supervisor.uniqueID)
        .subscribe((group: any) => {
          this.timeslotService.bookTimeslot(1, group.students[0]);
        });
    });

    this.timeslots = this.timeslotService.getTimeslots();
    this.students = this.timeslotService.getStudentsNotBookedSlots();
  }
}
