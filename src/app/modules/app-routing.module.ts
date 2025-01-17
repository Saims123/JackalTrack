import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../components/student/student.component';
import { LoginComponent } from '../components/login/login.component';
import { ErrorComponent } from '../components/error/error.component';
import { TimeslotCreationComponent } from '../components/meeting/timeslot-creation/timeslot-creation.component';
import { MsalGuard } from '@azure/msal-angular/dist/msal-guard.service';
import { TimetableSupervisorComponent } from '../components/meeting/timetable-supervisor/timetable-supervisor.component';
import { AddNotesComponent } from '../components/meeting/notes/add-notes/add-notes.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotesComponent } from '../components/meeting/notes/notes.component';
import { BookingTimeslotComponent } from '../components/meeting/booking-timeslot/booking-timeslot.component';
import { EditNotesComponent } from '../components/meeting/notes/edit-notes/edit-notes.component';
import { NotesStudentComponent } from '../components/meeting/notes/notes-student/notes-student.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent, canActivate: [MsalGuard] },
  { path: 'login', component: LoginComponent },
  {
    path: 'meeting/timeslot',
    component: TimeslotCreationComponent,
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
  {
    path: 'meeting/student/notes',
    component: NotesStudentComponent,
    canActivate: [MsalGuard]
  },
  { path: 'meeting/notes/new/student/:id', component: AddNotesComponent, canActivate: [MsalGuard] },
  {
    path: 'meeting/notes/edit/student/:id/created/:createdDate',
    component: EditNotesComponent,
    canActivate: [MsalGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
