import { Component, OnInit } from '@angular/core';
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
    private supervision: SupervisionService
  ) {}

  ngOnInit() {
    this.supervision.getStudents().subscribe(student => {
      this.timeslotService.bookTimeslot(1, student[0]);
    });
    this.timeslots = this.timeslotService.getTimeslots();
    this.students = this.timeslotService.getStudentsNotBookedSlots();
  }
}
