/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { JointServiceAgreementTypes } from './JointServiceAgreementTypes';
import type { ServiceAgreementTypes } from './ServiceAgreementTypes';

export type EnrollmentsBackbaseRebaseClientPutRequest = {
    entities: Array<string>;
    serviceAgreementType?: ServiceAgreementTypes;
    jointServiceAgreementType?: JointServiceAgreementTypes;
};

