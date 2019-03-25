import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../components/student/student.component';
import { LoginComponent } from '../components/login/login.component';
import { ErrorComponent } from '../components/error/error.component';
import { TimeslotSupervisorComponent } from '../components/meeting/timeslot-supervisor/timeslot-supervisor.component';
import { MsalGuard } from '@azure/msal-angular/dist/msal-guard.service';
import { TimetableSupervisorComponent } from '../components/meeting/timetable-supervisor/timetable-supervisor.component';

const routes: Routes = [
  { path: 'student', component: StudentComponent , canActivate: [MsalGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'timeslot', component: TimeslotSupervisorComponent , canActivate: [MsalGuard]},
  { path: 'timetable', component: TimetableSupervisorComponent, canActivate: [MsalGuard] },

  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {path : '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
