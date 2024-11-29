/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BbApiDeprecation = {
    /**
     * Version of the product from which the endpoint has been deprecated and should no longer be used
     * @deprecated
     */
    deprecatedFromVersion: string;
    /**
     * Version of the product from which the API endpoint will be removed
     */
    removedFromVersion: string;
    /**
     * The reason the API endpoint was deprecated
     * @deprecated
     */
    reason: string;
    /**
     * Any further information, e.g. migration information
     */
    description: string;
};

