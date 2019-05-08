import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { JackalNestAPI } from 'src/app/app-config';
import { GraphService } from '../graph/graph.service';
import { mergeMap, tap } from 'rxjs/operators';
import { CustomMailService } from '../graph/custom-mail.service';
@Injectable({
  providedIn: 'root'
})
export class SupervisionService {
  supervisionGroup: Observable<SupervisionGroup>;
  constructor(
    private http: HttpClient,
    private graphService: GraphService,
    private customMailService: CustomMailService
  ) {}

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
          'Final year Project-ALPHA : JackalTrack Invitation',
          `<h3>Hi ${_student.displayName},</h3>
          <br />
           ${welcomeMessage}`
        )
      )
    );
  }

  removeStudent(_studentID: any) {
    return this.http.delete(`${JackalNestAPI.SupervisionGroup}/${_studentID}`);
  }

  getSingleStudent(_studentID: string) {
    return this.http.get(`${JackalNestAPI.SupervisionGroup}/student/${_studentID}`);
  }

  getSupervisionGroupFromNest(_supervisorID: string): Observable<SupervisionGroup> {
    return this.http.get<SupervisionGroup>(`${JackalNestAPI.SupervisionGroup}/supervisor/${_supervisorID}`);
  }
}

export interface User {
  uniqueID: string;
  displayName: string;
  email?: string;
}

export interface Student extends User {
  course?: string;
  projectTitle?: string;
}

export interface SupervisionGroup {
  supervisor: Supervisor;
  students: Student[];
}

export interface Supervisor extends User {
  location?: string;
}

export const welcomeMessage = `
<p>You have been added to JackalTrack for supervision for your Final year project.</p>
<br />
Access link : https://i7467177.bucomputing.uk/
<br />
`;
