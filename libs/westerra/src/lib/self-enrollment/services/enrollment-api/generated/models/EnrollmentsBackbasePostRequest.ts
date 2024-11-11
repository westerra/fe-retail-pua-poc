/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Identification } from './Identification';
import type { Profile } from './Profile';
import type { Verification } from './Verification';

export type EnrollmentsBackbasePostRequest = {
    profile?: Profile;
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

