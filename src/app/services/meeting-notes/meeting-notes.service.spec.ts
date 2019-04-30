import { TestBed } from '@angular/core/testing';

import { MeetingNotesService } from './meeting-notes.service';
import { HttpClientModule } from '@angular/common/http';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../auth/oauth';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('MeetingNotesService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        ToastrModule.forRoot()
      ],
    })
  );

  it('should be created', () => {
    const service: MeetingNotesService = TestBed.get(MeetingNotesService);
    expect(service).toBeTruthy();
  });
});
