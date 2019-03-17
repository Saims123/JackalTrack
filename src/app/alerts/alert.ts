export class Alert {
  level ?: AlertLevel;
  message: string;
  debug: string;
}

export enum AlertLevel {
INFO, WARN , CRITICAL, ERROR, SUCCESS
}
