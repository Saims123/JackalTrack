import { TestBed } from '@angular/core/testing';

import { GraphService } from './graph.service';
import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../auth/oauth';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';

describe('GraphService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MsalModule.forRoot({
          clientID: OAuthSettings.appId,
          authority: 'https://login.microsoftonline.com/livebournemouthac.onmicrosoft.com/',
          postLogoutRedirectUri: window.location.origin
        }),
        ToastrModule.forRoot()
      ]
    })
  );

  it('should be created', () => {
    const service: GraphService = TestBed.get(GraphService);
    expect(service).toBeTruthy();
  });
});
