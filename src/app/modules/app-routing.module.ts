import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../student/student.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';
import { TimeslotSupervisorComponent } from '../meeting/timeslot-supervisor/timeslot-supervisor.component';
import { MsalGuard } from '@azure/msal-angular/dist/msal-guard.service';

const routes: Routes = [
  { path: 'student', component: StudentComponent , canActivate: [MsalGuard]},
  {path: 'login', component: LoginComponent},
  { path: 'timeslot', component: TimeslotSupervisorComponent , canActivate: [MsalGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {path : '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
