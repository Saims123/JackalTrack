import { Injectable } from '@angular/core';
import { Alert, AlertLevel } from './alert';
@Injectable({
  providedIn: 'root'
})
export class MessageService {

  alerts: Alert[] = [];
  constructor() { }

  add(_message: string, _debug: string, _level ?: AlertLevel) {
    this.alerts.push({message: _message, debug: _debug, level : _level});
  }

  remove(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
