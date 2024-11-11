import { Customizable } from '../api.models';

export enum REDIRECT_APPLICATION_NAME {
  HARLAND = 'harland',
  DMI = 'dmi',
  AMPLIFY = 'amplify',
  DEFAULT_ERROR = 'No SSO Application Details Present',
}

export enum entityType {
  PERSONAL = 'PERSONAL',
  BUSINESS = 'BUSINESS',
}

export interface RedirectResponse extends Customizable {
  name?: string;
  ssourl?: string;
}

export interface RedirectRequest {
  name: string;
  internalArrangementId?: string;
  autoEnroll?: string;
  entityType?: entityType;
}

export interface PayverisResponse extends Customizable {
  // name?: string;
  ssourl?: string;
}
