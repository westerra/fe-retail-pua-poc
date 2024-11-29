export interface Environment {
  production: boolean;
  animation: boolean;
  landingPageUrl: string;
  baseHref: string;
  apiRoot: string;
  localize?: boolean;
  googleApiKey: string;
  notificationPreferencesApiMode: string;
  calendarVersion?: string;
  appVersion?: string;
  accountsUseArrangementViewsApi?: boolean;
  identityProvider: string;
  authLandingPage: string;
}
