import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './modules/app-routing.module';
import { MaterialModule } from './modules/material-design.module';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from './auth/oauth';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { StudentComponent } from './components/student/student.component';
import { ErrorComponent } from './components/error/error.component';
import { FormsModule } from '@angular/forms';
import { TimeslotSupervisorComponent } from './components/meeting/timeslot-supervisor/timeslot-supervisor.component';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { HomeComponent } from './components/home/home.component';
import { TimeslotConfirmationDialog } from './components/meeting/timeslot-supervisor/dialogbox/confirmation-dialog-component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent,
    StudentComponent,
    TimeslotSupervisorComponent,
    HomeComponent,
    TimeslotConfirmationDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    MaterialModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
    MsalModule.forRoot({
      clientID: OAuthSettings.appId,
      authority:
        'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/'
    }),
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  entryComponents: [TimeslotConfirmationDialog,TimeslotSupervisorComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
