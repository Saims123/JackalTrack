import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import { Event } from './event';
import { AuthService } from '../auth/auth.service';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { User } from '../auth/user';
/**
 *  Microsoft Graph Service that uses MSAL for authentication and Graph API to call the email, people and calendar services.
 */
@Injectable({
  providedIn: 'root'
})
export class GraphService {
  private graphClient: Client;
  constructor(private authService: AuthService, private toastService: ToastrService) {
    this.graphClient = Client.init({
      authProvider: async done => {
        let token = await this.authService.getAccessToken().catch(reason => {
          done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
          this.toastService.error('Authentication Failure', 'Could not get an access token', {
            timeOut: 10000,
            progressBar: true
          });
        }
      }
    });
  }
  /**
   * Graph API to GET authenticated user's Calendar Events
   * @return Microsoft Event[]
   */
  async getEvents(): Promise<Event[]> {
    try {
      let result = await this.graphClient
        .api('/me/events')
        .select('subject,start,end')
        .get();
      return result.value;
    } catch (error) {
      console.warn('Could not get events', JSON.stringify(error, null, 2));
      this.toastService.error(JSON.stringify(error, null, 2), 'Events Retrival error', {
        timeOut: 20000,
        progressBar: true
      });
    }
  }
  /**
   * Graph API to GET authenticated user's basic profile
   * @return User
   */
  getMe(): Observable<User> {
    return Observable.fromPromise(
      this.graphClient
        .api('/me')
        .get()
        .then(user => {
          try {
            return user;
          } catch (err) {
            this.toastService.error(JSON.stringify(err, null, 2), 'Profile Retrival error', {
              timeOut: 20000,
              progressBar: true
            });
          }
        })
        .then(user => {
          return user;
        })
    );
  }
  /**
   * Graph API to GET authenticated user's Calendar Event based on the current week
   * @return Event
   */
  async getEventsOnCurrentWeek(): Promise<Event[]> {
    const startOfWeek = moment()
      .startOf('isoWeek')
      .format('YYYY-MM-DDThh:mm:ss');
    const endOfWeek = moment()
      .endOf('isoWeek')
      .format('YYYY-MM-DDThh:mm:ss');

    try {
      let result = await this.graphClient
        .api(`/me/calendarview?startdatetime=${startOfWeek}&enddatetime=${endOfWeek}`)
        .select(['subject', 'start', 'end'])
        .get();
      return result.value;
    } catch (error) {
      this.toastService.error(JSON.stringify(error, null, 2), 'Calendar Retrival error', {
        timeOut: 20000,
        progressBar: true
      });
    }
  }
  /**
   * Graph API to GET multiple users on Bournemouth University Domain
   * @param {string} name name of the user to search
   * @return User[]
   */
  getUsers(name: string): Observable<any[]> {
    if (name == '') {
      return of([]);
    }
    const userObservable = Observable.fromPromise(
      this.graphClient
        .api(`/users?$filter=startswith(displayName,'${name}')&$top=10`)
        .select(['id', 'displayName', 'mail'])
        .get()
        .then(res => {
          try {
            return res;
          } catch (error) {
            this.toastService.error(JSON.stringify(error, null, 2), 'Users Retrival error', {
              timeOut: 20000,
              progressBar: true
            });
          }
          return res;
        })
        .then(res => {
          return res.value;
        })
    );
    return userObservable;
  }
}
