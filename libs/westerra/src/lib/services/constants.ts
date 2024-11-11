import '@angular/localize/init';
import { Status } from '@backbase/payment-order-http-ang';

export const P2P_PAYMENT_TYPE = 'P2P_TRANSFER';

export const LOAN_PAYMENT = 'LOAN_PAYMENT';

export const LOAN_ADVANCE = 'LOAN_ADVANCE';

export const A2A_PAYMENT_TYPE = 'EXTERNAL_A2A';

export const REASON_CODES = {
  pending: 'PP01',
  inProcess: 'PP02',
  authenticationFailed: 'PP11',
  failed: 'PP12',
  returned: 'PP13',
  expired: 'PP14',
};

export const DETAILS_MODAL_OUTLET = 'details-modal';

export const P2P_TOOLTIP_TEXT = $localize`:@@upcoming-payments-journey.payment-item.details-modal.tooltip:This payment can’t be cancelled because it has already been accepted by the recipient.`;

export const A2A_TOOLTIP_TEXT = $localize`:@@upcoming-payments-journey.payment-item.ready-status.a2a-tooltip:This payment can’t be edited nor cancelled because its being processed.`;

export const cdAccountProductExternalTypeIds = [
  '50',
  '51',
  '52',
  '57',
  '58',
  '59',
  '61',
  '62',
  '65',
  '66',
  '67',
  '113',
  '117',
  '124',
  '136',
  '178',
  '180',
  '184',
  '185',
  '186',
];

export const mortgageAccountProductExternalTypeIds = ['1001', '1002', '1003', '1004', '1005'];
export const immediateTransferBlockedCreditAccounts = [
  '170',
  '172',
  '173',
  '174',
  '175',
  '186',
  '190',
  '191',
  '330',
  '331',
];

export const defaultCalendarMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const mulesoftErrorStatement =
  '400 : "{"status":false,"messages":["A client error occurred while performing a Mulesoft RestTemplate r...';

export const creditCardAccountsRecurringScheduledTransferErrorMessage =
  'You may not schedule recurring transfers from credit card accounts.';

export const loanAccountsRecurringScheduledTransferErrorMessage =
  'You may not schedule recurring transfers from loan accounts.';

export const immediateTransferBlockedMessageForCreditCard =
  'Transfers from a credit card to a loan is not allowed. Please choose a different account.';

export const stateLabelValues = [
  { label: 'Alabama', value: 'AL' },
  { label: 'Alaska', value: 'AK' },
  { label: 'American Samoa', value: 'AS' },
  { label: 'Arizona', value: 'AZ' },
  { label: 'Arkansas', value: 'AR' },
  { label: 'California', value: 'CA' },
  { label: 'Colorado', value: 'CO' },
  { label: 'Connecticut', value: 'CT' },
  { label: 'Delaware', value: 'DE' },
  { label: 'District of Columbia', value: 'DC' },
  { label: 'Florida', value: 'FL' },
  { label: 'Georgia', value: 'GA' },
  { label: 'Guam', value: 'GU' },
  { label: 'Hawaii', value: 'HI' },
  { label: 'Idaho', value: 'ID' },
  { label: 'Illinois', value: 'IL' },
  { label: 'Indiana', value: 'IN' },
  { label: 'Iowa', value: 'IA' },
  { label: 'Kansas', value: 'KS' },
  { label: 'Kentucky', value: 'KY' },
  { label: 'Louisiana', value: 'LA' },
  { label: 'Maine', value: 'ME' },
  { label: 'Maryland', value: 'MD' },
  { label: 'Massachusetts', value: 'MA' },
  { label: 'Michigan', value: 'MI' },
  { label: 'Minnesota', value: 'MN' },
  { label: 'Mississippi', value: 'MS' },
  { label: 'Missouri', value: 'MO' },
  { label: 'Montana', value: 'MT' },
  { label: 'Nebraska', value: 'NE' },
  { label: 'Nevada', value: 'NV' },
  { label: 'New Hampshire', value: 'NH' },
  { label: 'New Jersey', value: 'NJ' },
  { label: 'New Mexico', value: 'NM' },
  { label: 'New York', value: 'NY' },
  { label: 'North Carolina', value: 'NC' },
  { label: 'North Dakota', value: 'ND' },
  { label: 'Northern Mariana Islands', value: 'MP' },
  { label: 'Ohio', value: 'OH' },
  { label: 'Oklahoma', value: 'OK' },
  { label: 'Oregon', value: 'OR' },
  { label: 'Pennsylvania', value: 'PA' },
  { label: 'Puerto Rico', value: 'PR' },
  { label: 'Rhode Island', value: 'RI' },
  { label: 'South Carolina', value: 'SC' },
  { label: 'South Dakota', value: 'SD' },
  { label: 'Tennessee', value: 'TN' },
  { label: 'Texas', value: 'TX' },
  { label: 'Utah', value: 'UT' },
  { label: 'Vermont', value: 'VT' },
  { label: 'Virgin Islands', value: 'VI' },
  { label: 'Virginia', value: 'VA' },
  { label: 'Washington', value: 'WA' },
  { label: 'West Virginia', value: 'WV' },
  { label: 'Wisconsin', value: 'WI' },
  { label: 'Wyoming', value: 'WY' },
];

export const countryList = [
  {
    value: 'AF',
    label: 'Afghanistan',
  },
  {
    value: 'AX',
    label: 'Aland Islands',
  },
  {
    value: 'AL',
    label: 'Albania',
  },
  {
    value: 'DZ',
    label: 'Algeria',
  },
  {
    value: 'AS',
    label: 'American Samoa',
  },
  {
    value: 'AD',
    label: 'Andorra',
  },
  {
    value: 'AO',
    label: 'Angola',
  },
  {
    value: 'AI',
    label: 'Anguilla',
  },
  {
    value: 'AQ',
    label: 'Antarctica',
  },
  {
    value: 'AG',
    label: 'Antigua and Barbuda',
  },
  {
    value: 'AR',
    label: 'Argentina',
  },
  {
    value: 'AM',
    label: 'Armenia',
  },
  {
    value: 'AW',
    label: 'Aruba',
  },
  {
    value: 'AU',
    label: 'Australia',
  },
  {
    value: 'AT',
    label: 'Austria',
  },
  {
    value: 'AZ',
    label: 'Azerbaijan',
  },
  {
    value: 'BS',
    label: 'Bahamas',
  },
  {
    value: 'BH',
    label: 'Bahrain',
  },
  {
    value: 'BD',
    label: 'Bangladesh',
  },
  {
    value: 'BB',
    label: 'Barbados',
  },
  {
    value: 'BY',
    label: 'Belarus',
  },
  {
    value: 'BE',
    label: 'Belgium',
  },
  {
    value: 'BZ',
    label: 'Belize',
  },
  {
    value: 'BJ',
    label: 'Benin',
  },
  {
    value: 'BM',
    label: 'Bermuda',
  },
  {
    value: 'BT',
    label: 'Bhutan',
  },
  {
    value: 'BO',
    label: 'Bolivia, Plurinational State of',
  },
  {
    value: 'BQ',
    label: 'Bonaire, Saint Eustatius and Saba',
  },
  {
    value: 'BA',
    label: 'Bosnia and Herzegovina',
  },
  {
    value: 'BW',
    label: 'Botswana',
  },
  {
    value: 'BV',
    label: 'Bouvet Island',
  },
  {
    value: 'BR',
    label: 'Brazil',
  },
  {
    value: 'IO',
    label: 'British Indian Ocean Territory',
  },
  {
    value: 'BN',
    label: 'Brunei Darussalam',
  },
  {
    value: 'BG',
    label: 'Bulgaria',
  },
  {
    value: 'BF',
    label: 'Burkina Faso',
  },
  {
    value: 'BI',
    label: 'Burundi',
  },
  {
    value: 'KH',
    label: 'Cambodia',
  },
  {
    value: 'CM',
    label: 'Cameroon',
  },
  {
    value: 'CA',
    label: 'Canada',
  },
  {
    value: 'CV',
    label: 'Cape Verde',
  },
  {
    value: 'KY',
    label: 'Cayman Islands',
  },
  {
    value: 'CF',
    label: 'Central African Republic',
  },
  {
    value: 'TD',
    label: 'Chad',
  },
  {
    value: 'CL',
    label: 'Chile',
  },
  {
    value: 'CN',
    label: 'China',
  },
  {
    value: 'CX',
    label: 'Christmas Island',
  },
  {
    value: 'CC',
    label: 'Cocos (Keeling) Islands',
  },
  {
    value: 'CO',
    label: 'Colombia',
  },
  {
    value: 'KM',
    label: 'Comoros',
  },
  {
    value: 'CG',
    label: 'Congo',
  },
  {
    value: 'CD',
    label: 'Congo, The Democratic Republic of the',
  },
  {
    value: 'CK',
    label: 'Cook Islands',
  },
  {
    value: 'CR',
    label: 'Costa Rica',
  },
  {
    value: 'CI',
    label: "Cote d'Ivoire",
  },
  {
    value: 'HR',
    label: 'Croatia',
  },
  {
    value: 'CU',
    label: 'Cuba',
  },
  {
    value: 'CW',
    label: 'Curacao',
  },
  {
    value: 'CY',
    label: 'Cyprus',
  },
  {
    value: 'CZ',
    label: 'Czech Republic',
  },
  {
    value: 'DK',
    label: 'Denmark',
  },
  {
    value: 'DJ',
    label: 'Djibouti',
  },
  {
    value: 'DM',
    label: 'Dominica',
  },
  {
    value: 'DO',
    label: 'Dominican Republic',
  },
  {
    value: 'EC',
    label: 'Ecuador',
  },
  {
    value: 'EG',
    label: 'Egypt',
  },
  {
    value: 'SV',
    label: 'El Salvador',
  },
  {
    value: 'GQ',
    label: 'Equatorial Guinea',
  },
  {
    value: 'ER',
    label: 'Eritrea',
  },
  {
    value: 'EE',
    label: 'Estonia',
  },
  {
    value: 'ET',
    label: 'Ethiopia',
  },
  {
    value: 'FK',
    label: 'Falkland Islands (Malvinas)',
  },
  {
    value: 'FO',
    label: 'Faroe Islands',
  },
  {
    value: 'FJ',
    label: 'Fiji',
  },
  {
    value: 'FI',
    label: 'Finland',
  },
  {
    value: 'FR',
    label: 'France',
  },
  {
    value: 'GF',
    label: 'French Guiana',
  },
  {
    value: 'PF',
    label: 'French Polynesia',
  },
  {
    value: 'TF',
    label: 'French Southern Territories',
  },
  {
    value: 'GA',
    label: 'Gabon',
  },
  {
    value: 'GM',
    label: 'Gambia',
  },
  {
    value: 'GE',
    label: 'Georgia',
  },
  {
    value: 'DE',
    label: 'Germany',
  },
  {
    value: 'GH',
    label: 'Ghana',
  },
  {
    value: 'GI',
    label: 'Gibraltar',
  },
  {
    value: 'GR',
    label: 'Greece',
  },
  {
    value: 'GL',
    label: 'Greenland',
  },
  {
    value: 'GD',
    label: 'Grenada',
  },
  {
    value: 'GP',
    label: 'Guadeloupe',
  },
  {
    value: 'GU',
    label: 'Guam',
  },
  {
    value: 'GT',
    label: 'Guatemala',
  },
  {
    value: 'GG',
    label: 'Guernsey',
  },
  {
    value: 'GN',
    label: 'Guinea',
  },
  {
    value: 'GW',
    label: 'Guinea-Bissau',
  },
  {
    value: 'GY',
    label: 'Guyana',
  },
  {
    value: 'HT',
    label: 'Haiti',
  },
  {
    value: 'HM',
    label: 'Heard Island and McDonald Islands',
  },
  {
    value: 'VA',
    label: 'Holy See (Vatican City State)',
  },
  {
    value: 'HN',
    label: 'Honduras',
  },
  {
    value: 'HK',
    label: 'Hong Kong',
  },
  {
    value: 'HU',
    label: 'Hungary',
  },
  {
    value: 'IS',
    label: 'Iceland',
  },
  {
    value: 'IN',
    label: 'India',
  },
  {
    value: 'ID',
    label: 'Indonesia',
  },
  {
    value: 'IR',
    label: 'Iran, Islamic Republic of',
  },
  {
    value: 'IQ',
    label: 'Iraq',
  },
  {
    value: 'IE',
    label: 'Ireland',
  },
  {
    value: 'IM',
    label: 'Isle of Man',
  },
  {
    value: 'IL',
    label: 'Israel',
  },
  {
    value: 'IT',
    label: 'Italy',
  },
  {
    value: 'JM',
    label: 'Jamaica',
  },
  {
    value: 'JP',
    label: 'Japan',
  },
  {
    value: 'JE',
    label: 'Jersey',
  },
  {
    value: 'JO',
    label: 'Jordan',
  },
  {
    value: 'KZ',
    label: 'Kazakhstan',
  },
  {
    value: 'KE',
    label: 'Kenya',
  },
  {
    value: 'KI',
    label: 'Kiribati',
  },
  {
    value: 'KP',
    label: "Korea, Democratic People's Republic of",
  },
  {
    value: 'KR',
    label: 'Korea, Republic of',
  },
  {
    value: 'KW',
    label: 'Kuwait',
  },
  {
    value: 'KG',
    label: 'Kyrgyzstan',
  },
  {
    value: 'LA',
    label: "Lao People's Democratic Republic",
  },
  {
    value: 'LV',
    label: 'Latvia',
  },
  {
    value: 'LB',
    label: 'Lebanon',
  },
  {
    value: 'LS',
    label: 'Lesotho',
  },
  {
    value: 'LR',
    label: 'Liberia',
  },
  {
    value: 'LY',
    label: 'Libyan Arab Jamahiriya',
  },
  {
    value: 'LI',
    label: 'Liechtenstein',
  },
  {
    value: 'LT',
    label: 'Lithuania',
  },
  {
    value: 'LU',
    label: 'Luxembourg',
  },
  {
    value: 'MO',
    label: 'Macao',
  },
  {
    value: 'MK',
    label: 'Macedonia, The Former Yugoslav Republic of',
  },
  {
    value: 'MG',
    label: 'Madagascar',
  },
  {
    value: 'MW',
    label: 'Malawi',
  },
  {
    value: 'MY',
    label: 'Malaysia',
  },
  {
    value: 'MV',
    label: 'Maldives',
  },
  {
    value: 'ML',
    label: 'Mali',
  },
  {
    value: 'MT',
    label: 'Malta',
  },
  {
    value: 'MH',
    label: 'Marshall Islands',
  },
  {
    value: 'MQ',
    label: 'Martinique',
  },
  {
    value: 'MR',
    label: 'Mauritania',
  },
  {
    value: 'MU',
    label: 'Mauritius',
  },
  {
    value: 'YT',
    label: 'Mayotte',
  },
  {
    value: 'MX',
    label: 'Mexico',
  },
  {
    value: 'FM',
    label: 'Micronesia, Federated States of',
  },
  {
    value: 'MD',
    label: 'Moldova, Republic of',
  },
  {
    value: 'MC',
    label: 'Monaco',
  },
  {
    value: 'MN',
    label: 'Mongolia',
  },
  {
    value: 'ME',
    label: 'Montenegro',
  },
  {
    value: 'MS',
    label: 'Montserrat',
  },
  {
    value: 'MA',
    label: 'Morocco',
  },
  {
    value: 'MZ',
    label: 'Mozambique',
  },
  {
    value: 'MM',
    label: 'Myanmar',
  },
  {
    value: 'NA',
    label: 'Namibia',
  },
  {
    value: 'NR',
    label: 'Nauru',
  },
  {
    value: 'NP',
    label: 'Nepal',
  },
  {
    value: 'NL',
    label: 'Netherlands',
  },
  {
    value: 'NC',
    label: 'New Caledonia',
  },
  {
    value: 'NZ',
    label: 'New Zealand',
  },
  {
    value: 'NI',
    label: 'Nicaragua',
  },
  {
    value: 'NE',
    label: 'Niger',
  },
  {
    value: 'NG',
    label: 'Nigeria',
  },
  {
    value: 'NU',
    label: 'Niue',
  },
  {
    value: 'NF',
    label: 'Norfolk Island',
  },
  {
    value: 'MP',
    label: 'Northern Mariana Islands',
  },
  {
    value: 'NO',
    label: 'Norway',
  },
  {
    value: 'PS',
    label: 'Occupied Palestinian Territory',
  },
  {
    value: 'OM',
    label: 'Oman',
  },
  {
    value: 'PK',
    label: 'Pakistan',
  },
  {
    value: 'PW',
    label: 'Palau',
  },
  {
    value: 'PA',
    label: 'Panama',
  },
  {
    value: 'PG',
    label: 'Papua New Guinea',
  },
  {
    value: 'PY',
    label: 'Paraguay',
  },
  {
    value: 'PE',
    label: 'Peru',
  },
  {
    value: 'PH',
    label: 'Philippines',
  },
  {
    value: 'PN',
    label: 'Pitcairn',
  },
  {
    value: 'PL',
    label: 'Poland',
  },
  {
    value: 'PT',
    label: 'Portugal',
  },
  {
    value: 'PR',
    label: 'Puerto Rico',
  },
  {
    value: 'QA',
    label: 'Qatar',
  },
  {
    value: 'RE',
    label: 'Reunion',
  },
  {
    value: 'RO',
    label: 'Romania',
  },
  {
    value: 'RU',
    label: 'Russian Federation',
  },
  {
    value: 'RW',
    label: 'Rwanda',
  },
  {
    value: 'BL',
    label: 'Saint Barthelemy',
  },
  {
    value: 'SH',
    label: 'Saint Helena, Ascension and Tristan da Cunha',
  },
  {
    value: 'KN',
    label: 'Saint Kitts and Nevis',
  },
  {
    value: 'LC',
    label: 'Saint Lucia',
  },
  {
    value: 'MF',
    label: 'Saint Martin (French part)',
  },
  {
    value: 'PM',
    label: 'Saint Pierre and Miquelon',
  },
  {
    value: 'VC',
    label: 'Saint Vincent and The Grenadines',
  },
  {
    value: 'WS',
    label: 'Samoa',
  },
  {
    value: 'SM',
    label: 'San Marino',
  },
  {
    value: 'ST',
    label: 'Sao Tome and Principe',
  },
  {
    value: 'SA',
    label: 'Saudi Arabia',
  },
  {
    value: 'SN',
    label: 'Senegal',
  },
  {
    value: 'RS',
    label: 'Serbia',
  },
  {
    value: 'SC',
    label: 'Seychelles',
  },
  {
    value: 'SL',
    label: 'Sierra Leone',
  },
  {
    value: 'SG',
    label: 'Singapore',
  },
  {
    value: 'SX',
    label: 'Sint Maarten (Dutch part)',
  },
  {
    value: 'SK',
    label: 'Slovakia',
  },
  {
    value: 'SI',
    label: 'Slovenia',
  },
  {
    value: 'SB',
    label: 'Solomon Islands',
  },
  {
    value: 'SO',
    label: 'Somalia',
  },
  {
    value: 'ZA',
    label: 'South Africa',
  },
  {
    value: 'GS',
    label: 'South Georgia and the South Sandwich Islands',
  },
  {
    value: 'ES',
    label: 'Spain',
  },
  {
    value: 'LK',
    label: 'Sri Lanka',
  },
  {
    value: 'SD',
    label: 'Sudan',
  },
  {
    value: 'SR',
    label: 'Surilabel',
  },
  {
    value: 'SJ',
    label: 'Svalbard and Jan Mayen',
  },
  {
    value: 'SZ',
    label: 'Swaziland',
  },
  {
    value: 'SE',
    label: 'Sweden',
  },
  {
    value: 'CH',
    label: 'Switzerland',
  },
  {
    value: 'SY',
    label: 'Syrian Arab Republic',
  },
  {
    value: 'TW',
    label: 'Taiwan, Province of China',
  },
  {
    value: 'TJ',
    label: 'Tajikistan',
  },
  {
    value: 'TZ',
    label: 'Tanzania, United Republic of',
  },
  {
    value: 'TH',
    label: 'Thailand',
  },
  {
    value: 'TL',
    label: 'Timor-Leste',
  },
  {
    value: 'TG',
    label: 'Togo',
  },
  {
    value: 'TK',
    label: 'Tokelau',
  },
  {
    value: 'TO',
    label: 'Tonga',
  },
  {
    value: 'TT',
    label: 'Trinidad and Tobago',
  },
  {
    value: 'TN',
    label: 'Tunisia',
  },
  {
    value: 'TR',
    label: 'Turkey',
  },
  {
    value: 'TM',
    label: 'Turkmenistan',
  },
  {
    value: 'TC',
    label: 'Turks and Caicos Islands',
  },
  {
    value: 'TV',
    label: 'Tuvalu',
  },
  {
    value: 'UG',
    label: 'Uganda',
  },
  {
    value: 'UA',
    label: 'Ukraine',
  },
  {
    value: 'AE',
    label: 'United Arab Emirates',
  },
  {
    value: 'GB',
    label: 'United Kingdom',
  },
  {
    value: 'US',
    label: 'United States',
  },
  {
    value: 'UM',
    label: 'United States Minor Outlying Islands, the',
  },
  {
    value: 'UY',
    label: 'Uruguay',
  },
  {
    value: 'UZ',
    label: 'Uzbekistan',
  },
  {
    value: 'VU',
    label: 'Vanuatu',
  },
  {
    value: 'VE',
    label: 'Venezuela, Bolivarian Republic of',
  },
  {
    value: 'VN',
    label: 'Viet Nam',
  },
  {
    value: 'VG',
    label: 'Virgin Islands, British',
  },
  {
    value: 'VI',
    label: 'Virgin Islands, U.S.',
  },
  {
    value: 'WF',
    label: 'Wallis and Futuna',
  },
  {
    value: 'EH',
    label: 'Western Sahara',
  },
  {
    value: 'YE',
    label: 'Yemen',
  },
  {
    value: 'ZM',
    label: 'Zambia',
  },
  {
    value: 'ZW',
    label: 'Zimbabwe',
  },
];

export const customMapStatusText = (payment) => {
  const DEFAULT_REJECTED_PAYMENT_STATUSTEXT = {
    text: $localize`:@@upcoming-payments-list-item-badge.rejectedText:Rejected`,
    color: 'danger',
    showOnListView: true,
    shownOnDetailsView: true,
  };
  const reasonCodeMap = {
    [P2P_PAYMENT_TYPE]: {
      [REASON_CODES.pending]: {
        text: $localize`:@@upcoming-payments-list-item-badge.p2p-pending-text:Pending`,
        color: 'warning',
        showOnListView: true,
        shownOnDetailsView: true,
      },
      [REASON_CODES.inProcess]: {
        text: $localize`:@@upcoming-payments-list-item-badge.p2p-inprocess-text:Accepted`,
        longText: $localize`:@@upcoming-payments-list-item-badge.p2p-inprocess-text-long:Accepted by recipient`,
        color: '',
      },
      [REASON_CODES.expired]: {
        text: $localize`:@@upcoming-payments-list-item-badge.p2p-expired-text:Expired`,
        color: 'warning',
        showOnListView: true,
        shownOnDetailsView: true,
      },
      [REASON_CODES.authenticationFailed]: DEFAULT_REJECTED_PAYMENT_STATUSTEXT,
      [REASON_CODES.failed]: DEFAULT_REJECTED_PAYMENT_STATUSTEXT,
      [REASON_CODES.returned]: DEFAULT_REJECTED_PAYMENT_STATUSTEXT,
    },
    [A2A_PAYMENT_TYPE]: {
      [REASON_CODES.pending]: {
        text: $localize`:@@upcoming-payments-list-item-badge.a2a-pending-text:Pending`,
        color: 'warning',
        showOnListView: true,
        shownOnDetailsView: true,
      },
      [REASON_CODES.inProcess]: {
        text: $localize`:@@upcoming-payments-list-item-badge.a2a-inprocess-text:In process`,
        color: '',
      },
      [REASON_CODES.failed]: DEFAULT_REJECTED_PAYMENT_STATUSTEXT,
    },
  };
  switch (payment?.status) {
    case Status.ACCEPTED:
      if (payment?.paymentType && payment?.reasonCode) {
        return reasonCodeMap[payment.paymentType]?.[payment.reasonCode];
      }
      return undefined;
    case Status.REJECTED:
      // if (payment?.paymentType && payment?.reasonCode) {
      //   const statusText = reasonCodeMap[payment.paymentType]?.[payment.reasonCode];
      //   return statusText ? statusText : DEFAULT_REJECTED_PAYMENT_STATUSTEXT;
      // }
      // return undefined;

      return DEFAULT_REJECTED_PAYMENT_STATUSTEXT;
    case Status.CANCELLED:
    case 'CANCELLATION_PENDING':
      return {
        text: $localize`:@@upcoming-payments-list-item-badge.cancelled-text:Cancelled`,
        color: 'secondary',
        showOnListView: true,
        shownOnDetailsView: true,
      };
    case Status.PROCESSED:
      return {
        text: $localize`:@@upcoming-payments-list-item-badge.processed-text:Sent`,
        color: 'success',
        showOnListView: true,
        shownOnDetailsView: true,
      };
    default:
      return undefined;
  }
};
