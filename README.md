# Calendar Importer
A simple calendar importer web project that makes the import of calendars for Google Calendar on mobile devices easier.

## About this project
This project was developed in less than a week to provide a simple calendar import solution for mobile users that use
Google Calendar.

## How to Use
This project can be ued by everyone and in any way they like. It contains currently two functionalities:

- Generating shareable links for Google Calendars that are already public
- Consuming the calendar URL by subscribing with Google Calendar authorization, copying the link or downloading the iCal file

The sharing function can be used to generate a shareable link for a Google calendar. This link contains the calendar ID that is
used to access the calendar in various ways by subscribers.

The subscribing function allows users that got a shared link to either import it to their Google Calendar (by granting access),
download the iCal file, open the link in the browser or simply copy it to the clipboard (for manually importing it somewhere else).

The service is hosted with firebase hosting under the website https://ical.malliaridis.com/.

## Limitations
The project currently lacks on quality and functionality and therefore should be used with care. Pet it a couple of times,
sweet-talk it for an hour, and it will probably work as you want. If that doesn't help, file an issue here, so I can
look into your problem.

The project supports only Google Calendar IDs but could be extended to any iCal URLs.

People cannot subscribe to calendars that are not configured as public calendars. Therefore, make sure that the calendar
is already public. If you want to make a calendar public via this website project, file an issue.

Additionally, only the Google calendar ID is necessary and could be provided manually with an input field, so access to all
calendars wouldn't be necessary (file an issue if you want this function).

This project will not be continued if there is no interest from the public.

## Contribute
If you want to contribute to this project simply create a new issue, ask a question, start a discussion, or create a pull request.
Feel free to talk and communicate, it's free and requested.

## For Developers 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
