import { Injectable } from '@angular/core';
import { Student, SupervisionService } from '../supervision.service';
import { MessageService } from 'primeng/api';
@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  timeslots: Timeslot[] = [];
  constructor(
    private messageService: MessageService,
    private supervisionService: SupervisionService
  ) {}

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
    this.messageService.add({
      severity: 'success',
      summary: 'Timeslot created successfully',
      detail: 'Send to all students successfully'
    });

    console.log(this.timeslots);
  }

  getTimeslots() {
    return this.timeslots;
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
    this.supervisionService.getStudents().subscribe(data => (students = data));

    this.timeslots.forEach(timeslot => { // Special Reverse search for students
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
