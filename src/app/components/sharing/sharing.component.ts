import { Component, OnInit } from '@angular/core';
import {CalendarService} from "../../services/calendar.service";
import {CalendarListEntry} from "../../domain/Calendar";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  calendars: CalendarListEntry[] = [];

  constructor(
    private clipboard: Clipboard,
    private snackBar: MatSnackBar,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.getCalendars();
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
}
