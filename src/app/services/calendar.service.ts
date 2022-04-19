import { Injectable } from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {CalendarList, CalendarListEntry} from "../domain/Calendar";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private calendarUrl = 'https://www.googleapis.com/calendar/v3/'

  constructor(
    private http: HttpClient,
    private oauthService: OAuthService
  ) { }

  getAll(): Observable<CalendarList> {
    return this.http.get<CalendarList>(this.calendarUrl + 'users/me/calendarList')
  }

  importCalendar(calendarId: string): Observable<Boolean> {
    return this.http.post<CalendarListEntry>(this.calendarUrl + 'users/me/calendarList', {
      id: calendarId
    }).pipe(
      map((response) => { return !!response })
    );
  }
}
