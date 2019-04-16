import { Injectable, OnInit } from '@angular/core';
import { SupervisionService, Student } from '../supervision/supervision.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingNotesService implements OnInit {
  notes: MeetingNote[] = [];
  students: Student[] = [];
  studentNotes: StudentNotes[] = [];
  constructor(public supervisionService: SupervisionService) {
    this.supervisionService.getSupervisionGroup();
  }
  ngOnInit(): void {
    this.supervisionService.supervisionGroup.subscribe(group => {
      this.students = group[0].students;
    });
  }
  addMeetingNoteToStudent(_student: Student, _notes: MeetingNote[]) {
    const index = this.studentNotes.findIndex(notes => notes.student === _student);
    if (index > 0) {
      this.studentNotes[index].meetingNotes = _notes;
    } else {
      this.studentNotes.push({
        student: _student,
        meetingNotes: _notes
      });
    }
  }

  getStudentNotes(student: Student) {
    return this.studentNotes.filter(studentNotes => studentNotes.student === student);
  }

  createNewMeetingNote(notes: MeetingNote) {
    this.notes.push(notes);
  }

  removeNote(title: string) {
    this.notes.splice(this.notes.findIndex(note => note.title === title), 1);
  }

  initiateMockData() {
    let mockNote: MeetingNote[];
    mockNote = [
      {
        title: 'Nothing special',
        todoList: [{ task: 'Task1', completed: false }, { task: 'Task2', completed: true }],
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created: new Date().toISOString()
      },
      {
        title: 'Nothing special2',
        todoList: [{ task: 'Task1', completed: true }, { task: 'Task2', completed: true }],
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created: new Date().toISOString()
      },
      {
        title: 'Nothing special 3',
        todoList: [{ task: 'Task1', completed: false }, { task: 'Task2', completed: true }],
        notes:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        created: new Date().toISOString()
      }
    ];

    this.addMeetingNoteToStudent(this.students[0], mockNote);
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
