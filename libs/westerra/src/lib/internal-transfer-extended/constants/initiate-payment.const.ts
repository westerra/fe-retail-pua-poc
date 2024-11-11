import { Validators } from '@angular/forms';
import { InjectionToken } from '@angular/core';
import {
  CounterPartyFields,
  defaultInitiatorConfig,
  PaymentBaseFields,
  PaymentComponents,
  RemittanceInfoFields,
  sanctionedCountryValidator,
} from '@backbase/internal-payments-shared-feature-forms';
/** @internal */
export const counterPartyConfig = {
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      name: PaymentComponents.beneficiaryGroupHeader,
      type: PaymentComponents.beneficiaryGroupHeader,
      options: {
        label: $localize`:@@initiate-payment-base-fields.beneficiary-header-title:To`,
        hasDynamicTitle: true,
      },
    },
    {
      name: CounterPartyFields.name,
      type: PaymentComponents.beneficiarySelector,
      options: {
        label: $localize`:@@initiate-payment-base-fields.beneficiary-selector-label:Beneficiary's name`,
        placeholder: $localize`:@@initiate-payment-base-fields.beneficiary-selector-placeholder:Select a beneficiary`,
        saveNewContactLabel: $localize`:@@initiate-payment-base-fields.beneficiary-selector-new-contact-label:Save as a new contact`,
        isWizardMode: true,
        retainBankCountry: true,
        cssClasses: ['col-12'],
        dependants: [CounterPartyFields.country, CounterPartyFields.bankBranchCode, CounterPartyFields.accountNumber],
        validationMessages: [
          {
            message: $localize`:@@initiate-payment-base-fields.same-accounts-error:Beneficiary is same as selected Debit account`,
            name: 'sameDebitCreditAccountsSelected',
          },
        ],
      },
    },
    {
      name: CounterPartyFields.country,
      type: PaymentComponents.sanctionedCountrySelector,
      options: {
        validators: [Validators.required, sanctionedCountryValidator],
        label: $localize`:@@initiate-payment-base-fields.country.label:Country`,
        placeholder: $localize`:@@initiate-payment-base-fields.country-placeholder:- select a country -`,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        mapToField: `${PaymentBaseFields.counterparty}.${CounterPartyFields.creditorBank}.${CounterPartyFields.postalAddress}`,
        validationMessages: [
          {
            name: 'notSanctioned',
            message: $localize`:@@initiate-payment-base-fields.country.error.not-sanctioned:Payments to this country are not supported`,
          },
        ],
      },
    },
    {
      name: CounterPartyFields.accountNumber,
      type: PaymentComponents.text,
      options: {
        validators: [Validators.required, Validators.minLength(6)],
        maxLength: 36,
        label: $localize`:@@initiate-payment-base-fields.acc-no-label:Account number or IBAN`,
        validationMessages: [
          {
            name: 'minlength',
            message: $localize`:@@initiate-payment-base-fields.acc-no-min-length-error:Account number should have minimum 6 characters`,
          },
          {
            message: $localize`:@@initiate-payment-base-fields.iban-country-error-message:Invalid IBAN`,
            name: 'invalidIbanCountry',
          },
        ],
        cssClasses: ['d-inline-block', 'col-md-6'],
      },
    },
    {
      name: CounterPartyFields.bankBranchCode,
      type: PaymentComponents.text,
      options: {
        label: $localize`:@@initiate-payment-base-fields.bank-branch-code-label:Sort code`,
        maxLength: 20,
        cssClasses: ['d-inline-block', 'col-md-6', 'align-top'],
        mapToField: `${PaymentBaseFields.counterparty}.${CounterPartyFields.creditorBank}`,
      },
    },
  ],
};
/** @internal */
export const BaseFields = [
  defaultInitiatorConfig,
  {
    name: PaymentBaseFields.remittanceInfo,
    title: $localize`:@@initiate-payment-base-fields.remittance-group-title:Payment details`,
    fields: [
      {
        type: PaymentComponents.sanctionedCurrencyAmount,
        name: RemittanceInfoFields.amountCurrencyGroup,
        options: {
          cssClasses: ['col-12'],
          label: $localize`:@@initiate-payment-base-fields.amount-title:Amount`,
          validationMessages: [
            {
              message: $localize`:@@initiate-payment-base-fields.amount-error:Enter amount`,
              name: 'invalidAmount',
            },
            {
              message: $localize`:@@initiate-payment-base-fields.currency-error:Selected country does not allow payments in this currency`,
              name: 'invalidCurrency',
            },
          ],
        },
      },
    ],
  },
  counterPartyConfig,
];
/** @internal */
export const PaymentTypes = {
  ILE_POSTFIX: '_ILE',
  CLOSED_POSTFIX: '_CLOSED',
  SEPA_PREFIX: 'SEPA_CT',
  SEPA: 'SEPA_CREDIT_TRANSFER',
};
/** @internal */
export const BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN = new InjectionToken('BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN');
/** @internal */
export const payordMessagesDefaults = {
  errorData: [
    {
      key: 'arrangements.api.invalid.iban',
      message: 'Entered IBAN is invalid',
    },
  ],
};
/** @internal */
export const PayordPaymentErrorsConfigProvider = [
  {
    provide: BB_PAYORD_PAYMENT_ERROR_MESSAGES_TOKEN,
    useValue: payordMessagesDefaults,
  },
];
/** @internal */
export const BB_PAYORD_OMNI_PAYMENT_CONFIG_TOKEN = new InjectionToken('BB_PAYORD_OMNI_PAYMENT_CONFIG_TOKEN');
/** @internal */
export const payordOmniPaymentDefaults = {
  businessConfig: {
    functionName: 'Payment Templates',
    resourceName: 'Payments',
  },
};
/** @internal */
export const PayordOmniPaymentConfigProvider = [
  {
    provide: BB_PAYORD_OMNI_PAYMENT_CONFIG_TOKEN,
    useValue: payordOmniPaymentDefaults,
  },
];
