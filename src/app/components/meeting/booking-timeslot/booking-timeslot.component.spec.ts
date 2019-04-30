import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingTimeslotComponent } from './booking-timeslot.component';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';

describe('BookingTimeslotComponent', () => {
  let component: BookingTimeslotComponent;
  let fixture: ComponentFixture<BookingTimeslotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingTimeslotComponent],
      imports: [
        ToastrModule.forRoot(),
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingTimeslotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
