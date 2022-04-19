import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {OAuthService} from "angular-oauth2-oidc";
import {SharingComponent} from "../components";
import {Scope} from "../domain/Calendar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private oauthService: OAuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const scopes = this.oauthService.getGrantedScopes() as string[]
    if (scopes.includes(Scope.calendarList) || scopes.includes(Scope.calendarListReadOnly)) {
      return true;
    }

    this.router.navigate(['', {isSharing: route.component == SharingComponent}]);
    return false;
  }
}
