import { Injectable } from '@angular/core';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthService } from '../auth/auth.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { MeetingPeriod, Timeslot } from '../timeslots/timeslot.service';
enum MicrosoftDay { // Needed as Graph API only accept whole word
  Mon = 'Monday',
  Tue = 'Tuesday',
  Wed = 'Wednesday',
  Thu = 'Thursday',
  Fri = 'Friday',
  Sat = 'Saturday',
  Sun = 'Sunday'
}
@Injectable({
  providedIn: 'root'
})
export class CustomMailService {
  private graphClient: Client;
  constructor(private authService: AuthService, private toastService: ToastrService) {
    this.graphClient = Client.init({
      authProvider: async done => {
        const token = await this.authService.getAccessToken().catch(reason => {
          done(reason, null);
        });

        if (token) {
          done(null, token);
        } else {
          done('Could not get an access token', null);
          this.toastService.error('Authentication Failure', 'Could not get an access token', {
            timeOut: 20000,
            progressBar: true
          });
        }
      }
    });
  }

  sentEmail(emailAddresses: string[], _subject: string, _content: string) {
    const mail = {
      subject: _subject,
      toRecipients: this.constructEmailAddresses(emailAddresses),
      body: {
        content: _content,
        contentType: 'html'
      }
    };

    try {
      this.graphClient.api('me/sendMail').post({ message: mail });
    } catch (error) {
      this.toastService.error(JSON.stringify(error, null, 2), 'Unable to send email to students', {
        timeOut: 20000,
        progressBar: true,
        onActivateTick: true
      });
    }
  }
  sentEmailWithCC(_emailAddress: string, _subject: string, _content: string, ccEmailAddress: string) {
    const mail = {
      subject: _subject,
      toRecipients: [
        {
          emailAddress: {
            address: _emailAddress
          }
        }
      ],
      ccRecipients: [
        {
          emailAddress: {
            address: ccEmailAddress
          }
        }
      ],

      body: {
        content: _content,
        contentType: 'html'
      }
    };
    try {
      this.graphClient.api('me/sendMail').post({ message: mail });
    } catch (error) {
      this.toastService.error(JSON.stringify(error, null, 2), 'Unable to send email to students', {
        timeOut: 20000,
        progressBar: true,
        onActivateTick: true
      });
    }
  }
  sendTimeslotEventToStudent(
    studentEmail: string,
    _subject: string,
    _content: string,
    _period: MeetingPeriod,
    _timeslot: Timeslot
  ) {
    const event = {
      subject: _subject,
      body: {
        contentType: 'HTML',
        content: _content
      },
      start: {
        dateTime: moment(_timeslot.startTime).format('YYYY-MM-DDTHH:mm:ss'),
        timeZone: 'UTC'
      },
      end: {
        dateTime: moment(_timeslot.endTime).format('YYYY-MM-DDTHH:mm:ss'),
        timeZone: 'UTC'
      },
      recurrence: {
        pattern: {
          type: 'weekly',
          interval: 1,
          daysOfWeek: [MicrosoftDay[_timeslot.day]]
        },
        range: {
          type: 'endDate',
          startDate: moment(_period.start).format('YYYY-MM-DD'),
          endDate: moment(_period.end).format('YYYY-MM-DD')
        }
      },
      location: {
        displayName: _period.location
      },
      attendees: [
        {
          emailAddress: {
            address: studentEmail
          },
          type: 'required'
        }
      ]
    };

    try {
      this.graphClient
        .api('me/events')
        .post(event)
        .then(() => {
          this.toastService.success(
            `Successfully send ICS to ${studentEmail}`,
            'Timeslot ICS for Student',
            { timeOut: 10000, progressBar: true, onActivateTick: true }
          );
        })
        .catch(error => {
          this.toastService.error(
            ` Unable to send ICS to ${studentEmail}
            ${error.message}`,
            'Timeslot ICS for Student',
            { timeOut: 20000, progressBar: true, onActivateTick: true }
          );
        });
    } catch (error) {
      this.toastService.error(
        JSON.stringify(error, null, 2),
        'Unable to send timeslots to students',
        { timeOut: 20000, progressBar: true, onActivateTick: true }
      );
    }
  }

  constructEmailAddresses(_emails: string[]) {
    const addresses: any[] = [];
    _emails.forEach(email => {
      addresses.push({
        emailAddress: {
          address: email
        }
      });
    });
    return addresses;
  }
}
