/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Verification = {
    /**
     * Type of Verification
     */
    type?: Verification.type;
    /**
     * Verification value to use
     */
    value?: string;
    /**
     * Metadata as key/value pairs
     */
    metadata?: Record<string, string>;
};

export namespace Verification {

    /**
     * Type of Verification
     */
    export enum type {
        SSN = 'SSN',
        EIN = 'EIN',
        ATIN = 'ATIN',
        ITIN = 'ITIN',
        DOB = 'DOB',
        STATEMENTBALANCE = 'STATEMENTBALANCE',
        DEBITCARD = 'DEBITCARD',
        AUTHORIZEDUSERPIN = 'AUTHORIZEDUSERPIN',
        FIRSTNAME = 'FIRSTNAME',
        LASTNAME = 'LASTNAME',
        ACCOUNTNUMBER = 'ACCOUNTNUMBER',
    }


}

