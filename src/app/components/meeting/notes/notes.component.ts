import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit
} from '@angular/core';
import {
  SupervisionService,
  Student
} from 'src/app/services/supervision/supervision.service';
import {
  MeetingNotesService,
  MeetingNote
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { group } from '@angular/animations';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, AfterViewInit {
  selectedStudent: Student;
  students: Observable<Student[]>;
  meetingNotes: MeetingNote[] = [];
  constructor(
    public supervisionService: SupervisionService,
    public meetingNoteService: MeetingNotesService,
    public cdr: ChangeDetectorRef
  ) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    this.supervisionService.supervisionGroup
      .pipe(
        tap(group => {
          (this.selectedStudent = group[0].students[0])
        })
      )
      .subscribe(_group => {
        (this.students = _group[0].students),
          console.log(this.students),
          this.cdr.detectChanges();
      });
  }
  ngAfterViewInit() {}

  selectStudentOnClick(student: Student) {
    console.log(student, this.selectedStudent);

    this.selectedStudent = student;
    this.cdr.detectChanges();
  }
}
