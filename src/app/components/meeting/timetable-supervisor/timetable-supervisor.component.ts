import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import {
  TimeslotService,
  Timeslot,
  MeetingPeriod
} from 'src/app/services/timeslots/timeslot.service';
import {
  SupervisionService,
  Student,
  SupervisionGroup,
  Supervisor
} from 'src/app/services/supervision/supervision.service';
import { GraphService } from 'src/app/services/graph/graph.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-timetable-supervisor',
  templateUrl: './timetable-supervisor.component.html',
  styleUrls: ['./timetable-supervisor.component.scss']
})
export class TimetableSupervisorComponent implements OnInit, OnDestroy {
  timeslots: Timeslot[] = [];
  supervisor: Supervisor;
  meetingPeriod: MeetingPeriod;
  subscription: Subscription[] = [];
  studentsNotBooked: Student[] = [];
  constructor(
    private timeslotService: TimeslotService,
    private supervisionService: SupervisionService,
    private cdr: ChangeDetectorRef,
    private graphService: GraphService
  ) {}

  ngOnInit() {
    this.timeslotService.getSupervisorTimeslotsFromNest().subscribe((timeslotPeriods: any) => {
      (this.supervisor = timeslotPeriods.supervisor), (this.timeslots = timeslotPeriods.timeslots);
      this.meetingPeriod = timeslotPeriods.meetingPeriod;
      this.cdr.detectChanges();
      this.findStudentsNotBooked();
    });
  }

  deleteCurrentTimeslot() {
    this.timeslotService.deleteCurrentTimeslots();
  }

  sendICS(timeslot) {
    timeslot.sendICS = !timeslot.sendICS;
    const student = this.supervisionService.getSingleStudent(timeslot.bookedBy.uniqueID);

    const timeslotUpdate = this.timeslotService.updateTimeslot(timeslot, this.supervisor.uniqueID);
    const multiFork = forkJoin([student, timeslotUpdate]).subscribe((results: any) => {
      this.graphService.sendTimeslotEventToStudent(
        results[0].student.email,
        'Project Meeting',
        'Final year project meeting timeslot',
        this.meetingPeriod,
        timeslot
      );
    });
    this.subscription.push(multiFork);
  }

  findStudentsNotBooked() {
    // DT : Could be improved with third party advanced filtering system using lambda
    let students: Student[] = [];
    const sub = this.supervisionService.supervisionGroup.subscribe((group: SupervisionGroup) => {
      this.studentsNotBooked = group[0].students;
      group[0].students.forEach(student => {
        this.timeslots.forEach(timeslot => {
          if (student.uniqueID === timeslot.bookedBy.uniqueID) {
            students.push(student);
          }
        });
      });
      students.forEach(student => {
        this.studentsNotBooked.splice(this.studentsNotBooked.indexOf(student), 1);
      });
      this.cdr.detectChanges();
      this.subscription.push(sub);
    });
  }

  ngOnDestroy() {
    this.subscription.forEach(sub => sub.unsubscribe());
  }
}
