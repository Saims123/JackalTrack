import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from './user';
import {OAuthSettings} from './oauth';
// import { AlertsService } from '../alerts.service';
import { Client } from '@microsoft/microsoft-graph-client';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
public isAuth: boolean;
public user: User;
  constructor(private msalService: MsalService) {
    this.isAuth = false;
    this.user = null;

    this.isAuth = this.msalService.getUser() != null;
    this.getUser().then((user) => {this.user = user; });
  }

async signIn(): Promise<void> {
  let result = await this.msalService.loginPopup(OAuthSettings.scopes).catch((reason) => {
    console.warn('Login failed', JSON.stringify(reason, null, 2));
  });
  if (result) {
    this.isAuth = true;
    this.user = await this.getUser();
  }
}

signOut(): void {
  this.msalService.logout();
  this.user = null;
  this.isAuth = false;
}

async getAccessToken(): Promise<string> {
  let result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
    .catch((reason) => {
      console.warn('Get token failed', JSON.stringify(reason, null, 2));
    });

  // Temporary to display token in an error box
  if (result) {console.log('Token acquired', result);
}
  return result;
}

private async getUser(): Promise<User> {
  if (!this.isAuth) {return null; }

  let graphClient = Client.init({
    authProvider: async (done) => {
        let token = await this.getAccessToken(). catch((reason) => {
            done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done('Could not get access token', null);
        }
    }
  });

  const graphUser = await graphClient.api('/me').get();
  let user = new User();
  user.displayName = graphUser.displayName;
  user.email = graphUser.mail || graphUser.userPrincipalName;

  return user;
}

}
