/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { EnrollmentStatusEnum } from './EnrollmentStatusEnum';
import type { InviteStatusEnum } from './InviteStatusEnum';
import type { MetadataItem } from './MetadataItem';
import type { RegisterStatusEnum } from './RegisterStatusEnum';

export type RegisteredUser = {
    batchNumber?: number;
    username?: string;
    uuid?: string;
    email?: string;
    enrollmentStatus?: EnrollmentStatusEnum;
    inviteStatus?: InviteStatusEnum;
    registerStatus?: RegisterStatusEnum;
    message?: string;
    identification?: Record<string, string>;
    metadata?: Array<MetadataItem>;
    /**
     * Indicate if the registered user is a authorized user
     */
    isAuthorizedUser?: boolean;
    /**
     * Username of the administrator for a given authorized user
     */
    adminUsername?: string;
};

