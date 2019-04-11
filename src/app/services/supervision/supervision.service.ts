import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { ToastrService } from 'ngx-toastr';
import { GraphService } from '../graph/graph.service';
import { SupervisorService } from './supervisor.service';
@Injectable({
  providedIn: 'root'
})
export class SupervisionService implements OnInit, OnDestroy {
  supervisionGroup: SupervisionGroup;
  subscription: any;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
  }

  addStudent(_supervisor,_student: Student) {
    return this.http.post(`${JackalNestAPI.SupervisionGroup}/student`, {
      supervisor: _supervisor,
      student: _student
    });
  }

  removeStudent(_id: any) {
    return this.http.delete(`${JackalNestAPI.SupervisionGroup}/${_id}`);
  }

  getStudents() {
    console.log(this.supervisionGroup);
    return of(this.supervisionGroup.students);
  }
  getSingleStudent(_id: string) {
    return this.supervisionGroup.students.find(
      student => student.uniqueID === _id
    );
  }

  getSupervisionGroupFromNest(_id: string): Observable<SupervisionGroup> {
    console.log(_id);
    return this.http.get<SupervisionGroup>(
      `${JackalNestAPI.SupervisionGroup}/supervisor/${_id}`
    );
  }

  getSupervisionGroup() {
    return this.supervisionGroup;
  }
  ngOnDestroy() {}
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
  displayName?: string;
  email?: string;
  uniqueID?: string;
  location?: string;
}
