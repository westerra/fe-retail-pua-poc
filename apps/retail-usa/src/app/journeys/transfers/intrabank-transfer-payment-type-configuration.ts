import { Validators } from '@angular/forms';
import {
  CounterPartyFields,
  DefaultPaymentDates,
  Frequencies,
  InitiatorFields,
  PaymentBaseFields,
  PaymentComponents,
  RemittanceInfoFields,
  ScheduleEndType,
  ScheduleFields,
} from '@backbase/initiate-payment-journey-ang';

import {
  internalTransferOnDestroyHook,
  minValueTwoValidator,
  maxValueTwoHundredValidator,
  scheduleEndDateOnInitHook,
  endDateAfterStartDateValidator,
  scheduleEndTypeToggleDependants,
  scheduleFrequencyToggleDependants,
  scheduleStartDateOnDestroyHook,
  internalTransScheduleStartDateOnInitHook,
  internalTransferScheduleAlertOnInitHook,
  intrabankCheckboxOnInitHook,
  ContactScheme,
} from '@backbase/internal-payments-shared-feature-forms';

const initiator = {
  name: PaymentBaseFields.initiator,
  fields: [
    {
      type: PaymentComponents.header,
      name: PaymentComponents.header,
      options: {
        cssClasses: ['px-3', 'mb-3'],
        heading: $localize`:@@intrabank-config.initiator-label:From`,
        headingType: 'h3',
      },
    },
    {
      type: PaymentComponents.internalAccountSelector,
      name: InitiatorFields.initiatorAccountGroup,
      options: {
        placeholder: $localize`:@@intrabank-config.initiator-placeholder:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--xl'],
        preselect: false,
      },
    },
  ],
};
const counterParty = {
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      type: PaymentComponents.header,
      name: PaymentComponents.header,
      options: {
        cssClasses: ['px-3', 'mb-3'],
        heading: $localize`:@@intrabank-config.beneficiary-label:To`,
        headingType: 'h3',
      },
    },
    {
      name: CounterPartyFields.name,
      type: PaymentComponents.contactSelector,
      options: {
        label: $localize`:@@intrabank-config.beneficiary-contact-label:Recipient’s Name`,
        placeholder: $localize`:@@intrabank-config.beneficiary-contact-placeholder:Select contact or enter new`,
        cssClasses: ['col-md-6'],
        validators: [Validators.required],
        mapItems: (contacts) => contacts.filter(({ accounts }) => !!accounts[0].accountNumber),
        contactSchemes: [{ name: ContactScheme.accountNumber }],
        validationMessages: [
          {
            message: $localize`:@@intrabank-config.beneficiary-invalid-name-message:Please enter a valid name`,
            name: 'pattern',
          },
          {
            name: 'required',
            message: $localize`:@@intrabank-config.beneficiary-required-name-message:Please select a contact or enter a new one manually`,
          },
        ],
      },
    },
    {
      name: CounterPartyFields.accountNumber,
      type: PaymentComponents.text,
      options: {
        validators: [Validators.required],
        label: $localize`:@@intrabank-config.beneficiary-account-number-label:Recipient’s Account Number`,
        placeholder: $localize`:@@intrabank-config.beneficiary-account-number-placeholder:Enter account number`,
        cssClasses: ['col-md-6', 'bb-block', 'bb-block--md'],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@intrabank-config.beneficiary-account-number-required-message:Please enter an account number`,
          },
        ],
      },
    },
    {
      name: CounterPartyFields.saveNewContact,
      type: PaymentComponents.checkbox,
      options: {
        cssClasses: ['col-md-6', 'bb-block', 'bb-block--lg'],
        label: $localize`:@@intrabank-config.new-contact-label:Save to contacts`,
      },
      hooks: {
        onInit: intrabankCheckboxOnInitHook,
      },
    },
  ],
};
const remittanceInfo = {
  name: PaymentBaseFields.remittanceInfo,
  fields: [
    {
      type: PaymentComponents.header,
      name: PaymentComponents.header,
      options: {
        cssClasses: ['col-12', 'pb-0', 'pt-2', 'bb-fieldset__heading'],
        heading: $localize`:@@intrabank-config.remittance-info-heading:Payment Details`,
        headingType: 'h2',
        headingClasses: ['mb-0'],
        separatorLine: true,
      },
    },
    {
      type: PaymentComponents.compactAmount,
      name: RemittanceInfoFields.amountCurrencyGroup,
      options: {
        label: $localize`:@@intrabank-config.amount-label:Amount`,
        cssClasses: ['bb-amount-input__field--large', 'bb-block', 'bb-block--lg', 'col-md-6'],
        currency: 'USD',
        autoDecimal: true,
        keepValueOnHidden: true,
        validationMessages: [
          {
            name: 'invalidAmount',
            message: $localize`:@@intrabank-config.invalid-amount-message:Please add amount of this transfer`,
          },
        ],
      },
    },
    {
      type: PaymentComponents.textarea,
      name: RemittanceInfoFields.description,
      options: {
        label: $localize`:@@intrabank-config.add-memo-label:Add Memo`,
        placeholder: $localize`:@@intrabank-config.add-memo-placeholder:Enter memo`,
        showCharCounter: true,
        minLength: 0,
        rows: 2,
        maxLength: 140,
        helperText: $localize`:@@intrabank-config.add-memo-helper-text: (Optional)`,
        cssClasses: ['col-md-6', 'bb-block', 'bb-block--lg'],
      },
    },
  ],
};
const schedule = {
  name: PaymentBaseFields.schedule,
  fields: [
    {
      type: PaymentComponents.scheduleHeader,
      name: PaymentComponents.scheduleHeader,
      options: {
        cssClasses: ['pb-0', 'bb-schedule-header__relative-text'],
        label: $localize`:@@intrabank-config.schedule-label:Schedule`,
      },
    },
    {
      type: PaymentComponents.alert,
      name: PaymentComponents.alert,
      hidden: true,
      options: {
        cssClasses: ['col-md-12'],
        alerts: {
          undue: {
            title: $localize`:@@intrabank-config.undue-alert-label:A payment executed after the due date will incur a  late fee.`,
            description: $localize`:@@intrabank-config.undue-alert-description:The due date is @@date. A payment made before may improve your credit score.`,
            modifier: 'info',
          },
          overdue: {
            title: $localize`:@@intrabank-config.overdue-alert-label:The due date has passed. This payment will incur a late fee.`,
            description: $localize`:@@intrabank-config.overdue-alert-description:The due date was @@date. Late payments will decrease your credit score.`,
            modifier: 'warning',
          },
        },
      },
      hooks: {
        onInit: internalTransferScheduleAlertOnInitHook,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.startDate,
      options: {
        label: $localize`:@@intrabank-config.transfer-date-label:Transfer Date`,
        cssClasses: ['d-block', 'col-md-6', 'align-top'],
        validators: [Validators.required],
        defaultValue: DefaultPaymentDates.CURRENT_DATE_IN_BANK_TIME,
        validationMessages: [
          {
            name: 'pastDate',
            message: $localize`:@@intrabank-config.past-date-error-message:Start date cannot be in the past`,
          },
        ],
        description: $localize`:@@intrabank-config.transfer-date-description:You selected a date after the due date, this transfer will incur a late fee`,
      },
      hooks: {
        onInit: internalTransScheduleStartDateOnInitHook,
        onDestroy: scheduleStartDateOnDestroyHook,
      },
    },
    {
      type: PaymentComponents.select,
      name: ScheduleFields.frequency,
      options: {
        label: $localize`:@@intrabank-config.frequency-label:Frequency`,
        validators: [Validators.required],
        options: [
          {
            label: $localize`:@@intrabank-config.once-frequency-label:Once`,
            value: Frequencies.ONCE,
          },
          {
            label: $localize`:@@intrabank-config.weekly-frequency-label:Weekly`,
            value: Frequencies.WEEKLY,
          },
          {
            label: $localize`:@@intrabank-config.biweekly-frequency-label:Bi-Weekly`,
            value: Frequencies.BIWEEKLY,
          },
          {
            label: $localize`:@@intrabank-config.monthly-frequency-label:Monthly`,
            value: Frequencies.MONTHLY,
          },
          {
            label: $localize`:@@intrabank-config.quarterly-frequency-label:Quarterly`,
            value: Frequencies.QUARTERLY,
          },
          {
            label: $localize`:@@intrabank-config.annually-frequency-label:Annually`,
            value: Frequencies.YEARLY,
          },
        ],
        defaultValue: Frequencies.ONCE,
        cssClasses: ['d-block', 'col-md-6', 'align-top'],
        dependants: [ScheduleFields.endType],
        activateDependantsOn: scheduleFrequencyToggleDependants,
      },
    },
    {
      type: PaymentComponents.radio,
      name: ScheduleFields.endType,
      options: {
        label: $localize`:@@intrabank-config.end-type-label:End`,
        preselect: true,
        isConditionalMandatory: true,
        cssClasses: ['d-inline-block', 'col-md-2', 'align-top'],
        defaultValue: ScheduleEndType.NEVER,
        options: [
          {
            label: $localize`:@@intrabank-config.never-end-type-label:Never`,
            value: ScheduleEndType.NEVER,
          },
          {
            label: $localize`:@@intrabank-config.after-end-type-label:After`,
            value: ScheduleEndType.AFTER,
          },
        ],
        dependants: [ScheduleFields.endDate, ScheduleFields.repeat],
        activateDependantsOn: scheduleEndTypeToggleDependants,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.endDate,
      options: {
        cssClasses: ['d-inline-block', 'col-md-10', 'align-top', 'bb-schedule__end-date'],
        validators: [endDateAfterStartDateValidator],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@intrabank-config.end-date-required-message:End date is required`,
          },
          {
            name: 'lessThanStartDate',
            message: $localize`:@@intrabank-config.end-date-less-start-date-message:End date cannot be before start date`,
          },
        ],
        isConditionalMandatory: true,
      },
      hooks: {
        onInit: scheduleEndDateOnInitHook,
      },
    },
    {
      type: PaymentComponents.number,
      name: ScheduleFields.repeat,
      options: {
        isConditionalMandatory: true,
        description: $localize`:@@intrabank-config.ocurrences-description:occurrences`,
        min: 2,
        max: 200,
        defaultValue: 2,
        validators: [minValueTwoValidator, maxValueTwoHundredValidator],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@intrabank-config.ocurrences-required-message:Value is required`,
          },
          {
            name: 'min',
            message: $localize`:@@intrabank-config.min-ocurrences-message:Value is below the minimum allowed occurrences (2)`,
          },
          {
            name: 'max',
            message: $localize`:@@intrabank-config.max-ocurrences-message:Value exceeds maximum allowed occurances (200)`,
          },
        ],
        cssClasses: [
          'd-inline-block',
          'col-md-9',
          'align-top',
          'px-0',
          'bb-schedule__repeat',
          'bb-schedule__repeat--two-option',
        ],
      },
    },
  ],
};
export const INTRABANK_TRANSFER = {
  fields: [initiator, counterParty, remittanceInfo, schedule],
  name: $localize`:@@intrabank-config.name:Intrabank Transfer`,
  paymentType: 'INTRABANK_TRANSFER',
  businessFunction: 'A2A Transfer',
  hooks: {
    onDestroy: internalTransferOnDestroyHook,
  },
};
