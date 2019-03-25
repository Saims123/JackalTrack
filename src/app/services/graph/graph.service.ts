import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import {Event} from './event';
import {AuthService} from '../auth/auth.service';
import * as moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class GraphService {
private graphClient: Client;
  constructor(
    private authService: AuthService) {
    this.graphClient = Client.init({
        authProvider: async (done) => {
          let token = await this.authService.getAccessToken().catch((reason) => {
            done(reason, null);
          });

          if (token) {
            done(null, token);
          } else {
            done('Could not get an access token', null);
          }
        }
    });
  }

  async getEvents(): Promise<Event[]> {
    try {
      let result = await this.graphClient
      .api('/me/events')
      .select('subject,start,end')
      .get();
      return result.value;
    } catch (error) {
      console.warn('Could not get events', JSON.stringify(error, null, 2));
    }
  }
  async getMe(): Promise<any> {
    try {
      let result = await this.graphClient
        .api('/me')
        .get();
      return result.value;
    } catch (error) {
      console.warn('Could not get events', JSON.stringify(error, null, 2));
    }
  }


  async getEventsOnCurrentWeek(): Promise<Event[]> {
    const startOfWeek = moment().startOf('isoWeek').format('YYYY-MM-DDThh:mm:ss');
    const endOfWeek = moment().endOf('isoWeek').format('YYYY-MM-DDThh:mm:ss');

    try {
      let result = await this.graphClient
      .api(`/me/calendarview?startdatetime=${startOfWeek}&enddatetime=${endOfWeek}`)
      .select(['subject', 'start', 'end',])
      .get();
      return result.value;
    } catch (error) {
      console.warn('Could not get events', JSON.stringify(error, null, 2));
    }
  }



}
