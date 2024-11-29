import '@angular/localize/init';
import { Validators } from '@angular/forms';
import { A2ALimitErrorKeys, 
  AccountBalances, 
  DefaultPaymentDates, 
  Frequencies, 
  internalTransferEndTypeOnInitHook, 
  internalTransferOnDestroyHook, 
  internalTransferRepeatOnInitHook, 
  internalTransferScheduleAlertOnInitHook, 
  internalTransferScheduleFreqOnInitHook, 
  internalTransScheduleStartDateOnInitHook, 
  maxValueTwoHundredValidator, 
  minValueTwoValidator, 
  scheduleEndDateOnInitHook, 
  ScheduleEndType, 
  scheduleEndTypeToggleDependants, 
  scheduleFrequencyToggleDependants, 
  scheduleStartDateOnDestroyHook,
  endDateValidator
} from '@backbase/internal-payments-shared-util';
import {
  A2A_INVALID_DATE_ERROR_KEY,
  CounterPartyFields,
  InitiatorFields,
  PaymentBaseFields,
  PaymentComponents,
  ProductKinds,
  RemittanceInfoFields,
  ScheduleFields,
} from '@backbase/initiate-payment-journey-ang';
import { CreditDebitIndicator } from '@backbase/transactions-http-ang';
import { PaymentCardNumberFormat } from '@backbase/ui-ang/payment-card-number-pipe';

const numbersFormat: PaymentCardNumberFormat = { length: 0, segments: 4, maskRange: [0, 0] };

const initiator = {
  name: PaymentBaseFields.initiator,
  fields: [
    {
      type: PaymentComponents.internalAccountSelector,
      name: InitiatorFields.initiatorAccountGroup,
      options: {
        label: $localize`:@@internal-config.initiator-label:From`,
        placeholder: $localize`:@@internal-config.initiator-placeholder:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--lg'],
        productKinds: [
          {
            productKind: ProductKinds.savingsAccount,
            balance: {
              apiField: AccountBalances.available,
              label: $localize`:@@internal-config.available-balance-label:Available Balance`,
            },
          },
          {
            productKind: ProductKinds.currentAccount,
            balance: {
              apiField: AccountBalances.current,
              label: $localize`:@@internal-config.current-balance-label:Current Balance`,
            },
          },
          {
            productKind: ProductKinds.creditCard,
            balance: {
              apiField: AccountBalances.available,
              label: $localize`:@@internal-config.available-balance-label:Available Balance`,
            },
          },
          {
            productKind: ProductKinds.loanAccount,
            balance: {
              apiField: AccountBalances.available,
              label: $localize`:@@internal-config.available-balance-label:Available Balance`,
            },
          },
          {
            productKind: CreditDebitIndicator.Dbit ? ProductKinds.loanAccount : '',
            balance: {
              label: $localize`:@@internal-config.beneficiary.loan-balance-label:Available Balance`,
              apiField: AccountBalances.available,
            },
          },
        ],
        mapItems: (accounts) => accounts.filter((account) => ['EUR', 'AED', 'USD'].includes(account?.currency || '')),
        connectedAccounts: true,
        connectedAccountsSubHeader: $localize`:@@internal-config.initiator-subheader:Connected Accounts`,
        preselect: false,
      },
    },
  ],
};
const counterParty = (useShortCurrency: boolean) => ({
  name: PaymentBaseFields.counterparty,
  fields: [
    {
      type: PaymentComponents.internalAccountSelector,
      name: CounterPartyFields.counterPartyAccountGroup,
      options: {
        label: $localize`:@@internal-config.beneficiary-label:To`,
        placeholder: $localize`:@@internal-config.beneficiary-placeholder:Select an account`,
        cssClasses: ['col-12', 'bb-block', 'bb-block--lg'],
        productKinds: [
          {
            productKind: ProductKinds.savingsAccount,
            balance: {
              apiField: AccountBalances.available,
              label: $localize`:@@internal-config.beneficiary.available-balance-label:Available Balance`,
            },
          },
          {
            productKind: ProductKinds.currentAccount,
            balance: {
              apiField: AccountBalances.current,
              label: $localize`:@@internal-config.beneficiary.current-balance-label:Current Balance`,
            },
          },
          {
            productKind: ProductKinds.loanAccount,
            balance: {
              label: $localize`:@@internal-config.beneficiary.loan-balance-label:Current Balance`,
            },
          },
          {
            productKind: ProductKinds.creditCard,
            balance: {
              apiField: AccountBalances.current,
              label: $localize`:@@internal-config.beneficiary.current-balance-label:Current Balance`,
            },
          },
        ],
        mapItems: (accounts) => accounts.filter((account) => ['EUR', 'AED', 'USD'].includes(account?.currency || '')),
        connectedAccountsSubHeader: $localize`:@@internal-config.beneficiary-subheader:Connected Accounts`,
        connectedAccounts: true,

        // Commenting out unwanted settings - To be used later
        // dependants: [
        //   {
        //     parent: PaymentBaseFields.remittanceInfo,
        //     items: [
        //       RemittanceInfoFields.description,
        //       RemittanceInfoFields.amountCurrencyGroup,
        //       RemittanceInfoFields.amountOptions,
        //     ],
        //   },
        // ],
        // activateDependantsOn: (value, control) =>
        //   toggleForAmountOptions(value, control, remittanceInfo.fields[1]?.options?.amountOptions),

        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@internal-config.beneficiary.account-required-message:Please select an account from the list to transfer to`,
          },
        ],

        // Commenting out unwanted settings - To be used later
        // showCurrencySymbol: useShortCurrency,
        // productNumberFormat: numbersFormat,
      },
    },
  ],
});

// Commenting out unwanted settings - To be used later
// const scheduleFrequencyForAmountOption = [
//   {
//     label: $localize`:@@internal-config.once-frequency-label:Once`,
//     value: Frequencies.ONCE,
//   },
//   {
//     label: $localize`:@@internal-config.monthly-frequency-label:Monthly`,
//     value: Frequencies.MONTHLY,
//   },
// ];

const remittanceInfo = {
  name: PaymentBaseFields.remittanceInfo,
  fields: [
    {
      type: PaymentComponents.header,
      name: PaymentComponents.header,
      options: {
        cssClasses: ['col-12', 'pb-0', 'pt-2', 'bb-fieldset__heading'],
        heading: $localize`:@@internal-config.remittance-info-heading:Payment Details `,
        headingType: 'h2',
        headingClasses: ['mb-0'],
        separatorLine: true,
      },
    },

    // Commenting out unwanted settings - To be used later
    // {
    //   type: PaymentComponents.internalAmountOptions,
    //   name: RemittanceInfoFields.amountOptions,
    //   hidden: true,
    //   options: {
    //     cssClasses: ['col-12', 'pb-0'],
    //     isConditionalMandatory: true,
    //     noBalanceText: $localize`:@@internal-config.no-balance-text:You don’t have any amount due on this credit card account.`,
    //     amountInputClassName: 'bb-amount-input__field--large',
    //     autoDecimal: true,
    //     amountOptions: {
    //       cssClasses: ['pl-2'],
    //       creditCard: [
    //         {
    //           label: $localize`:@@internal-config.remittance-current-balance-label:Current balance`,
    //           description: $localize`:@@internal-config.remittance-current-balance-description:The balance plus any activity since the latest billing cycle`,
    //           amountApiField: 'bookedBalance',
    //           scheduleFrequency: scheduleFrequencyForAmountOption,
    //           showFrequencySwitch: true,
    //         },
    //         {
    //           label: $localize`:@@internal-config.min-payment-label:Minimum payment due`,
    //           description: $localize`:@@internal-config.min-payment-description:5% of the outstanding balance`,
    //           amountApiField: 'minimumPayment',
    //           scheduleFrequency: scheduleFrequencyForAmountOption,
    //           showFrequencySwitch: true,
    //         },
    //         {
    //           label: $localize`:@@internal-config.other-amount-label:Other amount`,
    //           description: $localize`:@@internal-config.other-amount-description:Enter amount manually`,
    //           hasCustomAmountInput: true,
    //           scheduleFrequency: scheduleFrequencyForAmountOption,
    //           showFrequencySwitch: true,
    //         },
    //       ],
    //       loan: [
    //         {
    //           label: $localize`:@@internal-config.loan.full-amount-label:Full amount`,
    //           description: $localize`:@@internal-config.loan.full-amount-description:The principal plus interests of the loan`,
    //           amountApiField: 'bookedBalance',
    //           scheduleFrequency: scheduleFrequencyForAmountOption,
    //         },
    //         {
    //           label: $localize`:@@internal-config.loan.other-amount-label:Other amount`,
    //           description: $localize`:@@internal-config.loan.other-amount-description:Enter amount manually`,
    //           hasCustomAmountInput: true,
    //           scheduleFrequency: scheduleFrequencyForAmountOption,
    //           showFrequencySwitch: true,
    //         },
    //       ],
    //     },
    //     validationMessages: [
    //       {
    //         name: 'invalidAmount',
    //         message: $localize`:@@internal-config.invalid-amount-message:Please select an amount to transfer`,
    //       },
    //       {
    //         name: 'required',
    //         message: $localize`:@@internal-config.required-amount-message:Please add amount of this transfer`,
    //       },
    //     ],
    //     dependants: [
    //       {
    //         parent: PaymentBaseFields.schedule,
    //         items: [ScheduleFields.frequency, ScheduleFields.frequencySwitch],
    //       },
    //     ],
    //     keepDependantsOnHide: true,
    //     activateDependantsOn: internalTransAmountOptToggleDependants,
    //   },
    // },
    {
      type: PaymentComponents.compactAmount,
      name: RemittanceInfoFields.amountCurrencyGroup,
      options: {
        label: 'Amount',
        cssClasses: ['bb-amount-input__field--large', 'bb-block', 'bb-block--lg', 'col-md-6'],
        currency: 'USD',
        autoDecimal: true,
        keepValueOnHidden: true,
        validationMessages: [
          {
            name: 'invalidAmount',
            message: $localize`:@@internal-config.invalid.compact-amount-message:Please add amount of this transfer`,
          },
          {
            name: A2ALimitErrorKeys.maxIncomingLimit,
            message: $localize`:@@internal-config.a2a-incoming-limit-error-message:This amount can't be higher than #amount#. Please enter a lower amount`,
          },
          {
            name: A2ALimitErrorKeys.maxOutGoingLimit,
            message: $localize`:@@internal-config.a2a-outgoing-limit-error-message:This amount can't be higher than #amount#. Please enter a lower amount`,
          },
          {
            name: A2ALimitErrorKeys.minLimit,
            message: $localize`:@@internal-config.a2a-min-limit-error-message:This amount can't be lower than #amount#. Please enter a higher amount`,
          },
        ],
      },
    },
    {
      type: PaymentComponents.textarea,
      name: RemittanceInfoFields.description,
      options: {
        label: $localize`:@@internal-config.add-memo-label:Note`,
        placeholder: $localize`:@@internal-config.add-memo-placeholder:Enter note`,
        showCharCounter: true,
        minLength: 0,
        rows: 2,
        maxLength: 140,
        helperText: $localize`:@@internal-config.add-memo-helper-text: (Optional)`,
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
        label: $localize`:@@internal-config.schedule-label:Schedule`,
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
            title: $localize`:@@internal-config.undue-alert-label:A payment executed after the due date will incur a  late fee.`,
            description: $localize`:@@internal-config.undue-alert-description:The due date is @@date. A payment made before may improve your credit score.`,
            modifier: 'info',
          },
          overdue: {
            title: $localize`:@@internal-config.overdue-alert-label:The due date has passed. This payment will incur a late fee.`,
            description: $localize`:@@internal-config.overdue-alert-description:The due date was @@date. Late payments will decrease your credit score.`,
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
        // label: $localize`:@@internal-config.transfer-date-label:Transfer date`,
        label: $localize`:@@repay-modal.delivery.execution-date.title:Execution date`,
        cssClasses: ['d-block', 'col-md-6', 'align-top'],
        validators: [Validators.required],
        defaultValue: DefaultPaymentDates.CURRENT_DATE_IN_BANK_TIME,
        validationMessages: [
          {
            name: 'pastDate',
            message: $localize`:@@internal-config.past-date-error-message:Start date cannot be in the past`,
          },
          {
            name: A2A_INVALID_DATE_ERROR_KEY,
            message: $localize`:@@internal-config.invalid-date-error-from-server:You can’t make a transfer on a weekend or holiday`,
          },
        ],
        description: $localize`:@@internal-config.transfer-date-description:You selected a date after the due date, this transfer will incur a late fee`,
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
        label: $localize`:@@internal-config.frequency-label:Frequency`,
        validators: [Validators.required],
        options: [
          {
            label: $localize`:@@internal-config.once-frequency-label:Once`,
            value: Frequencies.ONCE,
          },
          {
            label: $localize`:@@internal-config.daily-frequency-label:Daily`,
            value: Frequencies.DAILY,
          },
          {
            label: $localize`:@@internal-config.weekly-frequency-label:Weekly`,
            value: Frequencies.WEEKLY,
          },
          {
            label: $localize`:@@internal-config.biweekly-frequency-label:Bi-Weekly`,
            value: Frequencies.BIWEEKLY,
          },
          {
            label: $localize`:@@internal-config.monthly-frequency-label:Monthly`,
            value: Frequencies.MONTHLY,
          },
          {
            label: $localize`:@@internal-config.quarterly-frequency-label:Quarterly`,
            value: Frequencies.QUARTERLY,
          },
          {
            label: $localize`:@@internal-config.annually-frequency-label:Annually`,
            value: Frequencies.YEARLY,
          },
        ],
        defaultValue: Frequencies.ONCE,
        cssClasses: ['d-block', 'col-md-6', 'align-top'],
        dependants: [ScheduleFields.endType],
        activateDependantsOn: scheduleFrequencyToggleDependants,
      },
      hooks: {
        onInit: internalTransferScheduleFreqOnInitHook,
      },
    },
    {
      type: PaymentComponents.radio,
      name: ScheduleFields.endType,
      options: {
        label: $localize`:@@internal-config.end-type-label:End`,
        preselect: false,
        isConditionalMandatory: true,
        cssClasses: ['d-inline-block', 'col-md-2', 'align-top', 'bb-schedule__end-type'],
        defaultValue: ScheduleEndType.NEVER,
        options: [
          {
            label: $localize`:@@internal-config.never-end-type-label:Never`,
            value: ScheduleEndType.NEVER,
          },
          {
            label: $localize`:@@internal-config.on-date-end-type-label:On date`,
            value: ScheduleEndType.ON,
          },
          {
            label: $localize`:@@internal-config.after-end-type-label:After`,
            value: ScheduleEndType.AFTER,
          },
        ],
        dependants: [ScheduleFields.endDate, ScheduleFields.repeat],
        activateDependantsOn: scheduleEndTypeToggleDependants,
      },
      hooks: {
        onInit: internalTransferEndTypeOnInitHook,
      },
    },
    {
      type: PaymentComponents.date,
      name: ScheduleFields.endDate,
      options: {
        cssClasses: ['d-inline-block', 'col-md-10', 'align-top', 'bb-schedule__end-date'],
        validators: [endDateValidator],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@internal-config.end-date-required-message:End date is required`,
          },
          {
            name: 'lessThanStartDate',
            message: $localize`:@@internal-config.end-date-less-start-date-message:End date cannot be before start date`,
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
        description: $localize`:@@internal-config.ocurrences-description:occurrences`,
        min: 2,
        max: 200,
        defaultValue: 2,
        validators: [minValueTwoValidator, maxValueTwoHundredValidator],
        validationMessages: [
          {
            name: 'required',
            message: $localize`:@@internal-config.ocurrences-required-message:Value is required`,
          },
          {
            name: 'min',
            message: $localize`:@@internal-config.min-ocurrences-message:Value is below the minimum allowed occurrences (2)`,
          },
          {
            name: 'max',
            message: $localize`:@@internal-config.max-ocurrences-message:Value exceeds maximum allowed occurances (200)`,
          },
        ],
        cssClasses: ['d-inline-block', 'col-md-9', 'align-top', 'px-0', 'bb-schedule__repeat'],
      },
      hooks: {
        onInit: internalTransferRepeatOnInitHook,
      },
    },
    {
      type: PaymentComponents.scheduleSwitch,
      name: ScheduleFields.frequencySwitch,
      hidden: true,
      options: {
        cssClasses: ['col-12', 'mb-0', 'mt-4'],
        label: $localize`:@@internal-config.auto-payments-label:Automatic monthly payments`,
        // eslint-disable-next-line max-len
        tooltipMessage: $localize`:@@internal-config.auto-payments-tooltip-message:The amount selected will be automatically paid every month. This amount may change over time.`,
        // eslint-disable-next-line max-len
        description: $localize`:@@internal-config.auto-payments-description:If the execution date falls on a weekend or holiday, we’ll make the payment on the previous business day.`,
        values: {
          on: Frequencies.MONTHLY,
          off: Frequencies.ONCE,
        },
        defaultValue: false,
      },
    },
  ],
};

// Setting a variable with counter party values
const receiver = counterParty(false);

export const INTERNAL_TRANSFER = {
  fields: [initiator, receiver, remittanceInfo, schedule],
  name: $localize`:@@internal-config.name:Internal Transfer`,
  paymentType: 'INTERNAL_TRANSFER',
  businessFunction: 'A2A Transfer',
  options: {
    paymentTypes: {
      internal: 'INTERNAL_TRANSFER',
      external: 'EXTERNAL_A2A',
    },
    disabledCombinations: [
      // { from: ProductKinds.loanAccount, to: ProductKinds.loanAccount },
      // { from: ProductKinds.creditCard, to: ProductKinds.creditCard },
    ],
  },
  hooks: {
    onDestroy: internalTransferOnDestroyHook,
  },
};
