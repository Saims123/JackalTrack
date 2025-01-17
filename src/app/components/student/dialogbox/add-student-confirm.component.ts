import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'add-confirmation-dialog',
  templateUrl: 'add-student-confirmation.html',
  styles: [
    `
      .mat-dialog-actions{
        float: right;
      }
    `
  ]
})
export class AddStudentConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<AddStudentConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
