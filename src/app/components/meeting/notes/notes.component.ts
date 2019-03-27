import { Component, OnInit } from '@angular/core';
import { SupervisionService } from 'src/app/services/supervision.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

  constructor(public supervision: SupervisionService) { }

  ngOnInit() {
  }

}
