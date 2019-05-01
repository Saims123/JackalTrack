import { Injectable, OnInit } from '@angular/core';
import { Student, SupervisionService, Supervisor } from '../supervision/supervision.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { mergeMap } from 'rxjs/operators';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class TimeslotService implements OnInit {
  timeslots: Timeslot[] = [];
  students: Student[] = [];
  supervisor: Supervisor;
  constructor(private supervisionService: SupervisionService, private http: HttpClient) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    this.supervisionService.supervisionGroup.subscribe(group => {
      (this.students = group[0].students), (this.supervisor = group[0].supervisor);
    });
  }

  deleteCurrentTimeslots() {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.delete(`${JackalNestAPI.Timeslots}/supervisor/${group[0].supervisor.uniqueID}`)
      )
    );
  }

  getSupervisorTimeslotsFromNest() {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group => this.getTimeslotsViaSupervisorID(group[0].supervisor.uniqueID))
    );
  }

  getTimeslotsViaSupervisorID(supervisorID) {
    return this.http.get(`${JackalNestAPI.Timeslots}/supervisor/${supervisorID}`);
  }

  getTimeslotsViaStudentID(studentID) {
    return this.http.get(`${JackalNestAPI.Timeslots}/student/${studentID}`);
  }
  addNewTimeslot(_timeslot: Timeslot[], _meetingPeriod: MeetingPeriod) {
    return this.supervisionService.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.post(`${JackalNestAPI.Timeslots}/supervisor/${group[0].supervisor.uniqueID}`, {
          timeslots: _timeslot,
          meetingPeriod: _meetingPeriod
        })
      )
    );
  }
  unbookTimeslotsByStudent(_student: Student) {
    return this.http.put(`${JackalNestAPI.Timeslots}/booking/cancel/student/${_student.uniqueID}`, {});
  }
  unbookTimeslotsBySupervisor(_supervisor: Supervisor) {
    return this.http.put(`${JackalNestAPI.Timeslots}/booking/cancel/supervisor/${_supervisor.uniqueID}`, {});
  }

  updateTimeslot(_timeslot: Timeslot, supervisorID) {
    return this.http.put(`${JackalNestAPI.Timeslots}/timeslot/update/supervisor/${supervisorID}`, {
      timeslot: _timeslot
    });
  }

  // Due to Mongoose and JackalNest backend finds the document using supervisor ID, it is needed to speerate the API
  // into two seperate search parameters, redundancy could be resolved in future
  bookTimeslotAsStudent(_timeslot: Timeslot, _student: Student | Supervisor) {
    return this.http.put(`${JackalNestAPI.Timeslots}/booking/student/${_student.uniqueID}`, {
      student: _student,
      timeslot: _timeslot
    });
  }

  bookTimeslotAsSupervisor(_timeslot: Timeslot, _supervisor: Supervisor) {
    return this.http.put(`${JackalNestAPI.Timeslots}/booking/supervisor/${_supervisor.uniqueID}`, {
      student: _supervisor,
      timeslot: _timeslot
    });
  }

  checkTimetableStatus(meetingPeriodEnd) {
    if (moment.utc(meetingPeriodEnd).isAfter(moment.utc())) {
      return true;
    }
    return false;
  }
}

export interface Timeslot {
  day: string;
  startTime: string;
  endTime: string;
  bookedBy?: Student;
  sendICS?: boolean;
}
export interface MeetingPeriod {
  start: string;
  end: string;
  location: string;
}

export interface TimeslotPeriod {
  timeslots: Timeslot[];
  meetingPeriod: MeetingPeriod;
}
