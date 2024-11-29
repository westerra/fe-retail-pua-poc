/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A validation error
 */
export type ErrorItem = {
    /**
     * Default Message. Any further information.
     */
    message?: string;
    /**
     * {capability-name}.api.{api-key-name}. For generated validation errors this is the path in the document the error resolves to. e.g. object name + '.' + field
     */
    key?: string;
    /**
     * Context can be anything used to construct localised messages.
     */
    context?: any;
};

