import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AttendanceState } from 'src/app/services/progress-tracking/attendance.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'attendance-button',
  templateUrl: './attendance-button.component.html',
  styleUrls: ['./attendance-button.component.scss']
})
export class AttendanceButtonComponent implements OnInit {
  @Output() public stateChange = new EventEmitter<any>();
  attendanceState: string;
  buttonColour = ['no', 'yes', 'cancel', 'default'];
  currentStateNo = 3;
  constructor() {
    this.attendanceState = AttendanceState[3];
  }

  ngOnInit() {}

  changeState() {
    this.currentStateNo = (this.currentStateNo + 1) % 4;
    this.attendanceState = AttendanceState[this.currentStateNo];
    this.stateChange.emit(this.currentStateNo);
  }
}
