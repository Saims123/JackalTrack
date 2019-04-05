import { Injectable } from '@angular/core';
import { Student } from '../supervision.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  attendanceRecord : AttendaceRecord[];
  constructor() { 
    
  }
}


export interface AttendaceRecord {
  student: Student;
  records : Attendance[];
}

interface Attendance {
  date: string;
  attended: AttendanceState; 
  //Might need to update depending on the requirement 
}
enum AttendanceState {
  Yes= 1, No = 0 , Cancelled=2, Unknown=3
}