/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Identification } from './Identification';
import type { JointServiceAgreementTypes } from './JointServiceAgreementTypes';
import type { Profile } from './Profile';
import type { ServiceAgreementTypes } from './ServiceAgreementTypes';
import type { Verification } from './Verification';

export type EnrollmentsBackbasePutRequest = {
    username: string;
    password: string;
    entities: Array<string>;
    verification: Array<Verification>;
    /**
     * Unique identifier to look up a user for identify verification
     */
    identification: Array<Identification>;
    profile?: Profile;
    serviceAgreementType?: ServiceAgreementTypes;
    jointServiceAgreementType?: JointServiceAgreementTypes;
    /**
     * A pin code is set by administrator users, that is then used by Authorized users during auto enrollment to security identify they are allowed to proceed
     */
    pin?: string;
};

