import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../components/student/student.component';
import { LoginComponent } from '../components/login/login.component';
import { ErrorComponent } from '../components/error/error.component';
import { TimeslotSupervisorComponent } from '../components/meeting/timeslot-supervisor/timeslot-supervisor.component';
import { MsalGuard } from '@azure/msal-angular/dist/msal-guard.service';
import { TimetableSupervisorComponent } from '../components/meeting/timetable-supervisor/timetable-supervisor.component';
import { AddNotesComponent } from '../components/meeting/notes/add-notes/add-notes.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotesComponent } from '../components/meeting/notes/notes.component';
import { AttendanceTrackingComponent } from '../components/progress/attendance-tracking/attendance-tracking.component';
import { BookingTimeslotComponent } from '../components/meeting/booking-timeslot/booking-timeslot.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent, canActivate: [MsalGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'timeslot',
    component: TimeslotSupervisorComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'meeting/timetable',
    component: TimetableSupervisorComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'meeting/notes',
    component: NotesComponent,
    canActivate: [MsalGuard]
  },
  { path: 'meeting/notes/new/student/:id', component: AddNotesComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'progress/attendance',
    component: AttendanceTrackingComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'meeting/timeslots/booking',
    component: BookingTimeslotComponent,
    canActivate: [MsalGuard]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' },

  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
