import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './auth/user';

@Injectable({
  providedIn: 'root'
})
export class SupervisionService {
  students: Student [];

  constructor() {
    this.students = [
    {displayName: 'Student 1', email: 'student1@bournemouth.ac.uk', course: 'Software Engineering', id: 0},
      { displayName: 'Student 2', email: 'student2@bournemouth.ac.uk', course: 'BIT', id: 1},
      { displayName: 'Student 3', email: 'student3@bournemouth.ac.uk', course: 'Forensics', id: 2}
    ];

  }


  addStudent(name: string, _course: string): void {
    let _email: string = name + '@bournemouth.ac.uk';
    this.students.push({displayName: name, email: _email, course: _course, id: this.students.length});
  }

  removeStudent(_id: any): void {
    this.students.splice(_id, 1);
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
  uniqueID ?: string;
}
