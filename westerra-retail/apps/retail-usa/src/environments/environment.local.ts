/* eslint-disable @nrwl/nx/enforce-module-boundaries */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { AuthConfig } from 'angular-oauth2-oidc';
import { Environment } from './type';
import packageJson from '../../../../package.json';

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
  animation: true,

  /**
   * Mock providers for Backbase services used when running the app in dev mode.
   */
  landingPageUrl: '/',
  apiRoot: '/api',
  baseHref: '/retail-app/',
  googleApiKey: 'AIzaSyAxSiPRpCqmWpySO8MlhSpfv2LCgfeJvJQ',
  notificationPreferencesApiMode: 'actions',
  appVersion: packageJson.version,
  calendarVersion: packageJson.backbase.appVersion,
  accountsUseArrangementViewsApi: false,
  // identityProvider: 'http://localhost:8180/auth/realms/retail',
  identityProvider: '',
  authLandingPage: '',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

export const authConfig: (baseUrl: string) => AuthConfig = (_baseUrl: string = '') => ({
  // Url of the Identity Provider
  // This address for retail is used because the CORS policy there allows local development
  // url <change_this_placeholder_to_your_identity_url_with_realm> is meant to be here
  // issuer: 'http://localhost:8180/auth/realms/retail',
  issuer: 'https://identity.bus.sdbxaz.azure.backbaseservices.com/auth/realms/customer',

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
