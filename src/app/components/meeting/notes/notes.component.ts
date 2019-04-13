import { Component, OnInit } from '@angular/core';
import { SupervisionService, Student } from 'src/app/services/supervision/supervision.service';
import {
  MeetingNotesService,
  MeetingNote
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { group } from '@angular/animations';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  selectedStudent: Student;
  constructor(
    public supervisionService: SupervisionService,
    public meetingNoteService: MeetingNotesService
  ) {
    this.supervisionService.getSupervisionGroup();
  }
  students: Student[] = [];
  meetingNotes: MeetingNote[] = [];

  ngOnInit() {
    this.supervisionService.supervisionGroup.subscribe(_group => {
      (this.students = _group[0].students), console.log(this.students);

    });
  }

  selectStudentOnClick(student: Student) {
    this.selectedStudent = student;
  }
}
