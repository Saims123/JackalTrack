import { Injectable, OnInit } from '@angular/core';
import {
  Student,
  SupervisionService,
  Supervisor
} from '../supervision/supervision.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TimeslotService implements OnInit {
  timeslots: Timeslot[] = [];
  students: Student[] = [];
  studentsNotBooked: Observable<Student[]>;
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

  getSupervisorTimeslotsFromNest() {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.get(
          `${JackalNestAPI.Timeslots}/supervisor/${
            group[0].supervisor.uniqueID
          }`
        )
      )
    );
  }
  addNewTimeslot(_timeslot: Timeslot[], _meetingPeriod: MeetingPeriod) {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.post(
          `${JackalNestAPI.Timeslots}/supervisor/${
            group[0].supervisor.uniqueID
          }`,
          { timeslots: _timeslot, meetingPeriod: _meetingPeriod }
        )
      )
    );
  }
  bookTimeslot(timeslot: Timeslot, student: Student) {
    const index = this.timeslots.findIndex(ts => ts.bookedBy !== student);

    // if (index < 0) {
    //   this.timeslots.find(ts => ts === timeslot).student = student;
    //   // Send success message
    // }
  }
}

export interface Timeslot {
  day: string;
  startTime: string;
  endTime: string;
  bookedBy?: Student;
}
export interface MeetingPeriod {
  start: Date;
  end: Date;
  location: string;
}
