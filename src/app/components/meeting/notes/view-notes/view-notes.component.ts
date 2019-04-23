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
  MeetingNote,
  StudentNotes
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { Student } from 'src/app/services/supervision/supervision.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DeleteNoteConfirmationDialog } from '../dialogbox/delete-dialog-component';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastrService
  ) {}

  ngOnInit() {}

  ngOnChanges(sc: SimpleChanges) {
    this.getMeetingNotesFromNest();
  }

  deleteMeetingNote(selectedNote: MeetingNote) {
    const addDeleteDialog = this.dialog.open(DeleteNoteConfirmationDialog, {data : {}});
    addDeleteDialog.afterClosed().subscribe(state => {
      if (state) {
        this.meetingNoteService.deleteStudentNote(this.student, selectedNote).subscribe(_ => {
          this.toastService.success('Successfully deleted meeting note', 'Delete Meeting Note');
          this.getMeetingNotesFromNest();
        });
      }
    });
  }

  editMeetingNote(selectedNote: MeetingNote) {
    this.router.navigate([
      'meeting/notes/edit/student/',
      this.student.uniqueID,
      'created',
      selectedNote.created
    ]);
  }

  getMeetingNotesFromNest() {
    this.meetingNotes = this.meetingNoteService.getStudentNotes(this.student);
    this.meetingNotes.subscribe(data => {
      this.meetingNotesLength = data.length;
      this.cdr.detectChanges();
    });
  }
}
