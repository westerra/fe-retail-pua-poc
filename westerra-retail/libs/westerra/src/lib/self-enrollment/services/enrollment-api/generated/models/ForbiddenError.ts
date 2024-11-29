/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ErrorItem } from './ErrorItem';

export type ForbiddenError = {
    /**
     * Any further information
     */
    message?: string;
    /**
     * Detailed error information
     */
    errors?: Array<ErrorItem>;
};

