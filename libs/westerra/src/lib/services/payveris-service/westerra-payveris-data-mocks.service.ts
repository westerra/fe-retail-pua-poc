import { createMocks } from '@backbase/foundation-ang/data-http';
import { Provider } from '@angular/core';
import { WESTERRA_PAYVERIS_DATA_CONFIG } from './westerra-payveris-data-service.service';
const examples = [
  {
    urlPattern: '/client-api/{version}/enrollments/backbase',
    method: 'POST',
    responses: [
      {
        status: 500,
        body: {
          message: 'Description of error',
        },
        type: 'TraitsInternalServerError',
      },
      {
        status: 403,
        body: { errors: [{ message: 'SSN does not match', key: 'enrollMember' }] },
        type: 'TraitsBadRequestError',
        message: 'SSN does not match',
      },
      // {
      //   status: 201,
      //   body: {
      //     entityId: 'adsjdsansadnalsk=',
      //   },
      //   type: 'MemberBackbaseEnrollmentPostResponse',
      // },
    ],
  },
  {
    urlPattern: '/client-api/{version}/enrollments/backbase',
    method: 'PUT',
    responses: [
      {
        status: 500,
        body: {
          message: 'Description of error',
        },
        type: 'TraitsInternalServerError',
      },
      {
        status: 400,
        body: {
          message: 'Bad Request',
          errors: [
            {
              message: 'Value Exceeded. Must be between {min} and {max}.',
              key: 'common.api.shoesize',
              context: {
                max: '50',
                min: '1',
              },
            },
          ],
        },
        type: 'TraitsBadRequestError',
      },
      {
        status: 201,
        body: null,
        type: 'any',
      },
    ],
  },
  {
    urlPattern: '/client-api/{version}/enrollments/mx',
    method: 'POST',
    responses: [
      {
        status: 500,
        body: {
          message: 'Description of error',
        },
        type: 'TraitsInternalServerError',
      },
      {
        status: 400,
        body: {
          message: 'Bad Request',
          errors: [
            {
              message: 'Value Exceeded. Must be between {min} and {max}.',
              key: 'common.api.shoesize',
              context: {
                max: '50',
                min: '1',
              },
            },
          ],
        },
        type: 'TraitsBadRequestError',
      },
      {
        status: 201,
        body: {
          sessionToken: '1234123412341234',
          userId: 'userIdFromMX',
          connectionsWidgetUrl:
            'https://int-widgets.moneydesktop.com/md/connections/9k8dxcvk5mg0y73A112rvbmbdmZ7pkzmz8l09q6r0zw0q5dqbl1k205nyxks666r0wcn0lgs3g36bbynbcdbbjmAfb73vs3q497yph206dyfj3vr58kdn5zjs0yq67rw27ghhtvhfhpdAz4p527hp1d5dz5yfAhd9dpz7gxch79fq25drpvtyhpbd4zbmh90d0v3d62tg8dddxdbn8thjfqn0vz21yzvAf0ckp395qj0xyfhsnyyw5gxsh60fwpk5wg17hpc1r7m5zcnm80tkn7119ssrkvA2s8q2vv6vdhn7mwn61x7lkf67wf5jbfc6skx32p1wsd73Ag3m7yttknd1cv2l9yb17jytpkA/eyJpc19tb2JpbGVfd2VidmlldyI6InRydWUiLCJsb2NhbGUiOiJlbi1VUyJ9',
        },
        type: 'MemberMxSessionResponse',
      },
    ],
  },
  {
    urlPattern: '/client-api/{version}/enrollments/mx',
    method: 'GET',
    responses: [
      {
        status: 404,
        body: {
          message: 'Description of error',
        },
        type: 'TraitsInternalServerError',
      },
    ],
  },
];
export const WesterraEnrollmentDataMocksProvider: Provider = createMocks(examples, WESTERRA_PAYVERIS_DATA_CONFIG);
