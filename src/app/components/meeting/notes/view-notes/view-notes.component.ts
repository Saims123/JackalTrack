import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import {
  MeetingNotesService,
  MeetingNote
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { Student } from 'src/app/services/supervision/supervision.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'view-meeting-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit, OnChanges {
  @Input() public student: Student;
  meetingNotes: Observable<MeetingNote[]>;
  constructor(
    private meetingNoteService: MeetingNotesService,
    private cdr: ChangeDetectorRef  ) {}

  ngOnInit() {
    this.getMeetingNotesFromNest();
    this.meetingNotes.subscribe(data => {
      console.log(data);
    });
  }

  ngOnChanges(sc: SimpleChanges) {
    this.getMeetingNotesFromNest();
    this.meetingNotes.subscribe(data => {
      console.log(data[0], 'Current value');
      this.cdr.detectChanges();
    });
  }

  deleteMeetingNote(selectedNote) {
    this.meetingNoteService.deleteStudentNote(this.student, selectedNote).subscribe(_ => {
      this.getMeetingNotesFromNest();
      this.cdr.detectChanges();
    });
  }

  getMeetingNotesFromNest() {
      this.meetingNotes = this.meetingNoteService.getStudentNotes(this.student);
  }

  revealChanges(data, data2) {
    console.log(data, data2);
  }
}
