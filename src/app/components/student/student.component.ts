import { Component, OnInit, ViewChild, OnDestroy, ChangeDetectorRef, NgZone } from '@angular/core';
import { SupervisionService, Student, Supervisor } from '../../services/supervision/supervision.service';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { GraphService } from 'src/app/services/graph/graph.service';
import { AddStudentConfirmationComponent } from './dialogbox/add-student-confirm.component';
import { DeleteConfirmationDialog } from '../dialogbox/delete-dialog-component';
// Table Documentation https://material.angular.io/components/table/examples
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('form') form;

  displayedColumns: string[] = ['displayName', 'email', 'projectTitle', 'course', 'Actions'];
  dataSource: MatTableDataSource<Student>;
  studentSubscription: Subscription;
  supervisor: Supervisor;
  newStudentControl = new FormControl();
  isLoaded = false;
  studentsForm: FormGroup;
  options: Student[] = [];

  courses = ['Software Engineering', 'Computing', 'Business In Computing', 'Forensics'];
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
    this.initiateStudentForm();
    this.subscribeToStudentSearch();
    this.getSupervisionGroupData();
  }
  initiateStudentForm() {
    this.studentsForm = this.fb.group({
      userInput: null,
      courseInput: null,
      projectTitleInput: null
    });
  }

  displayFn(user?: Student): string | undefined {
    return user ? user.displayName : undefined;
  }

  getSupervisionGroupData(): void {
    this.studentSubscription = this.supervisionService.supervisionGroup.subscribe(data => {
      (this.dataSource.data = data[0].students),
        (this.supervisor = data[0].supervisor),
        (this.dataSource.sort = this.sort),
        (this.isLoaded = true),
        this.changeDetectorRefs.detectChanges();
    });
  }

  addStudent(form) {
    let newStudent = this.getSelectedStudent();
    this.ngZone.run(_ => {
      const addStudentDialog = this.dialog.open(AddStudentConfirmationComponent, {
        data: newStudent
      });
      addStudentDialog.afterClosed().subscribe(state => {
        if (state) {
          this.supervisionService.addStudent(newStudent).subscribe(
            res => {
              this.toastService.success(
                `Successfully added ${newStudent.displayName} under your supervision`,
                'Add Student',
                { onActivateTick: true }
              ),
                this.getSupervisionGroupData();
              this.resetStudentForm();
              // Currently Angular FormControl does not support clean reset of the form, relying on HTML 5 form reset here,
              // Can be updated once it's implemented on the framework
              form.resetForm();
            },
            err => {
              this.toastService.error(err.message, 'Add Student', {
                onActivateTick: true
              });
            }
          );
        }
      });
    });
  }

  removeStudent(student: Student): void {
    this.ngZone.run(_ => {
      const deleteDialogRef = this.dialog.open(DeleteConfirmationDialog, {
        data: {
          title: 'Student',
          target: student.displayName
        }
      });

      deleteDialogRef.afterClosed().subscribe(state => {
        if (state) {
          this.supervisionService.removeStudent(student.uniqueID).subscribe(
            (res: any) => {
              this.toastService.success(`Successfully deleted ${student.displayName}`, 'Delete Student'),
                this.getSupervisionGroupData();
            },
            err => {
              this.toastService.error(err.message, 'Delete Student');
            }
          );
        }
      });
    });
  }

  subscribeToStudentSearch() {
    this.studentsForm
      .get('userInput')
      .valueChanges.pipe(
        tap(_ => {
          this.isLoading = true;
        }),
        debounceTime(200),
        distinctUntilChanged()
      )
      .subscribe(users => {
        this.graphService
          .getUsers(users)
          .subscribe(
            res => (
              (this.filteredStudents = res), (this.isLoading = false), this.changeDetectorRefs.detectChanges()
            )
          );
      });
  }
  getSelectedStudent() {
    const _selectedStudent = this.studentsForm.get('userInput').value;
    const _courseName = this.studentsForm.get('courseInput').value;
    const _projectTitle = this.studentsForm.get('projectTitleInput').value;

    const newStudent: Student = {
      uniqueID: _selectedStudent.id,
      course: _courseName,
      projectTitle: _projectTitle,
      displayName: _selectedStudent.displayName,
      email: _selectedStudent.mail
    };
    return newStudent;
  }

  resetStudentForm() {
    this.studentsForm.reset();
  }
  ngOnDestroy(): void {
    this.studentSubscription.unsubscribe();
  }
}
