import { TestBed } from '@angular/core/testing';

import { TimeslotService } from './timeslot.service';
import { SupervisionService } from '../supervision/supervision.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../auth/oauth';
import { ToastrModule } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';

describe('TimeslotService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        ToastrModule.forRoot()
      ],
      providers: [HttpClient, SupervisionService]
    })
  );

  it('should be created', () => {
    const service: TimeslotService = TestBed.get(TimeslotService);
    expect(service).toBeTruthy();
  });
});
