import { Injectable } from '@angular/core';
import { SupervisionService, Student } from '../supervision/supervision.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingNotesService {
  constructor(public supervisionService: SupervisionService, private http: HttpClient) {}

  addMeetingNoteToStudent(_studentID: string, _note: MeetingNote) {
    return this.http.post(`${JackalNestAPI.MeetingNotes}/new/${_studentID}`, {
      created: _note.created,
      todoList: _note.todoList,
      notes: _note.notes,
      title: _note.title
    });
  }

  updateMeetingNoteToStudent(_studentID: string, _note: MeetingNote) {
    return this.http.put(`${JackalNestAPI.MeetingNotes}/edit/${_studentID}`, {
      created: _note.created,
      todoList: _note.todoList,
      notes: _note.notes,
      title: _note.title
    });
  }

  updateTodolistToStudent(_studentID: string, _note: MeetingNote, todolist: any[]) {
    return this.http.put(`${JackalNestAPI.MeetingNotes}/edit/${_studentID}`, {
      created: _note.created,
      todoList: todolist,
      notes: _note.notes,
      title: _note.title
    });
  }
  getStudentNotes(_student: Student): Observable<MeetingNote[]> {
    return this.http.get<MeetingNote[]>(`${JackalNestAPI.MeetingNotes}/${_student.uniqueID}`);
  }
  getOneStudentNote(_student: Student, _created: string): Observable<MeetingNote> {
    return this.http.get<MeetingNote>(
      `${JackalNestAPI.MeetingNotes}/${_student.uniqueID}/${_created}`
    );
  }

  deleteStudentNote(_student: Student, note: MeetingNote) {
    return this.http.delete(`${JackalNestAPI.MeetingNotes}/${_student.uniqueID}/${note.created}`);
  }
}

export interface StudentNotes {
  student: Student;
  meetingNotes: MeetingNote[];
}

export interface MeetingNote {
  title?: string;
  created: string;
  todoList?: TodoList[];
  notes: string;
}

export interface TodoList {
  task: string;
  completed: boolean;
}
