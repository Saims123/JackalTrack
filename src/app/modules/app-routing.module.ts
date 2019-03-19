import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../student/student.component';
import { LoginComponent } from '../login/login.component';
import { ErrorComponent } from '../error/error.component';

const routes: Routes = [
  {path: 'student' , component: StudentComponent},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  {path : '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
