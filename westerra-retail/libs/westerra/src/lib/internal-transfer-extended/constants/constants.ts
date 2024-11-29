/* eslint-disable no-var */
export const USStates = [
    { id: 'AL', name: 'Alabama' },
    { id: 'AK', name: 'Alaska' },
    { id: 'AS', name: 'American Samoa' },
    { id: 'AZ', name: 'Arizona' },
    { id: 'AR', name: 'Arkansas' },
    { id: 'CA', name: 'California' },
    { id: 'CO', name: 'Colorado' },
    { id: 'CT', name: 'Connecticut' },
    { id: 'DE', name: 'Delaware' },
    { id: 'DC', name: 'District Of Columbia' },
    { id: 'FM', name: 'Federated States Of Micronesia' },
    { id: 'FL', name: 'Florida' },
    { id: 'GA', name: 'Georgia' },
    { id: 'GU', name: 'Guam' },
    { id: 'HI', name: 'Hawaii' },
    { id: 'ID', name: 'Idaho' },
    { id: 'IL', name: 'Illinois' },
    { id: 'IN', name: 'Indiana' },
    { id: 'IA', name: 'Iowa' },
    { id: 'KS', name: 'Kansas' },
    { id: 'KY', name: 'Kentucky' },
    { id: 'LA', name: 'Louisiana' },
    { id: 'ME', name: 'Maine' },
    { id: 'MH', name: 'Marshall Islands' },
    { id: 'MD', name: 'Maryland' },
    { id: 'MA', name: 'Massachusetts' },
    { id: 'MI', name: 'Michigan' },
    { id: 'MN', name: 'Minnesota' },
    { id: 'MS', name: 'Mississippi' },
    { id: 'MO', name: 'Missouri' },
    { id: 'MT', name: 'Montana' },
    { id: 'NE', name: 'Nebraska' },
    { id: 'NV', name: 'Nevada' },
    { id: 'NH', name: 'New Hampshire' },
    { id: 'NJ', name: 'New Jersey' },
    { id: 'NM', name: 'New Mexico' },
    { id: 'NY', name: 'New York' },
    { id: 'NC', name: 'North Carolina' },
    { id: 'ND', name: 'North Dakota' },
    { id: 'MP', name: 'Northern Mariana Islands' },
    { id: 'OH', name: 'Ohio' },
    { id: 'OK', name: 'Oklahoma' },
    { id: 'OR', name: 'Oregon' },
    { id: 'PW', name: 'Palau' },
    { id: 'PA', name: 'Pennsylvania' },
    { id: 'PR', name: 'Puerto Rico' },
    { id: 'RI', name: 'Rhode Island' },
    { id: 'SC', name: 'South Carolina' },
    { id: 'SD', name: 'South Dakota' },
    { id: 'TN', name: 'Tennessee' },
    { id: 'TX', name: 'Texas' },
    { id: 'UT', name: 'Utah' },
    { id: 'VT', name: 'Vermont' },
    { id: 'VI', name: 'Virgin Islands' },
    { id: 'VA', name: 'Virginia' },
    { id: 'WA', name: 'Washington' },
    { id: 'WV', name: 'West Virginia' },
    { id: 'WI', name: 'Wisconsin' },
    { id: 'WY', name: 'Wyoming' },
];
export const SepaCountries = [
    'AD',
    'AT',
    'BE',
    'BG',
    'CH',
    'CY',
    'CZ',
    'DE',
    'DK',
    'EE',
    'ES',
    'FI',
    'FR',
    'GB',
    'GI',
    'GR',
    'HR',
    'HU',
    'IE',
    'IS',
    'IT',
    'LI',
    'LT',
    'LU',
    'LV',
    'MC',
    'MT',
    'NL',
    'NO',
    'PL',
    'PT',
    'RO',
    'SE',
    'SI',
    'SK',
    'SM',
    'VA',
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const US_States = USStates.map(({ name, id }) => ({ label: name, value: id }));

export var P2PLimitErrorKeys;
(function (P2PLimitErrorKeys) {
    P2PLimitErrorKeys["minLimit"] = "p2p.payveris.limit_violation.min_payment_amount";
    P2PLimitErrorKeys["maxLimit"] = "p2p.payveris.limit_violation.max_payment_amount";
})(P2PLimitErrorKeys || (P2PLimitErrorKeys = {}));

export var A2ALimitErrorKeys;
(function (A2ALimitErrorKeys) {
    A2ALimitErrorKeys["maxIncomingLimit"] = "a2a.payveris.limit_violation.max_incoming_payment_amount";
    A2ALimitErrorKeys["maxOutGoingLimit"] = "a2a.payveris.limit_violation.max_outgoing_payment_amount";
    A2ALimitErrorKeys["minLimit"] = "a2a.payveris.limit_violation.min_payment_amount";
})(A2ALimitErrorKeys || (A2ALimitErrorKeys = {}));

export const bicCodeValidationPattern = '^[A-Z]{6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3})?$';

export const forbiddenStatus = 403;

export const ibanMask = 'AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA';

export const A2A_INVALID_DATE_ERROR_KEY = 'a2a.payveris.invalid_request.invalid_payment_date';