/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import type { Observable } from 'rxjs';

import type { EnrollmentInformation } from '../models/EnrollmentInformation';
import type { EnrollmentsBackbasePostPostResponseBody } from '../models/EnrollmentsBackbasePostPostResponseBody';
import type { EnrollmentsBackbasePostRequest } from '../models/EnrollmentsBackbasePostRequest';
import type { EnrollmentsBackbasePutRequest } from '../models/EnrollmentsBackbasePutRequest';
import type { EnrollmentsBackbaseRebaseClientPutRequest } from '../models/EnrollmentsBackbaseRebaseClientPutRequest';
import type { EnrollmentsBackbaseRebasePostRequest } from '../models/EnrollmentsBackbaseRebasePostRequest';
import type { EnrollmentsBackbaseRebasePostResponseBody } from '../models/EnrollmentsBackbaseRebasePostResponseBody';
import type { EnrollmentsBackbaseStatusGetResponseBody } from '../models/EnrollmentsBackbaseStatusGetResponseBody';
import type { MXSession } from '../models/MXSession';
import type { PayverisSession } from '../models/PayverisSession';

import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

import { OAuthService } from 'angular-oauth2-oidc';

@Injectable()
export class EnrollmentsService {
    constructor(public readonly http: HttpClient, private oAuthService: OAuthService) {}

    /**
     * Enroll User in Backbase - Search Entity.
     * Search Enity via user identification and verification information
     * @param requestBody
     * @returns EnrollmentsBackbasePostPostResponseBody List of entities (encrypted)
     * @throws ApiError
     */
    public postBackbase(
        requestBody?: EnrollmentsBackbasePostRequest
    ): Observable<EnrollmentsBackbasePostPostResponseBody> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/client-api/v2/enrollments/backbase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Enroll User in Backbase - Finalize.
     * Prompts user to enter username and password
     * @param requestBody
     * @returns any No description available
     * @throws ApiError
     */
    public putBackbase(requestBody?: EnrollmentsBackbasePutRequest): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/client-api/v2/enrollments/backbase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Get information about a user to use for enrollment
     * @param uuid The invite code for the given user
     * @param accountNumber The unique core account number used for matching
     * @param verifyType Type of verification provided
     * @param verify The verification matching the code provided.  If not provided, then only non secure data is returned
     * @returns EnrollmentInformation Enrollment information matching the invite code.
     * @throws ApiError
     */
    public getEnrollmentInformation(
        uuid: string,
        accountNumber?: string,
        verifyType: 'SSN' | 'SSN_ACCOUNTNUMBER' | 'DOB_ACCOUNTNUMBER' = 'SSN',
        verify?: string
    ): Observable<EnrollmentInformation> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/client-api/v2/enrollments/backbase',
            query: {
                uuid: uuid,
                accountNumber: accountNumber,
                verifyType: verifyType,
                verify: verify,
            },
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Check a user's enrollment and registration status in backbase
     * Returns a boolean `enrolled`, a uuid if they are registered (for use with auto-enrollment), or a 404 if they aren't found.
     * @param username
     * @returns EnrollmentsBackbaseStatusGetResponseBody A registered or enrolled user was found. `uuid` is provided if they are registered.
     * @throws ApiError
     */
    public getEnrollmentStatusByUsername(username: string): Observable<EnrollmentsBackbaseStatusGetResponseBody> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/client-api/v2/enrollments/backbase/user/{username}',
            path: {
                username: username,
            },
            errors: {
                404: `The user is not found`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Identify all entities a user can be rebased with
     * Search Entity via user and entity look up information
     * @param requestBody
     * @returns EnrollmentsBackbaseRebasePostResponseBody List of entities (encrypted)
     * @throws ApiError
     */
    public postBackbaseRebase(
        requestBody?: EnrollmentsBackbaseRebasePostRequest
    ): Observable<EnrollmentsBackbaseRebasePostResponseBody> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/client-api/v2/enrollments/backbase/rebase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Rebase a existing users enrollment
     * Rebase a existing users enrollment (only allowed for authenticted)
     * @param requestBody
     * @returns any No description available
     * @throws ApiError
     */
    public putBackbaseRebase(requestBody?: EnrollmentsBackbaseRebaseClientPutRequest): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'PUT',
            url: '/client-api/v2/enrollments/backbase/rebase',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Get Enrolled User from MX.
     * Return enrolled user from MX
     * @returns MXSession No description available
     * @throws ApiError
     */
    public getMx(): Observable<MXSession> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/client-api/v2/enrollments/mx',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
            headers: {
                ['authorization']: `BEARER  ${this.oAuthService.getAccessToken()}`,
            },
        });
    }

    /**
     * Enroll User in MX.
     * Enrolls user in MX, and save MX User Id in Identity
     * @returns MXSession No description available
     * @throws ApiError
     */
    public postMx(): Observable<MXSession> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/client-api/v2/enrollments/mx',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
            headers: {
                ['authorization']: `BEARER  ${this.oAuthService.getAccessToken()}`,
            },
        });
    }

    /**
     * Get Enrolled User from Payveris.
     * Return enrolled user from Payveris
     * @returns PayverisSession No description available
     * @throws ApiError
     */
    public getPayveris(): Observable<PayverisSession> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/client-api/v2/enrollments/payveris',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }

    /**
     * Enroll User in Payveris.
     * Enrolls user in Payveris,
     * @returns PayverisSession No description available
     * @throws ApiError
     */
    public postPayveris(): Observable<PayverisSession> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/client-api/v2/enrollments/payveris',
            errors: {
                400: `BadRequest`,
                500: `InternalServerError`,
            },
        });
    }
}
