import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";
import {OAuthService} from "angular-oauth2-oidc";
import {authCodeFlowConfig} from "./utils/auth-config";
import {Scope} from "./domain/Calendar";
import {ActivatedRoute, ActivatedRouteSnapshot, NavigationEnd, Router, RouterLinkActive} from "@angular/router";
import {SharingComponent, SubscribingComponent} from "./components";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'Calendar Importer';

  isSubscribing: Boolean = false;

  isAuthenticated: Boolean = false;

  isSharing: Boolean = false;

  isAbout: Boolean = false;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
    private oauthService: OAuthService,
    private router: Router
  ) {
    this.registerCustomIcons();
    this.setupOAuth();
  }

  ngOnInit(): void {
    this.oauthService.events.subscribe((event) => {
      if (event.type == 'token_received') this.isAuthenticated = true;
      if (event.type == 'logout') {
        this.isAuthenticated = false;
        this.router.navigate(['']);
      }
    });
    this.initAuthenticatedState();

    this.router.events.subscribe((event) => {
        if(event instanceof NavigationEnd) {
          this.isAbout = event.url == '/';
        }
    })
  }

  private registerCustomIcons() {
    this.matIconRegistry.addSvgIcon(
      `google_calendar`,
      this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/google_calendar.svg')
    );
  }

  private setupOAuth() {
    this.oauthService.configure(authCodeFlowConfig(Scope.calendarListReadOnly));

    this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: (info) => this.handleState(info.state)
    });
  }

  initAuthenticatedState(): void {
    this.isAuthenticated = this.oauthService.getIdentityClaims() != null;
  }

  handleState(state: string | undefined) {
    if (!state) return;

    const values = state.split('=');
    this.isSubscribing = values[0] == 'id';
    this.isSharing = values[0] == 'isSharing';

    if (this.isSubscribing) {
      this.router.navigate(['/subscribing'], {
        queryParams: {
          to: values[1],
          google: true
        }
      });
    } else if (this.isSharing) this.router.navigate(['/sharing']);
  }
}
