import { Component, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { Timeslot } from 'src/app/services/timeslots/timeslot.service';
@Component({
  selector: 'timeslot-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styles: [
    `
      .grid-list {
        display: inline-block;
        padding: 10px;
      }
    `
  ]
})
export class TimeslotConfirmationDialog {
  timeslots: Timeslot[] = [];
  constructor(
    public cdr: ChangeDetectorRef,
    public dialogRef: MatDialogRef<TimeslotConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data.meetingPeriod.start = moment.utc(this.data.meetingPeriod.start);
    this.data.meetingPeriod.end = moment.utc(this.data.meetingPeriod.end);
    this.sortTimeslots();
  }

  sortTimeslots() {
    this.data.timeslots.sort((left, right) => {
      return moment.utc(left.start).diff(moment.utc(right.start));
    });

    this.data.timeslots.forEach(event => {
      this.timeslots.push({
        day: moment(event.startTime).format('ddd'),
        startTime: moment(event.startTime).toJSON(),
        endTime: moment(event.endTime).toJSON(),
        bookedBy: { uniqueID: null, displayName: null }
      });
    });
    this.data.timeslots = this.timeslots;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
