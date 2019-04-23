import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Student, SupervisionService } from 'src/app/services/supervision/supervision.service';
import * as moment from 'moment';
import {
  TodoList,
  MeetingNote,
  MeetingNotesService
} from 'src/app/services/meeting-notes/meeting-notes.service';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.scss']
})
export class AddNotesComponent implements OnInit, OnDestroy {
  student: Student;
  todoList: TodoList[] = [];
  newMeetingNote: MeetingNote;
  createdDateTime = moment.utc().toJSON();
  routeSub: any;

  meetingNotesForm = this.fb.group({
    student: this.student,
    todoList: [null, Validators.required],
    notes: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private routes: ActivatedRoute,
    private supervisionService: SupervisionService,
    private meetingNoteService: MeetingNotesService,
    private location: Location
  ) {
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    // Default behaviour, create a template task for further use
    this.generateNewTask();
    let studentGroup =  this.routes.params.pipe(
      mergeMap(param => this.supervisionService.getSingleStudent(param.id))
    );
    studentGroup.subscribe((group: any) => {
      this.student = (group.student);
    });
    this.routeSub = studentGroup;
  }

  generateNewTask() {
    this.addNewTodoList(`New Task ${this.todoList.length + 1}`);
  }

  removeTask(task) {
    this.todoList.splice(this.todoList.findIndex(list => list === task), 1);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  addNewTodoList(_task: string) {
    this.todoList.push({ task: _task, completed: false });
  }

  onSubmit(note) {
    this.newMeetingNote = {
      created: this.createdDateTime,
      notes: note,
      todoList: this.todoList
    };
    this.meetingNoteService
      .addMeetingNoteToStudent(this.student.uniqueID, this.newMeetingNote)
      .subscribe(_ => {
        console.warn(this.student, this.newMeetingNote);
        this.goBack();
      });
  }

  goBack() {
    this.location.back();
  }
}
