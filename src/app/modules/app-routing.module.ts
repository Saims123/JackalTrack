import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentComponent } from '../student/student.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {path: './student' , component: StudentComponent},
  {path: './login', component: LoginComponent},
  { path: '', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
