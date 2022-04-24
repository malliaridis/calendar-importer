import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AboutComponent, PrivacyComponent, SharingComponent, SubscribingComponent} from "./components";
import {OAuthModule} from "angular-oauth2-oidc";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: 'privacy', component: PrivacyComponent},
  {path: 'sharing', component: SharingComponent},
  {path: 'subscribing', component: SubscribingComponent},
  {path: '', component: AboutComponent, pathMatch: 'full'},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    OAuthModule.forRoot()
  ]
})
export class AppRoutingModule {
}
