import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  students: Student [];

  constructor() {
    this.students = [
    {displayName: 'Student 1', email: 'student1@bournemouth.ac.uk', course: 'Software Engineering', id: 0}
    ];


  }


  addStudent(name: string, _course: string): void {
    let _email: string = name + '@bournemouth.ac.uk';
    this.students.push({displayName: name, email: _email, course: _course, id: this.students.length});
  }

  removeStudent(_id: any): void {
    this.students.splice(_id, 0);
  }

  getStudents(): Observable<Student []> {
    return of(this.students);
  }




}


export interface Student {
  displayName: string;
  email: string;
  course: string;
  id: any;
}
