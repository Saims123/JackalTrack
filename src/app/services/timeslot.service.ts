import { Injectable } from '@angular/core';
import { Student } from '../components/student/student.service';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  timeslots: Timeslot[] = [];
  constructor() { }

  // tslint:disable:variable-name
  populateTimeslot(_day: string, _startTime: string, _endTime: string, _student ?: Student) {
    this.timeslots.push(
      {
        day: _day,
        startTime : _startTime,
        endTime: _endTime,
        student: _student
    });
  }

  importNewTimeslot(timeslots: Timeslot[]) {
    this.timeslots = timeslots;
    console.log(this.timeslots);
  }

  getTimeslots() {
    return this.timeslots;
  }

}


interface Timeslot {
  day: string;
  startTime: string;
  endTime: string;
  student: Student;
}
