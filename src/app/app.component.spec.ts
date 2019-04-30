import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MaterialModule } from './modules/material-design.module';
import { MsalModule, MsalService } from '@azure/msal-angular';
import { OAuthSettings } from './services/auth/oauth';
import { ToastrModule, ToastrService, TOAST_CONFIG } from 'ngx-toastr';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        ToastrModule.forRoot()
      ],
      declarations: [AppComponent, HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [MsalService, ToastrService]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'JackalTrack'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('JackalTrack');
  });
});
