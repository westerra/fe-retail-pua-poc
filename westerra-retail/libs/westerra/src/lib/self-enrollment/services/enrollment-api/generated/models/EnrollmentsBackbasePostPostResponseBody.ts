/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EncrypedEntitySummary } from './EncrypedEntitySummary';

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

