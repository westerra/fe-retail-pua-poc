// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthConfig } from 'angular-oauth2-oidc';
import { Environment } from './type';

export const environment: Environment = {
  /**
   * Whether to run the app in production mode.
   * Default: false
   */
  production: false,

  /**
   * Whether to enable animation capabilities
   * Default: true
   */
  animation: false,

  googleApiKey: '${MAPS_API_KEY}',
  landingPageUrl: '/',
  apiRoot: '/api',
  baseHref: '/retail-ap/',
  notificationPreferencesApiMode: 'actions',
  accountsUseArrangementViewsApi: false,
  identityProvider: '',
  authLandingPage:''
};

export const authConfig: (baseUrl: string) => AuthConfig = (_baseUrl: string = '') => ({
  // Url of the Identity Provider
  issuer: 'https://identity.stg.reference.azure.backbaseservices.com/auth/realms/backbase',

  // URL of the SPA to redirect the user to after login
  redirectUri: document.location.origin + '/select-context',

  // The SPA's id. The SPA is registered with this id at the auth-server
  clientId: 'bb-web-client',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications. (IE: does not support PKCE)
  // dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  scope: 'openid',

  requireHttps: false,
  showDebugInformation: true,
  logoutUrl: document.location.origin + '/logout',
  useSilentRefresh: true,
  silentRefreshTimeout: 5000,
  silentRefreshRedirectUri: document.location.origin + '/assets/silent-refresh.htm',
});
