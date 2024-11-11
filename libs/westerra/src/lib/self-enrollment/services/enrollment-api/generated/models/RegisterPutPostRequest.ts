/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { RegisteredUser } from './RegisteredUser';

export type RegisterPutPostRequest = {
    batchNumber?: number;
    users?: Array<RegisteredUser>;
};

