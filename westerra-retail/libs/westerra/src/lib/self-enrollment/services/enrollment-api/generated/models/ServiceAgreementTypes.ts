/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Indicate if a joint service agreement should be created if more than one entity is being enrolled
 */
export enum ServiceAgreementTypes {
    JOINT_ONLY = 'JOINT_ONLY',
    ENTITIES_ONLY = 'ENTITIES_ONLY',
    ENTITIES_JOINT = 'ENTITIES_JOINT',
    ENTITIES_PERSONAL_JOINT = 'ENTITIES_PERSONAL_JOINT',
    ENTITIES_BUSINESS_JOINT = 'ENTITIES_BUSINESS_JOINT',
}
