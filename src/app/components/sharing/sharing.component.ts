import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {CalendarListEntry} from "../../domain/Calendar";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Clipboard } from '@angular/cdk/clipboard';
import {OAuthService} from "angular-oauth2-oidc";

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  calendars: CalendarListEntry[] = [];

  isAuthenticated: Boolean = false;

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private oauthService: OAuthService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.oauthService.events.subscribe((event) => {
      if (event.type == 'token_received'
        || event.type == 'token_refreshed'
        || event.type == 'silently_refreshed'
        || event.type == 'session_changed')  {
        this.isAuthenticated = true;
        this.getCalendars();
      } else if (event.type == 'logout') this.isAuthenticated = false;
    });
    this.initAuthenticatedState();
  }

  onGrantAccess(): void {
    this.oauthService.initImplicitFlow('isSharing');
  }

  onLogout(): void {
    this.oauthService.logOut();
  }

  getCalendars(): void {
    this.calendarService.getAll().subscribe((list) => {
      this.calendars = list.items;
      // TODO Check if calendar is shared before listing here.
    });
  }

  copyShareableLink(calendar: CalendarListEntry): void {
    this.clipboard.copy(window.location.origin + '/subscribing?to=' + calendar.id);
    this.snackBar.open('Shareable calendar URL copied!', 'Close');
  }

  initAuthenticatedState(): void {
    // TODO Improve claim check by explicitly checking if the correct claims are available
    this.isAuthenticated = this.oauthService.getIdentityClaims() != null;

    // Load calendars if the user is authenticated
    if (this.isAuthenticated) this.getCalendars();
  }
}
