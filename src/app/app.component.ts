import { Component } from '@angular/core';
import { SupervisionGroup, SupervisionService } from './services/supervision/supervision.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'JackalTrack';
  constructor() {
  }
}
