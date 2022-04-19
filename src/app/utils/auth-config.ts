import {AuthConfig} from "angular-oauth2-oidc";
import { environment } from '../../environments/environment';

export function authCodeFlowConfig(scope: string): AuthConfig {
  return {
    issuer: 'https://accounts.google.com',
    redirectUri: window.location.origin + '/callback',
    clientId: environment.clientId,
    scope: scope,
    showDebugInformation: !environment.production,
    strictDiscoveryDocumentValidation: false,
    sessionChecksEnabled: true
  }
}
