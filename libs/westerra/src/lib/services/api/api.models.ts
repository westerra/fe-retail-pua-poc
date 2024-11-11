import { InjectionToken } from '@angular/core';
import { DataHttpConfig } from '@backbase/foundation-ang/data-http';
import { SelfEnrollmentJourneyConfig } from '../../self-enrollment/utils/enrollment-models';

export const WESTERRA_DATA_SERVICE = new InjectionToken('westerra-api-service Data Service :: HTTP Config');
export const CONFIG_VALUE = new InjectionToken('westerra-payveris-data Data Service :: Custom Http Config');
export const WESTERRA_SSO_DATA_CONFIG = new InjectionToken('westerra-sso-data Data Service :: HTTP Config');
export const WESTERRA_AMPLIFI_DATA_CONFIG = new InjectionToken<DataHttpConfig>(
  'westerra-amplifi-data Data Service :: HTTP Config',
);

export const SelfEnrollmentJourneyConfigurationToken = new InjectionToken<SelfEnrollmentJourneyConfig>(
  'IdentitySelfEnrollmentJourneyConfiguration injection token',
);

export const WESTERRA_ENROLLMENT_DATA_CONFIG = new InjectionToken(
  'westerra-enrollment-data Data Service :: HTTP Config',
);

export const CUSTOM_ENROLLMENT_HTTP_DATA_CONFIG = new InjectionToken(
  'westerra-enrollment-data Data Service :: Custom Http Config',
);

export const BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN = new InjectionToken('BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN');

export interface Additions {
  [key: string]: any;
}

export interface Customizable {
  additions?: Additions;
}

export interface ErrorState {
  error?: {
    type?: string;
    link?: string;
    linkText?: string;
    message: string;
    description?: string;
  };
  isLoading?: boolean;
}

export interface PaymentApiErrorInterface {
  status?: string | any;
  error?: string | any;
  api?: string | any;
  errorObject?: any;
}
