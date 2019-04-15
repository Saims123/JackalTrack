import { Injectable, OnInit } from '@angular/core';
import {
  Student,
  SupervisionService,
  Supervisor
} from '../supervision/supervision.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { mergeMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TimeslotService implements OnInit {
  timeslots: Timeslot[] = [];
  students: Student[] = [];
  supervisor: Supervisor;
  constructor(
    private supervisionService: SupervisionService,
    private http: HttpClient
  ) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    this.supervisionService.supervisionGroup.subscribe(group => {
      (this.students = group[0].students),
        (this.supervisor = group[0].supervisor);
    });
  }

  // tslint:disable:variable-name
  populateTimeslot(
    _day: string,
    _startTime: string,
    _endTime: string,
    _student?: Student
  ) {
    this.timeslots.push({
      day: _day,
      startTime: _startTime,
      endTime: _endTime,
      student: _student
    });
  }

  initiateNewTimeslot(timeslots: Timeslot[]) {
    this.timeslots = timeslots;
    console.log(this.timeslots);
  }

  getSupervisorTimeslotsFromNest() {
  return this.supervisionService.supervisionGroup.pipe(
     mergeMap(group =>
       this.http.get(`${JackalNestAPI.Timeslots}/supervisor/${group[0].supervisor.uniqueID}`))
     );
  }
  addNewTimeslot(timeslot: Timeslot[]) {
    return this.supervisionService.supervisionGroup.pipe( mergeMap(group => this.http.post(
      `${JackalNestAPI.Timeslots}/supervisor/${group[0].supervisor.uniqueID}`,
      {timeslots: timeslot}
    )));
  }
  bookTimeslot(timeslot: number, student: Student) {
    const index = this.timeslots.findIndex(ts => ts.student !== student);

    // if (index < 0) {
    //   this.timeslots.find(ts => ts === timeslot).student = student;
    //   // Send success message
    // }
    if (this.timeslots.length > 0) {
      this.timeslots[timeslot].student = student;
    }
  }
  getStudentsNotBookedSlots() {
    let students: Student[] = [];

    this.timeslots.forEach(timeslot => {
      // Special Reverse search for students
      if ('student' in timeslot) {
        students.splice(students.indexOf(timeslot.student), 1);
      }
    });

    console.warn('Not booked : ', students);
    return students;
  }
}

export interface Timeslot {
  day: string;
  startTime: string;
  endTime: string;
  student: Student;
}
export interface MeetingPeriod {
  start: Date;
  end: Date;
  location: string;
}
