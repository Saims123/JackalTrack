import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetableSupervisorComponent } from './timetable-supervisor.component';
import { MaterialModule } from 'src/app/modules/material-design.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from 'src/app/services/auth/oauth';

describe('TimetableSupervisorComponent', () => {
  let component: TimetableSupervisorComponent;
  let fixture: ComponentFixture<TimetableSupervisorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TimetableSupervisorComponent],
      imports: [
        MaterialModule,
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot(),
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetableSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
