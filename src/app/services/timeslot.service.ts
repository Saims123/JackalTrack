import { Injectable } from '@angular/core';
import { Student } from '../components/student/student.service';

@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  timeslots: Timeslot[] = [];
  constructor() { }
}


interface Timeslot {
  availableStartTime: string;
  availableEndTime: string;
  student: Student;
}
