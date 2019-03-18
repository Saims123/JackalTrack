import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService, Student } from './student.service';
import { MatSort, MatTableDataSource } from '@angular/material';
// Table Documentation https://material.angular.io/components/table/examples
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  displayedColumns: string[] = ['Name', 'Email', 'Course'];
  dataSource: MatTableDataSource<Student>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public studentService: StudentService) {
    this.studentService.getStudents()
      .subscribe(students => this.dataSource = new MatTableDataSource(students));

  }

  ngOnInit() {
    this.dataSource.sort = this.sort;


  }
}
