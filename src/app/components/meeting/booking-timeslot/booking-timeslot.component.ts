import { Component, OnInit } from '@angular/core';
import { TimeslotService } from 'src/app/services/timeslots/timeslot.service';

@Component({
  selector: 'app-booking-timeslot',
  templateUrl: './booking-timeslot.component.html',
  styleUrls: ['./booking-timeslot.component.scss']
})
export class BookingTimeslotComponent implements OnInit {

  constructor(public timeslotService: TimeslotService) { }

  ngOnInit() {
    this.timeslotService.getSupervisorTimeslotsFromNest();
  }

}
