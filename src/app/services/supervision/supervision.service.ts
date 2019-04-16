import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { GraphService } from '../graph/graph.service';
import { mergeMap, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SupervisionService implements OnInit, OnDestroy {
  supervisionGroup: Observable<SupervisionGroup>;
  constructor(private http: HttpClient, private graphService: GraphService) {}

  ngOnInit() {}

  getSupervisionGroup() {
    this.supervisionGroup = this.graphService
      .getMe()
      .pipe(
        mergeMap(supervisor => this.getSupervisionGroupFromNest(supervisor.id))
      );
  }

  addStudent(_student: Student) {
    return this.supervisionGroup.pipe(
      mergeMap(group =>
        this.http.post(`${JackalNestAPI.SupervisionGroup}/student`, {
          supervisor: group[0].supervisor as Supervisor,
          student: _student
        })
      ),
      tap(_ =>
        this.graphService.sentEmail(
          [_student.email],
          'Final year Project-TEST : JackalTrack Invitation',
          `Hi ${_student.displayName}, \n ${welcomeMessage}`
        )
      )
    );
  }

  removeStudent(_id: any) {
    return this.http.delete(`${JackalNestAPI.SupervisionGroup}/${_id}`);
  }

  getSingleStudent(_id: string) {
    return this.http.get(`${JackalNestAPI.SupervisionGroup}/student/${_id}`);
  }

  getSupervisionGroupFromNest(_id: string): Observable<SupervisionGroup> {
    console.log(_id);
    return this.http.get<SupervisionGroup>(
      `${JackalNestAPI.SupervisionGroup}/supervisor/${_id}`
    );
  }

  ngOnDestroy() {}
}

export interface Student {
  displayName: string;
  email?: string;
  course?: string;
  id?: any;
  uniqueID: string;
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

export const welcomeMessage = `You have been added to JackalTrack for supervision for your Final year project.
Access link : https://i7467177.bucomputing.uk/

-THIS IS FOR TESTING PURPOSES ONLY-

`;
