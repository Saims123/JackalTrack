import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  MeetingNotesService,
  MeetingNote,
  StudentNotes
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { Student } from 'src/app/services/supervision.service';

@Component({
  selector: 'view-meeting-notes',
  templateUrl: './view-notes.component.html',
  styleUrls: ['./view-notes.component.scss']
})
export class ViewNotesComponent implements OnInit, OnChanges {
  @Input() public student: Student;
  meetingNotes: MeetingNote[] = [];
  constructor(private noteService: MeetingNotesService) {}

  ngOnInit() {
    this.noteService.initiateMockData();
  }

  ngOnChanges(sc: SimpleChanges) {
    this.meetingNotes = [];
    console.log(sc);
    this.noteService.getStudentNotes(this.student).forEach(student => {
      student.meetingNotes.forEach(notes => {
        this.meetingNotes.push(notes);
      });
    });
    console.log(this.meetingNotes);
  }

  revealChanges(data, data2){
    console.log(data, data2);
  }
}
