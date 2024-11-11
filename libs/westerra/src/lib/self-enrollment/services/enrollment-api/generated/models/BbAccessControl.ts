/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type BbAccessControl = {
    /**
     * Resource being protected, e.g. 'User'
     */
    resource: string;
    /**
     * Business function, e.g. 'Manage Users'
     */
    function: string;
    /**
     * The privilege required, e.g. 'view'
     */
    privilege: string;
};

