import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { ToastrService } from 'ngx-toastr';
import { GraphService } from '../graph/graph.service';
@Injectable({
  providedIn: 'root'
})
export class SupervisionService implements OnInit, OnDestroy {
  supervisionGroup: SupervisionGroup;
  _supervisor: Supervisor;
  subscription: any;

  constructor(
    private graphService: GraphService,
    private http: HttpClient,
    private toastService: ToastrService
  ) {
    this.graphService.getMe()
    .then(user => {
      this._supervisor = {
        uniqueID: user.id,
        email: user.mail,
        displayName: user.displayName,
        location: user.location
      };
    }).then(() => this.getSupervisionGroupFromNest());

  }

  ngOnInit() {
  }

  addStudent(_student: Student): void {
    this.http
      .post(`${JackalNestAPI.SupervisionGroup}/student`, {
        supervisor: this._supervisor,
        student: _student
      })
      .subscribe(
        res => {
          console.log(res);
          this.toastService.success(
            `Successfully added ${_student.displayName} under your supervision`,
            'Add Student'
          );
        },
        err => {
          this.toastService.error(err, 'Add Student');
        }
      );

    this.getSupervisionGroupFromNest();
  }

  removeStudent(_id: any): void {
    this.http.delete(`${JackalNestAPI.SupervisionGroup}/${_id}`).subscribe(
      res => {
        console.log(res);
        this.toastService.success(
          'Successfully deleted student',
          'Delete Student'
        );
      },
      err => {
        this.toastService.error(err, 'Delete Student');
      }
    );
    this.getSupervisionGroupFromNest();
  }

  getStudents() {
    return of(this.supervisionGroup.students);
  }
  getSingleStudent(_id: string) {
    return this.supervisionGroup.students.find((student) => student.uniqueID === _id);
  }

  getSupervisionGroupFromNest() {
    console.log(this._supervisor);
    this.subscription = this.http
      .get(`${JackalNestAPI.SupervisionGroup}/${this._supervisor.uniqueID}`)
      .subscribe((group) => {
        console.warn(group);
        this.supervisionGroup = group as SupervisionGroup;
        if (!group) {
          // Create new profile if not in database
          this.http.post(
            `${JackalNestAPI.SupervisionGroup}/supervisor`,
            this._supervisor
          );
        }
      });
  }

  getSupervisionGroup() {
    return this.supervisionGroup;
  }
  ngOnDestroy() {
  }
}

export interface Student {
  displayName: string;
  email: string;
  course: string;
  id?: any;
  uniqueID?: string;
}

export interface SupervisionGroup {
  supervisor: Supervisor;
  students: Student[];
}

export interface Supervisor {
  displayName: string;
  email: string;
  uniqueID?: string;
  location: string;
}
