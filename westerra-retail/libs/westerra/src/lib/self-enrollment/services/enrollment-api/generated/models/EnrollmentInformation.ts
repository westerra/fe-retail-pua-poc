/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

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

