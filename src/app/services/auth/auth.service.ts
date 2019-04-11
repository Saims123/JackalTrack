import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { User } from './user';
import {OAuthSettings} from './oauth';
import { Client } from '@microsoft/microsoft-graph-client';
import { Router } from '@angular/router';
import { SupervisorService } from '../supervision/supervisor.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
public isAuth: boolean;
public isTokenReady: boolean;
public user: User;
  constructor(private msalService: MsalService, private router: Router) {
    this.isAuth = false;
    this. isTokenReady = null;
    this.user = null;
    this.isAuth = this.msalService.getUser() != null;
    this.getUser().then((user) => {this.user = user; console.warn(this.user); });

  }

async signIn(): Promise<void> {
  this.isTokenReady = false;
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
  sessionStorage.clear();
  this.user = null;
  this.isAuth = false;
  this.router.navigate(['/login']);
  this.isTokenReady = null;
}

async getAccessToken(): Promise<string> {
  let result = await this.msalService.acquireTokenSilent(OAuthSettings.scopes)
    .catch((reason) => {
      console.warn('Get token silently failed', JSON.stringify(reason, null, 2));
      this.isTokenReady = false;
    });

  // Temporary to display token in an error box
  if (result) {console.log('Token acquired', result); this.isTokenReady = true;
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
  user.mail = graphUser.mail || graphUser.userPrincipalName;
  user.id = graphUser.id;
  user.jobTitle = graphUser.jobTitle;
  user.location = graphUser.location;
  return user;
}

}
