export interface CalendarListEntry extends Response {
  id: string,
  summary: string,
  description: string,
  timeZone: string,
  summaryOverride: string,
  backgroundColor: string,
  foregroundColor: string,
  accessRole: string, // TODO Consider in implementation the access role
}

export interface CalendarList extends Response {
  nextSyncToken: string,
  items: CalendarListEntry[]
}

export interface Response {
  kind: string,
  etag: string,
}


export class Scope {

  /**
   * See and change the sharing permissions of Google calendars you own
   */
  static acls = 'https://www.googleapis.com/auth/calendar.acls';

  /**
   * See, add, and remove Google calendars you’re subscribed to
   */
  static calendarList = 'https://www.googleapis.com/auth/calendar.calendarlist';

  /**
   * See the list of Google calendars you’re subscribed to
   */
  static calendarListReadOnly = 'https://www.googleapis.com/auth/calendar.calendarlist.readonly' ;

  /**
   * See the title, description, default time zone, and other properties of Google calendars you have access to
   */
  static calendarsReadOnly = 'https://www.googleapis.com/auth/calendar.calendars.readonly'

  static join(...scopes: string[]): string {
    return scopes.join(' ')
  }
}
