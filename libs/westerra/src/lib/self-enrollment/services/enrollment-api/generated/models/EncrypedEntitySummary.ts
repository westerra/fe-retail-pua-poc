/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type EncrypedEntitySummary = {
    /**
     * base 64 encrypted Entity Id
     */
    entityId?: string;
    /**
     * Fullname of Entity to display for selection
     */
    entityFullname?: string;
    /**
     * Indicate if the user is already enrolled in this entity
     */
    enrolled?: boolean;
};

