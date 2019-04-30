import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeslotCreationComponent } from './timeslot-creation.component';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AppRoutingModule } from 'src/app/modules/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';


describe('TimeslotSupervisorComponent', () => {
  let component: TimeslotCreationComponent;
  let fixture: ComponentFixture<TimeslotCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimeslotCreationComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        CalendarModule.forRoot({
          provide: DateAdapter,
          useFactory: adapterFactory
        }),
        ToastrModule.forRoot()
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeslotCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
