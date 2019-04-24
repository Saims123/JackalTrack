import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  TimeslotService,
  Timeslot,
  TimeslotPeriod,
  MeetingPeriod
} from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionService,
  Student,
  SupervisionGroup,
  Supervisor
} from 'src/app/services/supervision/supervision.service';

@Component({
  selector: 'app-timetable-supervisor',
  templateUrl: './timetable-supervisor.component.html',
  styleUrls: ['./timetable-supervisor.component.scss']
})
export class TimetableSupervisorComponent implements OnInit {
  timeslots: Timeslot[] = [];
  supervisor: Supervisor;
  meetingPeriod: MeetingPeriod;
  students: Student[] = [];
  studentsNotBooked: Student[] = [];
  constructor(
    private timeslotService: TimeslotService,
    private supervisionService: SupervisionService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this.timeslotService
      .getSupervisorTimeslotsFromNest()
      .subscribe((timeslotPeriods: any) => {
        this.supervisor = timeslotPeriods.supervisor,
        this.timeslots = timeslotPeriods.timeslots;
        this.meetingPeriod = timeslotPeriods.meetingPeriod;
        this.cdr.detectChanges();
        this.findStudentsNotBooked();
      });
  }

  deleteCurrentTimeslot() {
    this.timeslotService.deleteCurrentTimeslots();
  }

  sendICS(data) {
    this.

    console.warn(data.sendICS = !data.sendICS, ' TO BE SEND AS ICS' , this.supervisor.uniqueID);

  }

  findStudentsNotBooked() {
    // DT : Could be improved with third party advanced filtering system using lambda
    let students: Student[] = [];
    this.supervisionService.supervisionGroup.subscribe(
      (group: SupervisionGroup) => {
        this.studentsNotBooked = group[0].students;
        group[0].students.forEach(student => {
          this.timeslots.forEach(timeslot => {
            if (student.uniqueID === timeslot.bookedBy.uniqueID) {
              students.push(student);
            }
          });
        });
        students.forEach(student => {
          this.studentsNotBooked.splice(
            this.studentsNotBooked.indexOf(student),1
          );
        });
        this.students = students;
        this.cdr.detectChanges();
      }
    );
  }
}
