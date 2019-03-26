import { Component, OnInit } from '@angular/core';
import { TimeslotService, Timeslot } from 'src/app/services/timeslots/timeslot.service';
import { SupervisionService } from 'src/app/services/supervision.service';

@Component({
  selector: 'app-timetable-supervisor',
  templateUrl: './timetable-supervisor.component.html',
  styleUrls: ['./timetable-supervisor.component.scss']
})
export class TimetableSupervisorComponent implements OnInit {
  timeslots: Timeslot[] = [];
  constructor(private timeslotService: TimeslotService, private supervision: SupervisionService) {
   }

  ngOnInit() {
    this.supervision.getStudents().subscribe((student) => {
      this.timeslotService.bookTimeslot(1, student[1]);
    });
    this.timeslots = this.timeslotService.getTimeslots();
    this.timeslotService.getStudentsNotBookedSlots();
  }

}
