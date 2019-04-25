import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { GraphService } from '../graph/graph.service';
import { mergeMap, tap } from 'rxjs/operators';
import { CustomMailService } from '../graph/custom-mail.service';
@Injectable({
  providedIn: 'root'
})
export class SupervisionService implements OnInit, OnDestroy {
  supervisionGroup: Observable<SupervisionGroup>;
  constructor(
    private http: HttpClient,
    private graphService: GraphService,
    private customMailService: CustomMailService
  ) {}

  ngOnInit() {}

  getSupervisionGroup() {
    this.supervisionGroup = this.graphService
      .getMe()
      .pipe(mergeMap(supervisor => this.getSupervisionGroupFromNest(supervisor.id)));
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
        this.customMailService.sentEmail(
          [_student.email],
          'Final year Project-BETA : JackalTrack Invitation',
          `<h3>Hi ${_student.displayName},</h3>
          <br />
           ${welcomeMessage}`
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
    return this.http.get<SupervisionGroup>(`${JackalNestAPI.SupervisionGroup}/supervisor/${_id}`);
  }

  ngOnDestroy() {}
}

export interface Student {
  displayName: string;
  email?: string;
  course?: string;
  projectTitle?: string;
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

export const welcomeMessage = `
<p>You have been added to JackalTrack for supervision for your Final year project.</p>
<br />
Access link : https://i7467177.bucomputing.uk/
<br />
<strong>
-THIS IS FOR TESTING PURPOSES ONLY-
</strong>
`;
