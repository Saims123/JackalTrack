import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendanceTrackingComponent } from './progress/attendance-tracking/attendance-tracking.component';
import { AttendanceButtonComponent } from './progress/attendance-tracking/attendance-button/attendance-button.component';

@NgModule({
  declarations: [AttendanceTrackingComponent, AttendanceButtonComponent],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
