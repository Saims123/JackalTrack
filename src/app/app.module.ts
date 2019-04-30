import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material-design.module';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './services/auth/oauth';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { StudentComponent } from './components/student/student.component';
import { ErrorComponent } from './components/error/error.component';
import { TimeslotCreationComponent } from './components/meeting/timeslot-creation/timeslot-creation.component';
import { TimeslotConfirmationDialog } from './components/meeting/timeslot-creation/dialogbox/confirmation-dialog-component';
import { TimetableSupervisorComponent } from './components/meeting/timetable-supervisor/timetable-supervisor.component';
import { NotesComponent } from './components/meeting/notes/notes.component';
import { AddNotesComponent } from './components/meeting/notes/add-notes/add-notes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewNotesComponent } from './components/meeting/notes/view-notes/view-notes.component';
import { DeleteConfirmationDialog } from './components/student/dialogbox/delete-dialog-component';
import { AddStudentConfirmationComponent } from './components/student/dialogbox/add-student-confirm.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ToastrModule } from 'ngx-toastr';
import { BookingTimeslotComponent } from './components/meeting/booking-timeslot/booking-timeslot.component';
import { EditNotesComponent } from './components/meeting/notes/edit-notes/edit-notes.component';
import { DeleteNoteConfirmationDialog } from './components/meeting/notes/dialogbox/delete-dialog-component';
import { NotesStudentComponent } from './components/meeting/notes/notes-student/notes-student.component';
import { MAT_DATE_LOCALE } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    ErrorComponent,
    StudentComponent,
    TimeslotCreationComponent,
    TimeslotConfirmationDialog,
    DeleteConfirmationDialog,
    TimetableSupervisorComponent,
    NotesComponent,
    AddNotesComponent,
    DashboardComponent,
    ViewNotesComponent,
    AddStudentConfirmationComponent,
    DeleteNoteConfirmationDialog,
    BookingTimeslotComponent,
    EditNotesComponent,
    NotesStudentComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    MaterialModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId,
      authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
      postLogoutRedirectUri: window.location.origin
    }),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    NgScrollbarModule,
    ToastrModule.forRoot(),
    HttpClientModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  entryComponents: [
    TimeslotConfirmationDialog,
    TimeslotCreationComponent,
    DeleteConfirmationDialog,
    AddStudentConfirmationComponent,
    DeleteNoteConfirmationDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
