import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {
  SupervisionService,
  Student
} from '../../services/supervision.service';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { DeleteConfirmationDialog } from './dialogbox/delete-dialog-component';
import { ToastrService } from 'ngx-toastr';
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

  options: Option[] = [
    { name: 'Steve' },
    { name: 'Gail' },
    { name: 'Adam' },
    { name: 'Christine' }
  ];

  courses = [
    'Software Engineering',
    'Computing',
    'Business In Computing',
    'Forensics'
  ];
  filteredOptions: Observable<Option[]>;
  constructor(
    public studentService: SupervisionService,
    private dialog: MatDialog,
    private toastService: ToastrService
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.refreshStudentList();

    this.filteredOptions = this.newStudentControl.valueChanges.pipe(
      startWith<Option | string>(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice()))
    );
  }

  displayFn(user?: Option): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): Option[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => {
      return option.name.toLowerCase().indexOf(filterValue) === 0;
    });
  }

  removeStudent(student: Student): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialog, {
      data: student
    });
    dialogRef.afterClosed().subscribe((state) => {
      if (state) {
      this.studentService.removeStudent(student.id);
      this.refreshStudentList();
      this.toastService.success(`Successfully deleted ${student.displayName}`, 'Delete Student');
      this.studentService.getStudents().subscribe(s => {console.log(s)});
      }

    });

  }

  refreshStudentList(): void {
    this.dataSubscription = this.studentService
      .getStudents()
      .subscribe(students => (this.dataSource.data = [...students]));
    this.dataSource.sort = this.sort;
  }

  addStudent(name, course) {
    console.log(name, course);
    this.studentService.addStudent(name, course);
    this.refreshStudentList();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}

interface Option {
  name: string;
}
