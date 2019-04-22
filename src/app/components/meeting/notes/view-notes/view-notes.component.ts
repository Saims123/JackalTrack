import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import {
  MeetingNotesService,
  MeetingNote
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { Student } from 'src/app/services/supervision/supervision.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'view-meeting-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit, OnChanges {
  @Input() public student: Student;
  meetingNotes: Observable<MeetingNote[]>;
  meetingNotesLength = 0;
  constructor(
    private meetingNoteService: MeetingNotesService,
    private cdr: ChangeDetectorRef,
    private router: Router) {}

  ngOnInit() {
  }

  ngOnChanges(sc: SimpleChanges) {
    this.getMeetingNotesFromNest();
    this.meetingNotes.subscribe(data => {
      this.meetingNotesLength = data.length;
      this.cdr.detectChanges();
    });
  }

  deleteMeetingNote(selectedNote) {
    this.meetingNoteService.deleteStudentNote(this.student, selectedNote).subscribe(_ => {
      this.getMeetingNotesFromNest();
      this.cdr.detectChanges();
    });
  }

  editMeetingNote(_note) {
    this.router.navigate(['meeting/notes/edit/student/', this.student.uniqueID, 'created' ,_note.created]);
  }

  getMeetingNotesFromNest() {
      this.meetingNotes = this.meetingNoteService.getStudentNotes(this.student);
  }

  revealChanges(data, data2) {
    console.log(data, data2);
  }
}
