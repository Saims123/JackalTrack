import { Component, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete-dialog.html',
  styles: []
})
export class DeleteConfirmationDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialog>,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.ngZone.runOutsideAngular(() => {
      this.cdr.detectChanges();
      this.dialogRef.close();
    });
  }
}
