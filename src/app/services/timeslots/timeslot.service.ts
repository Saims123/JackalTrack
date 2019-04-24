import { Injectable, OnInit } from '@angular/core';
import {
  Student,
  SupervisionService,
  Supervisor
} from '../supervision/supervision.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { mergeMap, tap } from 'rxjs/operators';
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

  deleteCurrentTimeslots() {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.delete(
          `${JackalNestAPI.Timeslots}/supervisor/${
            group[0].supervisor.uniqueID
          }`
        )
      )
    );
  }

  getSupervisorTimeslotsFromNest() {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.getTimeslotsViaSupervisorID(group[0].supervisor.uniqueID)
      )
    );
  }

  getTimeslotsViaSupervisorID(supervisorID) {
    return this.http.get(
      `${JackalNestAPI.Timeslots}/supervisor/${supervisorID}`
    );
  }
  getTimeslotsViaStudentID(studenrID) {
    return this.http.get(`${JackalNestAPI.Timeslots}/student/${studenrID}`);
  }
  addNewTimeslot(_timeslot: Timeslot[], _meetingPeriod: MeetingPeriod) {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.post(
          `${JackalNestAPI.Timeslots}/supervisor/${
            group[0].supervisor.uniqueID
          }`,
          {
            timeslots: _timeslot,
            meetingPeriod: _meetingPeriod
          }
        )
      )
    );
  }
  unbookTimeslots(_student: Student) {
    return this.supervisionService.supervisionGroup.pipe(
      tap(_ => {
        console.warn('I was triggered');
      }),
      mergeMap(group =>
        this.http.put(
          `${JackalNestAPI.Timeslots}/booking/cancel/student/${
            _student.uniqueID
          }`,
          {
            supervisor: { uniqueID: group[0].supervisor.uniqueID }
          }
        )
      )
    );
  }

  bookTimeslot(_timeslot: Timeslot, _student: Student) {
    return this.http.put(
      `${JackalNestAPI.Timeslots}/booking/student/${_student.uniqueID}`,
      {
        student: _student,
        timeslot: _timeslot
      }
    );
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

export interface TimeslotPeriod {
  timeslots: Timeslot[];
  meetingPeriod: MeetingPeriod;
}
