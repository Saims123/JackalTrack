import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Student } from 'src/app/services/supervision/supervision.service';
import { Router } from '@angular/router';
import { GraphService } from 'src/app/services/graph/graph.service';
import { mergeMap } from 'rxjs/operators';
import {
  MeetingNotesService,
  MeetingNote
} from 'src/app/services/meeting-notes/meeting-notes.service';

@Component({
  selector: 'app-notes-student',
  templateUrl: './notes-student.component.html',
  styleUrls: ['./notes-student.component.scss']
})
export class NotesStudentComponent implements OnInit {
  student: Student;
  constructor(
    private ngZone: NgZone,
    private router: Router,
    private graphService: GraphService,
    public cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.graphService.getMe().subscribe(user => {
      this.student = {
        uniqueID: user.id,
        displayName: user.displayName
      };
      this.cdr.detectChanges();
    });
  }

  createNewNote() {
    this.ngZone.run(_ => {
      this.router.navigate(['meeting/notes/new/student/', this.student.uniqueID]);
    });
  }
}
