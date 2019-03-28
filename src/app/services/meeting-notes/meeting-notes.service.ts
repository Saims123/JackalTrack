import { Injectable } from '@angular/core';
import { SupervisionService, Student } from '../supervision.service';

@Injectable({
  providedIn: 'root'
})
export class MeetingNotesService {
  notes: MeetingNote[] = [];
  constructor(public supervision: SupervisionService) { }


  addMeetingNoteToStudent(_student: Student, _notes: MeetingNote[]) {
    let studentNotes: StudentNotes = {student: _student, meetingNotes : _notes};
  }


  createNewMeetingNote(notes: MeetingNote) {
    this.notes.push(notes);
  }


}


export interface StudentNotes {
  student: Student;
  meetingNotes: MeetingNote[];
}

export interface MeetingNote {
  title: string;
  created: string;
  todoList: TodoList [];
  notes: string;
}


export interface TodoList {
  task: string;
  completed: boolean;
}
