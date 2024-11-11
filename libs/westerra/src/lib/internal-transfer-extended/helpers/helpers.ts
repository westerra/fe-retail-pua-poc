import { InitiatePaymentHeaderStates, normalizePaymentType } from '@backbase/internal-payments-shared-feature-forms';
/** @internal */
export function getPaymentTypeTitle(paymentType) {
  switch (normalizePaymentType(paymentType)) {
    case 'SEPA_CREDIT_TRANSFER':
    case 'SEPA_CT':
    case 'SEPA':
      return $localize`:@@initiate-payment.payment-title.payment-type-sepa:SEPA`;
    case 'ACH_DEBIT':
    case 'ACH_CREDIT':
    case 'US_ACH_CREDIT':
    case 'CUSTOM_ACH_CREDIT':
      return $localize`:@@initiate-payment.payment-title.payment-type-ach:ACH`;
    case 'US_DOMESTIC_WIRE':
      return $localize`:@@initiate-payment.payment-title.payment-type-wire:Wire`;
    case 'INTERNAL_TRANSFER':
    case 'INTERNAL_TRANSFER_BUSINESS':
    case 'INTRABANK_TRANSFER':
      return $localize`:@@initiate-payment.payment-title.payment-type-internal:Internal`;
    case 'INTERNATIONAL_TRANSFER':
      return $localize`:@@initiate-payment.payment-title.payment-type-international-wire:International Wire`;
    case 'P2P_TRANSFER':
      return $localize`:@@initiate-payment.payment-title.payment-type-p2p:P2P`;
  }
  return $localize`:@@initiate-payment.payment-title.payment-type-default:`;
}
/** @internal */
export function defaultHeaderSetup({ paymentType, paymentMode, state, isDebit }) {
  const payment = isDebit ? $localize`:@@initiate-payment.payment-title.debit: Debit` : '';
  let title = `${getPaymentTypeTitle(paymentType)}${payment}`;
  if (paymentMode?.includes('EDIT')) {
    title = $localize`:@@initiate-payment.payment-title.edit-mode:Edit ${title}`;
  } else {
    title = $localize`:@@initiate-payment.payment-title.new-mode:New ${title}`;
  }
  if (paymentMode?.includes('TEMPLATE')) {
    title = $localize`:@@initiate-payment.payment-title.template:${title} Template`;
  } else if (!isDebit) {
    title = $localize`:@@initiate-payment.payment-title.payment:${title} Payment`;
  }
  if (state === InitiatePaymentHeaderStates.REVIEW) {
    title = $localize`:@@initiate-payment.payment-title.review-state:${title} - Review`;
  } else if (state === InitiatePaymentHeaderStates.SUBMITTED) {
    title = $localize`:@@initiate-payment.payment-title.submitted-state:${title} - Submitted`;
  }
  return title;
}
