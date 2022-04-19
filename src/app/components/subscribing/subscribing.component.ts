import { Component, OnInit } from '@angular/core';
import {Scope} from "../../domain/Calendar";
import {ActivatedRoute} from "@angular/router";
import {OAuthService} from "angular-oauth2-oidc";
import {CalendarService} from "../../services/calendar.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Clipboard} from "@angular/cdk/clipboard";
import {authCodeFlowConfig} from "../../utils/auth-config";

@Component({
  selector: 'app-subscribing',
  templateUrl: './subscribing.component.html',
  styleUrls: ['./subscribing.component.scss']
})
export class SubscribingComponent implements OnInit {

  calendarId: string | null = null

  constructor(
    private route: ActivatedRoute,
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private oauthService: OAuthService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.calendarId = params['to'];
      if (params['google'] == 'true') { this.importToGoogleCalendar() }
    });
  }

  importToGoogleCalendar(): void {
    if (!this.calendarId) {
      this.openSnackBar('Calendar id not available.', 'Close');
      return;
    }

    const scopes = this.oauthService.getGrantedScopes() as (string[] | undefined);
    if (scopes?.includes(Scope.calendarList)) {
      // Permissions available
      this.calendarService.importCalendar(this.calendarId).subscribe((success) => {
        if (success) this.openSnackBar('Calendar successfully imported.', 'Close');
        else this.openSnackBar('An error occurred.', 'Retry');
      });
    } else {
      // Permissions required
      this.oauthService.configure(authCodeFlowConfig(Scope.calendarList));
      this.oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {
        this.oauthService.initImplicitFlow('id=' + this.calendarId);
      });
    }
  }

  downloadCalendar(): void {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', this.getICalLink());
      link.setAttribute('download', `basic.ics`);
      document.body.appendChild(link);
      link.click();
      link.remove();
  }

  openCalendar(): void {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.getICalLink());
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  copyICalLink(): void {
    this.clipboard.copy(this.getICalLink());
    this.snackBar.open('iCal URL copied!', 'Close');
  }

  getICalLink(): string {
    return 'https://calendar.google.com/calendar/ical/' + this.calendarId + '/public/basic.ics';
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action).onAction();
  }
}
