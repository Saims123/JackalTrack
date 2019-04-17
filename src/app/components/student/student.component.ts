import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import {
  SupervisionService,
  Student,
  Supervisor
} from '../../services/supervision/supervision.service';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription, of, pipe } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, tap, distinctUntilChanged } from 'rxjs/operators';
import { DeleteConfirmationDialog } from './dialogbox/delete-dialog-component';
import { ToastrService } from 'ngx-toastr';
import { GraphService } from 'src/app/services/graph/graph.service';
import { AddStudentConfirmationComponent } from './dialogbox/add-student-confirm.component';
// Table Documentation https://material.angular.io/components/table/examples
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['displayName', 'email', 'course', 'Actions'];
  dataSource: MatTableDataSource<Student>;
  dataSubscription: Subscription;
  supervisor: Supervisor;
  newStudentControl = new FormControl();
  isLoaded = false;
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
    public supervisionService: SupervisionService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private toastService: ToastrService,
    private graphService: GraphService,
    private changeDetectorRefs: ChangeDetectorRef,
    private ngZone: NgZone
  ) {
    this.dataSource = new MatTableDataSource();
    this.supervisionService.getSupervisionGroup();
  }

  ngOnInit() {
    this.subscribeToStudentSearch();
    this.getSupervisionGroupData();
  }

  displayFn(user?: Student): string | undefined {
    return user ? user.displayName : undefined;
  }

  getSupervisionGroupData(): void {
    this.supervisionService.supervisionGroup.subscribe(data => {
      (this.dataSource.data = data[0].students),
        (this.supervisor = data[0].supervisor),
        (this.dataSource.sort = this.sort),
        (this.isLoaded = true),
        this.changeDetectorRefs.detectChanges();
    });
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

    const addStudentDialog = this.dialog.open(AddStudentConfirmationComponent, {
      data: newStudent
    });
    addStudentDialog.afterClosed().subscribe(state => {
      if (state) {
        this.supervisionService.addStudent(newStudent).subscribe(
          res => {
            this.toastService.success(
              `Successfully added ${
                newStudent.displayName
              } under your supervision`,
              'Add Student',
              { onActivateTick: true }
            ),
              this.getSupervisionGroupData();
          },
          err => {
            this.toastService.error(err.message, 'Add Student');
          }
        );
      }
    });
  }

  removeStudent(student: Student): void {
        this.ngZone.run(_ => {
          const deleteDialogRef = this.dialog.open(
            DeleteConfirmationDialog,
            {
              data: student
            }
          );

          deleteDialogRef.afterClosed().subscribe(state => {
            console.log(state);
            if (state) {
              this.supervisionService
                .removeStudent(student.uniqueID)
                .subscribe(
                  (res: any) => {
                    this.toastService.success(
                      `Successfully deleted ${student.displayName}`,
                      'Delete Student'
                    ),
                      this.getSupervisionGroupData();
                  },
                  err => {
                    this.toastService.error(
                      err.message,
                      'Delete Student'
                    );
                  }
                );
            }
          });
        });
  }

  subscribeToStudentSearch() {
    this.studentsForm = this.fb.group({
      userInput: null,
      courseInput: null
    });
    this.studentsForm
      .get('userInput')
      .valueChanges.pipe(debounceTime(200))
      .subscribe(users => {
        this.graphService
          .getUsers(users)
          .subscribe(
            res => (
              (this.filteredStudents = res),
              this.changeDetectorRefs.detectChanges()
            )
          );
      });
  }
  ngOnDestroy(): void {
    // this.dataSubscription.unsubscribe();
  }
}

interface Option {
  name: string;
}
