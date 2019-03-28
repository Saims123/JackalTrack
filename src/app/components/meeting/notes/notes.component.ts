import { Component, OnInit } from '@angular/core';
import { SupervisionService, Student } from 'src/app/services/supervision.service';
import { MeetingNotesService, MeetingNote } from 'src/app/services/meeting-notes/meeting-notes.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
selectedStudent: Student;
  constructor(public supervisionService: SupervisionService, public meetingNoteService: MeetingNotesService) { }
  students: Student [] = [];
  meetingNotes: MeetingNote[] = [];

  ngOnInit() {
    this.supervisionService.getStudents().subscribe((students) => {
      this.students = [...students];
      if (this.students.length > 0) {
        this.selectedStudent = this.students[0];
      }
    });

  }

  selectStudentOnClick(student: Student) {
      this.selectedStudent = student;
  }

}
