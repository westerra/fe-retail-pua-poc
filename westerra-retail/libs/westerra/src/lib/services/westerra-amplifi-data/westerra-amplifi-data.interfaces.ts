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
  // eslint-disable-next-line @typescript-eslint/ban-types
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
export interface MemberBackbaseEnrollmentPutRequest extends Customizable {
  userName: string;
  password: string;
  entityId?: string;
  ssn: string;
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
}
export interface MemberMxSessionResponse extends Customizable {
  userId?: string;
  connectionsWidgetUrl?: string;
}
export interface AmplifiResponse extends Customizable {
  name?: string;
  ssourl?: string;
}
