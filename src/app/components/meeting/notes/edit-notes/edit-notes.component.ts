import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  MeetingNotesService,
  TodoList,
  MeetingNote
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { Student, SupervisionService } from 'src/app/services/supervision/supervision.service';
import { Validators, FormBuilder } from '@angular/forms';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { mergeMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-notes',
  templateUrl: './edit-notes.component.html',
  styleUrls: ['./edit-notes.component.scss']
})
export class EditNotesComponent implements OnInit {
  student: Student;
  todoList: TodoList[] = [];
  newMeetingNote: MeetingNote;
  createdDateTime: any;
  routeSub: any;
  notes: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private supervisionService: SupervisionService,
    private meetingNoteService: MeetingNotesService,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private toastService: ToastrService
  ) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    const studentGroup = this.activeRoute.params.pipe(
      tap(param => {
        this.createdDateTime = param.createdDate;
      }),
      mergeMap(param => this.supervisionService.getSingleStudent(param.id))
    );
    studentGroup.subscribe((group: any) => {
      this.student = group.student;
      this.meetingNoteService
        .getOneStudentNote(this.student, this.createdDateTime)
        .subscribe(note => {
          this.notes = note.notes;
          this.todoList = note.todoList;
        });
    });
    this.cdr.detectChanges();
  }

  generateNewTask() {
    this.addNewTodoList(`New Task ${this.todoList.length + 1}`);
  }

  removeTask(task) {
    this.todoList.splice(this.todoList.findIndex(list => list === task), 1);
  }

  ngOnDestroy() {}

  addNewTodoList(_task: string) {
    this.todoList.push({ task: _task, completed: false });
  }

  onSubmit() {
    this.newMeetingNote = {
      created: this.createdDateTime,
      notes: this.notes,
      todoList: this.todoList
    };
    this.meetingNoteService
      .updateMeetingNoteToStudent(this.student.uniqueID, this.newMeetingNote)
      .subscribe(
        _ => {
          this.toastService.success('Successfully updated meeting note!', 'Update Meeting note');
          this.goBack();
        },
        error => {
          this.toastService.success(
            'Failed to updated meeting note!\n' + error,
            'Update Meeting note'
          );
        }
      );
  }

  goBack() {
    this.location.back();
  }
}
