import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { SupervisionService, Student } from 'src/app/services/supervision/supervision.service';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  selectedStudent: Student;
  students: Observable<Student[]>;
  constructor(
    private supervisionService: SupervisionService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    this.supervisionService.supervisionGroup
      .pipe(
        tap(group => {
          this.selectedStudent = group[0].students[0];
        })
      )
      .subscribe(_group => {
        (this.students = _group[0].students), this.cdr.detectChanges();
      });
  }

  createNewNote() {
    this.ngZone.run(_ => {
      this.router.navigate(['meeting/notes/new/student/', this.selectedStudent.uniqueID]);
    });
  }

  selectStudentOnClick(student: Student) {
    this.selectedStudent = student;
    this.cdr.detectChanges();
  }
}
