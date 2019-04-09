import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material-design.module';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './services/auth/oauth';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentComponent } from './components/student/student.component';
import { ErrorComponent } from './components/error/error.component';
import { TimeslotSupervisorComponent } from './components/meeting/timeslot-supervisor/timeslot-supervisor.component';
import { HomeComponent } from './components/home/home.component';
import { TimeslotConfirmationDialog } from './components/meeting/timeslot-supervisor/dialogbox/confirmation-dialog-component';
import { TimetableSupervisorComponent } from './components/meeting/timetable-supervisor/timetable-supervisor.component';
import { NotesComponent } from './components/meeting/notes/notes.component';
import { AddNotesComponent } from './components/meeting/notes/add-notes/add-notes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewNotesComponent } from './components/meeting/notes/view-notes/view-notes.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { LayoutModule } from '@angular/cdk/layout';
import { AttendanceButtonComponent } from './components/progress/attendance-tracking/attendance-button/attendance-button.component';
import { AttendanceTrackingComponent } from './components/progress/attendance-tracking/attendance-tracking.component';
import { DeleteConfirmationDialog } from './components/student/dialogbox/delete-dialog-component';
import { AddStudentConfirmationComponent } from './components/student/dialogbox/add-student-confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ErrorComponent,
    StudentComponent,
    TimeslotSupervisorComponent,
    HomeComponent,
    TimeslotConfirmationDialog,
    DeleteConfirmationDialog,
    TimetableSupervisorComponent,
    NotesComponent,
    AddNotesComponent,
    DashboardComponent,
    ViewNotesComponent,
    AttendanceButtonComponent,
    AddStudentConfirmationComponent,
    AttendanceTrackingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId,
      authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
      postLogoutRedirectUri: window.location.origin
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ReactiveFormsModule,
    LayoutModule,
    NgScrollbarModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  entryComponents: [
    TimeslotConfirmationDialog,
    TimeslotSupervisorComponent,
    DeleteConfirmationDialog,
    AddStudentConfirmationComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
