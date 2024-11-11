/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Profile } from './Profile';

export type EnrollmentsBackbaseLimitedPutRequest = {
    username: string;
    password: string;
    /**
     * Profile is required with limited users, since the user profile can't retrieved from the core
     */
    profile: Profile;
};

