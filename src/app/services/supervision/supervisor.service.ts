import { Injectable } from '@angular/core';
import { Supervisor } from './supervision.service';
import { GraphService } from '../graph/graph.service';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
public supervisor: Supervisor;

  constructor(private graphService: GraphService) {
    this.graphService.getMe().subscribe(
      user =>
        {(this.supervisor = {
          uniqueID: user.id,
          displayName: user.displayName,
          email: user.mail,
          location: user.location
        }),
      console.log('Supervisor Triggered : ', this.supervisor)}
    );
  }

  getSupervisor() : Observable<Supervisor>{
    return of(this.supervisor);
  }

}
