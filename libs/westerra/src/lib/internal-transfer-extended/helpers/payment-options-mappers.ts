import { SchemeName } from '@backbase/payment-order-options-http-ang';
import {
  CounterPartyFields,
  getConfig,
  getCounterpartySchemeName,
  PaymentBaseFields,
} from '@backbase/internal-payments-shared-feature-forms';
import { stripSpaces, isAddressTruthy } from '@backbase/internal-payments-shared-util';
import { PaymentTypes } from '../constants/initiate-payment.const';
/** @internal */
export const mapPaymentOptionRequest = (formItem, clientServiceAgreementID = '', clientJurisdiction = '') => {
  const { creditorBank } = formItem.counterparty;
  const counterpartyCountry = creditorBank && creditorBank.postalAddress && creditorBank.postalAddress.country;
  const bankBranchCode = creditorBank && creditorBank.bankBranchCode;
  const creditorScheme = getCounterpartySchemeName(formItem);
  return {
    ...(clientServiceAgreementID ? { clientServiceAgreementID } : null),
    ...(clientJurisdiction ? { clientJurisdiction } : null),
    originatorAccount: {
      identification: formItem.initiator.id,
      schemeName: SchemeName.ID,
    },
    counterpartyAccount: {
      ...(bankBranchCode ? { bankBranchCode } : null),
      identification:
        creditorScheme === SchemeName.ID
          ? stripSpaces(formItem.counterparty.id)
          : stripSpaces(formItem.counterparty.accountNumber),
      schemeName: creditorScheme,
    },
    requestedExecutionDate: new Date().toISOString().substring(0, 10),
    instructedAmount: {
      amount: formItem.remittanceInfo.amountGroup.amount,
      currencyCode: formItem.remittanceInfo.amountGroup.currency,
    },
    ...(counterpartyCountry ? { counterpartyCountry } : null),
    additions: formItem.additions,
  };
};
/** @internal */
export function normalizePaymentType(selectedPaymentItem) {
  let _selectedPayment = selectedPaymentItem?.details.paymentType;
  if (
    _selectedPayment === `${PaymentTypes.SEPA_PREFIX}${PaymentTypes.CLOSED_POSTFIX}` ||
    _selectedPayment === `${PaymentTypes.SEPA_PREFIX}${PaymentTypes.ILE_POSTFIX}`
  ) {
    _selectedPayment = _selectedPayment.replace(PaymentTypes.SEPA_PREFIX, PaymentTypes.SEPA);
  }
  let replacedPayment;
  if (_selectedPayment) {
    if (_selectedPayment.endsWith(PaymentTypes.ILE_POSTFIX)) {
      replacedPayment = _selectedPayment.replace(PaymentTypes.ILE_POSTFIX, '');
    } else if (_selectedPayment.endsWith(PaymentTypes.CLOSED_POSTFIX)) {
      replacedPayment = _selectedPayment.replace(PaymentTypes.CLOSED_POSTFIX, '');
    } else {
      replacedPayment = _selectedPayment;
    }
  }
  return replacedPayment;
}
/** @internal */
export function normalisePaymentTemplate(paymentTemplate) {
  return {
    ...paymentTemplate,
    details: {
      ...paymentTemplate.details,
      paymentType: normalizePaymentType(paymentTemplate),
    },
  };
}
/**
 * Reset beneficiary address if the form contains address details but the selected config does not contain address config.
 */
/** @internal */
export function resetBeneficiaryAddress(paymentTypeConfig, form) {
  const counterPartyConfig: any = getConfig(PaymentBaseFields.counterparty, paymentTypeConfig);
  const beneficiaryAddress = getConfig(CounterPartyFields.postalAddress, counterPartyConfig);
  const beneficiaryAddressGroup = form.get([PaymentBaseFields.counterparty, CounterPartyFields.postalAddress]);
  if (!beneficiaryAddress && beneficiaryAddressGroup && isAddressTruthy(beneficiaryAddressGroup.value)) {
    beneficiaryAddressGroup.reset();
  }
}
/**
 * Reset bank details if the form contains bank details but the selected config does not contain specific bank detail config.
 */
/** @internal */
export function resetBankDetails(paymentTypeConfig, form) {
  const counterPartyConfig: any = getConfig(PaymentBaseFields.counterparty, paymentTypeConfig);
  const beneficiaryBankConfig: any = getConfig(CounterPartyFields.creditorBank, counterPartyConfig);
  const beneficiaryBankAddress = beneficiaryBankConfig
    ? getConfig(CounterPartyFields.postalAddress, beneficiaryBankConfig)
    : null;
  const beneficiaryBankAddressGroup = form.get([
    PaymentBaseFields.counterparty,
    CounterPartyFields.creditorBank,
    CounterPartyFields.postalAddress,
  ]);
  resetBankField(CounterPartyFields.bic, counterPartyConfig, form);
  resetBankField(CounterPartyFields.bankName, counterPartyConfig, form);
  if (!beneficiaryBankAddress && beneficiaryBankAddressGroup && isAddressTruthy(beneficiaryBankAddressGroup.value)) {
    for (const key in beneficiaryBankAddressGroup.controls) {
      if (key !== 'country') {
        beneficiaryBankAddressGroup.controls[key].reset();
      }
    }
  }
}
/** @internal */
export function resetBankField(fieldName, counterpartyConfig, form) {
  const config = getConfig(fieldName, counterpartyConfig);
  const control = form.get([PaymentBaseFields.counterparty, CounterPartyFields.creditorBank, fieldName]);
  if (!config && control?.value) {
    control.reset();
  }
}
