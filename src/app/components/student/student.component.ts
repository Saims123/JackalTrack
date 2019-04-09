import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  SupervisionService,
  Student
} from '../../services/supervision.service';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription, of } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  startWith,
  distinctUntilChanged,
  catchError
} from 'rxjs/operators';
import { DeleteConfirmationDialog } from './dialogbox/delete-dialog-component';
import { ToastrService } from 'ngx-toastr';
import { GraphService } from 'src/app/services/graph/graph.service';
// Table Documentation https://material.angular.io/components/table/examples
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['displayName', 'email', 'course', 'Actions'];
  dataSource: MatTableDataSource<Student>;
  dataSubscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  newStudentControl = new FormControl();

  studentsForm: FormGroup;
  options: Student[] = [];

  courses = [
    'Software Engineering',
    'Computing',
    'Business In Computing',
    'Forensics'
  ];
  filteredStudents: Student[] = [];
  isLoading = false;
  constructor(
    public studentService: SupervisionService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private graphService: GraphService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.studentsForm = this.fb.group({ userInput: null, courseInput: null });
    this.studentsForm
      .get('userInput')
      .valueChanges.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => (this.isLoading = true))
      )
      .subscribe(users => {
        this.graphService
          .getUsers(users)
          .subscribe(
            res => (
              (this.filteredStudents = res),
              debounceTime(100),
              (this.isLoading = false)
            )
          );

      });

    this.refreshStudentList();
  }

  displayFn(user?: Student): string | undefined {
    return user ? user.displayName : undefined;
  }

  removeStudent(student: Student): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      data: student
    });
    dialogRef.afterClosed().subscribe(state => {
      if (state) {
        this.studentService.removeStudent(student.id);
        this.refreshStudentList();
        this.toastService.success(
          `Successfully deleted ${student.displayName}`,
          'Delete Student'
        );
      }
    });
  }

  refreshStudentList(): void {
    this.dataSubscription = this.studentService
      .getStudents()
      .subscribe(students => (this.dataSource.data = [...students]));
    this.dataSource.sort = this.sort;
  }

  addStudent() {
    const selectedStudent = this.studentsForm.get('userInput').value;
    const courseName = this.studentsForm.get('courseInput').value;

    let newStudent: Student = {
      uniqueID: selectedStudent.id,
      course: courseName,
      displayName: selectedStudent.displayName,
      email: selectedStudent.mail
    };

    this.studentService.addStudent(newStudent);
    console.log(newStudent);
    this.refreshStudentList();

    this.studentsForm.get('userInput').reset();
    this.studentsForm.get('courseInput').reset();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}

interface Option {
  name: string;
}
