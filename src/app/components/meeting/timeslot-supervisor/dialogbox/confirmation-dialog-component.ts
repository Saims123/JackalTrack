import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
@Component({
  selector: 'timeslot-confirmation-dialog',
  templateUrl: 'confirmation-dialog.html',
  styles: [`
  .grid-list{
    display: inline-block;
    padding: 10px;
  }
  `]
})
export class TimeslotConfirmationDialog {
  timeslots: Timeslot[] = [];
  constructor(
    public dialogRef: MatDialogRef<TimeslotConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any[]
  ) {
    this.sortData();
  }

  sortData() {
    this.data.sort((left, right) => {
      return moment.utc(left.start).diff(moment.utc(right.start));
    });

    this.data.forEach(event => {
      this.timeslots.push({
        day: moment(event.start).format('ddd'),
        startTime: moment(event.start).format('hh:mm a'),
        endTime: moment(event.end).format('hh:mm a')
      });
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}

interface Timeslot {
  day: string;
  startTime: string;
  endTime: string;
}
