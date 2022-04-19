import {Component, OnInit} from '@angular/core';
import {OAuthService} from "angular-oauth2-oidc";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  isAuthenticated: Boolean = false;

  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.oauthService.events.subscribe((event) => {
      if (event.type == 'token_received') this.isAuthenticated = true;
      if (event.type == 'logout') this.isAuthenticated = false;
    })
    this.isAuthenticated = this.oauthService.getIdentityClaims() != null;
  }

  gotToSharing() {
    this.router.navigate(['/sharing']);
  }
}
