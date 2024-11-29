/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Identification } from './Identification';
import type { JointServiceAgreementTypes } from './JointServiceAgreementTypes';
import type { ServiceAgreementTypes } from './ServiceAgreementTypes';

export type EnrollmentsBackbaseRebaseServicePutRequest = {
    /**
     * required for the service api
     */
    username: string;
    entities: Array<string>;
    serviceAgreementType: ServiceAgreementTypes;
    jointServiceAgreementType: JointServiceAgreementTypes;
    /**
     * identification data, will overwrite if it exist
     */
    identification?: Array<Identification>;
    /**
     * Indicate if ingestion should be triggered
     */
    triggerIngestion?: boolean;
};

