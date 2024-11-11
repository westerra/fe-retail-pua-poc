export namespace Verification {
  /**
   * Type of Verification
   */
  export enum type {
    SSN = 'SSN',
    EIN = 'EIN',
    ATIN = 'ATIN',
    ITIN = 'ITIN',
    DOB = 'DOB',
    STATEMENTBALANCE = 'STATEMENTBALANCE',
    DEBITCARD = 'DEBITCARD',
    AUTHORIZEDUSERPIN = 'AUTHORIZEDUSERPIN',
    FIRSTNAME = 'FIRSTNAME',
    LASTNAME = 'LASTNAME',
    ACCOUNTNUMBER = 'ACCOUNTNUMBER',
  }
}

export class PersonalInfo {
  username?: string;
  status?: string;
  metadata?: Metadata;
}

export class Metadata {
  firstName?: string;
  lastName?: string;
}

// Enums start

export enum ProvisioningStatusEnum {
  STARTED = 'STARTED',
  COMPLETE = 'COMPLETE',
  FAILED = 'FAILED',
}

export enum EnrollmentVerifyType {
  SSN = 'SSN',
  SSN_ACCOUNTNUMBER = 'SSN_ACCOUNTNUMBER',
  DOB_ACCOUNTNUMBER = 'DOB_ACCOUNTNUMBER',
}

export enum EnrollmentErrorMessage {
  default = 'Unfortunately we could not verify your information. Please contact us for assistance at 303-321-4209.',
  ssnMessage = 'Unfortunately we could not verify your information. Please contact us for assistance at 303-321-4209.',
}

// Enums end

// Types start

export type EnrollmentUserProfile = {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
};

export type Identification = {
  key?: string;
  value?: string;
};

export type Verification = {
  /**
   * Type of Verification
   */
  type?: Verification.type;
  /**
   * Verification value to use
   */
  value?: string;
  /**
   * Metadata as key/value pairs
   */
  metadata?: Record<string, string>;
};

export type EnrollmentInformation = {
  username?: string;
  status?: string;
  metadata?: Record<string, string>;
  /**
   * Indicate if the registered user is a authorized user
   */
  isAuthorizedUser?: boolean;
  /**
   * Indicates whether other registered users show this user as their admin
   */
  isAdmin?: boolean;
};

export type EncrypedEntitySummary = {
  /**
   * base 64 encrypted Entity Id
   */
  entityId?: string;
  /**
   * Fullname of Entity to display for selection
   */
  entityFullname?: string;
  /**
   * Indicate if the user is already enrolled in this entity
   */
  enrolled?: boolean;
};

export type EnrollmentsBackbasePostPostResponseBody = {
  /**
   * The username of a registered user matching the identification information
   */
  preferredUsername?: string;
  entities?: Array<EncrypedEntitySummary>;
  /**
   * Indicate if the registered user is a authorized user
   */
  isAuthorizedUser?: boolean;
};

export type EnrollmentsBackbasePostRequest = {
  profile?: EnrollmentUserProfile;
  /**
   * Unique identifier to look up a user for identify verification
   */
  identification: Array<Identification>;
  verification: Array<Verification>;
  /**
   * Optional list of entity lookup rules to used, as per server configuration.
   */
  entityLookupRules?: Array<string>;
};

// Types end

// Interfaces start

export interface EnrollmentStepModel {
  stepIndex: number;
  isComplete: boolean;
}

export interface StepModel {
  stepIndex: number;
  isComplete: boolean;
}

export interface EnrollmentErrorState {
  isLoading?: boolean;
  type?: string;
  message: string;
  link?: string;
  linkText?: string;
}

// export interface IdUser extends EnrollmentsBackbasePostRequest {
//     entities: Array<string>;
//     preferredUsername: string;
//     username?: string;
//     status?: string;
//     metadata?: Record<string, string>;
// }

export interface IdUser {
  entities: Array<string> | Array<object> | any;
  preferredUsername: string | any;
  username?: string;
  status?: string;
  metadata?: Record<string, string>;
  profile?: EnrollmentUserProfile;
  /**
   * Unique identifier to look up a user for identify verification
   */
  identification: Array<object> | Array<Identification> | any;
  verification: Array<Verification>;
  /**
   * Optional list of entity lookup rules to used, as per server configuration.
   */
  entityLookupRules?: Array<string>;
}

export interface IdentificationFormResponse {
  /** mandatory value for date of birth */
  dateOfBirth?: string;
  /** mandatory value for account number */
  accountNumber?: string;
  /** optional value for social security number */
  socialSecurityNumber?: string;

  firstName?: string;
  lastName?: string;
}

export interface MemberEnrollmentIdPostRequest {
  identification: Array<object> | any;
  verification: Array<object>;
  entityLookup: {
    ssn: string;
  };
}

export interface MemberEnrollmentIdPostResponse {
  entities?: Array<object>;
}

export interface IdUser extends MemberEnrollmentIdPostRequest {
  identification: Array<object> | Array<Identification> | any;
  entities: Array<string> | Array<object> | any;
  preferredUsername: string | any;
}

export interface EnrollUser {
  username: string;
  password: string;
  identification: Array<object>;
  verification: Array<object>;
  entities: Array<string>;
  serviceAgreementType: string;
}

export interface Additions {
  [key: string]: any;
}
export interface Customizable {
  additions?: Additions;
}
export interface TraitsBadRequestError extends Customizable {
  message: string;
  errors?: Array<ErrorItem>;
}
export interface ErrorItem extends Customizable {
  message?: string;
  key?: string;
  context?: {};
}
export interface TraitsInternalServerError extends Customizable {
  message: string;
}
export interface MemberBackbaseEnrollmentPostRequest extends Customizable {
  firstName: string;
  lastName: string;
  memberNumber: string;
  emailAddress?: string;
  ssn: string;
}
export interface MemberBackbaseEnrollmentPostResponse extends Customizable {
  entityId?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  ssn?: string;
}

export interface MemberBackbaseAutoEnrollmentPostResponse extends Customizable {
  entityId?: string;
  entityFullname?: string;
}

export interface MemberBackbaseEnrollmentPutRequest extends Customizable {
  userName: string;
  password: string;
  entityId?: string;
  ssn: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  serviceAgreementType: string;
  jointServiceAgreementType: string;
  acceptTerms?: boolean;
}
export interface MemberMxSessionResponse extends Customizable {
  userId?: string;
  connectionsWidgetUrl?: string;
}

export interface SelfEnrollmentJourneyConfig {
  /** Mandatory configuration to specify the application's private landing page */
  appUrl: string;
  /** Mandatory configuration to specify the URL for the customer's terms & conditions page */
  termsConditionsUrl: string;
  /** Mandatory configuration to specify the URL for the customer's privacy policy page */
  privacyPolicyUrl: string;
  /** Mandatory configuration to specify the contact advisor phone number */
  phoneNumber: string;
  /** Optional configuration to specify the max length of the account number. Default value: 10 */
  accountNumberMaxLength?: number;
  /** Optional configuration to specify the minimum age of the bank customer. Default value: 18 */
  minimumAge?: number;
  /** Optional configuration to specify the provisioning status polling interval, in seconds. Default value: 3 */
  pollingIntervalSeconds?: number;
  /** Optional configuration to specify the maximum number of provisioning status polling attempts. Default value: 10 */
  maxPollingAttempts?: number;
}

export interface SelfEnrollmentUsernamePasswordForm {
  username: string;
  password: string;
  passwordConfirm: string;
}

export interface SelfEnrollmentValidateAccountForm {
  accNumber: string;
  dateOfBirth: string;
}

export interface SelfEnrollmentErrorState {
  isLoading?: boolean;
  type?: string;
  message: string;
  link?: string;
  linkText?: string;
}

export interface MemberEnrollmentIdPostRequest {
  identification: Array<object> | any;
  verification: Array<object>;
  entityLookup: {
    ssn: string;
  };
}

export interface IdUser extends MemberEnrollmentIdPostRequest {
  identification: Array<object> | any;
  entities: Array<object> | any;
  preferredUsername: string | any;
}

export interface Customizable {
  additions?: Additions;
}
export interface TraitsBadRequestError extends Customizable {
  message: string;
  errors?: Array<ErrorItem>;
}

export interface MemberBackbaseEnrollmentPostResponse extends Customizable {
  entityId?: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  ssn?: string;
}

export interface MemberBackbaseAutoEnrollmentPostResponse extends Customizable {
  entityId?: string;
  entityFullname?: string;
}

export interface MemberBackbaseEnrollmentPutRequest extends Customizable {
  userName: string;
  password: string;
  entityId?: string;
  ssn: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  serviceAgreementType: string;
  jointServiceAgreementType: string;
}
export interface MemberMxSessionResponse extends Customizable {
  userId?: string;
  connectionsWidgetUrl?: string;
}
export interface PayverisResponse extends Customizable {
  artifactId?: string;
}

export interface EnrollmentUserData {
  firstName?: string;
  lastName?: string;
  uuid?: string | number | any;
  preferredUsername?: string;
  accountNumber?: string | any;
  dob?: string | any;
  ssn?: string | any;
}

export interface MemberBackbaseAutoEnrollmentPostRequest extends Customizable {
  firstName?: string;
  lastName?: string;
  memberNumber?: string;
  emailAddress?: string;
  ssn?: string;
  uuid?: string | number | any;
  preferredUsername?: string;
  accountNumber?: string | any;
  dob?: string | any;
}

// Interfaces end
