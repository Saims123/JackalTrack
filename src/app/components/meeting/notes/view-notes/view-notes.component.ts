import { Component, Input, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import {
  MeetingNotesService,
  MeetingNote,
  StudentNotes,
  TodoList
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
export class ViewNotesComponent implements OnChanges {
  @Input() public student: Student;
  meetingNotes: Observable<MeetingNote[]>;
  meetingNotesLength = 0;
  todoList: any[] = [];
  constructor(
    private meetingNoteService: MeetingNotesService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private dialog: MatDialog,
    private toastService: ToastrService
  ) {}

  ngOnChanges(sc: SimpleChanges) {
    this.getMeetingNotesFromNest();
    this.cdr.detectChanges();
  }

  deleteMeetingNote(selectedNote: MeetingNote) {
    const addDeleteDialog = this.dialog.open(DeleteNoteConfirmationDialog, { data: {} });
    addDeleteDialog.afterClosed().subscribe(state => {
      if (state) {
        this.meetingNoteService.deleteStudentNote(this.student, selectedNote).subscribe(_ => {
          this.toastService.success('Successfully deleted meeting note', 'Delete Meeting Note');
          this.getMeetingNotesFromNest();
        });
      }
    });
  }

  updateToDoList(selectedNote: MeetingNote, selectedList) {
    selectedNote.todoList.find(list => list === selectedList).completed = !selectedList.completed;
    this.meetingNoteService
      .updateTodolistToStudent(this.student.uniqueID, selectedNote, selectedNote.todoList)
      .subscribe(_ => {
        this.toastService.success(
          'Successfully updated todolist for meeting note',
          'Update Todolist'
        );
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
    this.meetingNotes.subscribe(notes => {
      this.meetingNotesLength = notes.length;
      this.cdr.detectChanges();
    });
  }
}
