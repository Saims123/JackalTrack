import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
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
    public dialogRef: MatDialogRef<TimeslotConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Data
  ) {
    this.data.start = moment.utc(this.data.start).format('ddd DD MMMM YYYY');
    this.data.end = moment.utc(this.data.end).format('ddd DD MMMM YYYY');
    this.sortData();
  }

  sortData() {
    this.data.timeslots.sort((left, right) => {
      return moment.utc(left.start).diff(moment.utc(right.start));
    });

    this.data.timeslots.forEach(event => {
      this.timeslots.push({
        day: moment(event.start).format('ddd'),
        startTime: moment(event.start).format('HH:mm'),
        endTime: moment(event.end).format('HH:mm'),
        bookedBy: {uniqueID: null, displayName: null}
      });
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

interface Data {
  start: string;
  end: string;
  location: string;
  timeslots: any[];
}

interface Timeslot {
  day: string;
  startTime: string;
  endTime: string;
  bookedBy?: { uniqueID: string; displayName: string };
}
