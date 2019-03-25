import { Component, OnInit } from '@angular/core';
import { TimeslotService } from 'src/app/services/timeslot.service';

@Component({
  selector: 'app-timetable-supervisor',
  templateUrl: './timetable-supervisor.component.html',
  styleUrls: ['./timetable-supervisor.component.scss']
})
export class TimetableSupervisorComponent implements OnInit {
rowNumber: number = 0;
  constructor(private timeslotService: TimeslotService) { }

  ngOnInit() {
    this.rowNumber = this.timeslotService.getTimeslots().length;
    console.warn('I have : ',  this.rowNumber);
  }

}
