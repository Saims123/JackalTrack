import { Injectable } from '@angular/core';
import {
  Supervisor,
  SupervisionGroup,
  SupervisionService
} from './supervision.service';
import { GraphService } from '../graph/graph.service';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupervisorService {
  public supervisor: Observable<SupervisionGroup>;

  constructor(
    private graphService: GraphService,
    private supervisionService: SupervisionService
  ) {}

  experiment() {
    console.log(
      'Experiment : ',
     this.supervisor = this.graphService
        .getMe()
        .pipe(
          mergeMap(supervisor =>
            this.supervisionService.getSupervisionGroupFromNest(supervisor.id)
          )
        )
    );
  }
}
