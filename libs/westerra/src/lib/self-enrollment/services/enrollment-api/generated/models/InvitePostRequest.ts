/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type InvitePostRequest = {
    /**
     * A specific user to invite.  If username is provided, then batch is ignored.
     */
    username?: string;
    /**
     * The batch to find users to invite, default is 0.
     */
    batchNumber?: number;
    /**
     * Indicate if the registered user is a authorized user
     */
    isAuthorizedUser?: boolean;
};

