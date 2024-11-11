/** @internal */
/* eslint-disable max-len */
export const formI18n = {
  unknownErrorHeader: $localize`:@@initiate-payment-unknown-error-header:Server error`,
  unknownError: $localize`:@@initiate-payment-unknown-error:Unknown error occured.`,
  validateFailed: $localize`:@@initiate-payment-validate-failed:Payment data error`,
};
/** @internal */
export const commonI18n = {
  templateSaveFailed: $localize`:@@initiate-payment-save-template-failed-message:Failed to save the template. Please try again.`,
  templateSaveSuccess: (templateName) =>
    $localize`:@@initiate-payment-create-payment-template-success-message:Template "${templateName}" has been saved`,
};
/** @internal */
export const reviewI18n = {
  defaultPayment: {
    submitSuccess: $localize`:@@initiate-payment-submit-success-notification:Payment submitted successfully`,
    submitSuccessPendingApproval: $localize`:@@initiate-payment-submit-success-pendingApproval-notification:Payment is submitted successfully, \
  and pending further approval(s)`,
    editSubmitSuccess: $localize`:@@initiate-payment-edit-submit-success-notification:Edited payment submitted successfully`,
  },
  debitPayment: {
    submitSuccess: $localize`:@@initiate-debit-submit-success-notification:Debit request submitted successfully`,
    submitSuccessPendingApproval: $localize`:@@initiate-debit-submit-success-pendingApproval-notification:Debit request is submitted successfully, and pending further approval(s)`,
    editSubmitSuccess: $localize`:@@initiate-debit-edit-submit-success-notification:Edited debit request submitted successfully`,
  },
  paymentSubmitSuccess: $localize`:@@initiate-payment-submit-success-notification:Payment submitted successfully`,
  editPaymentSubmitSuccess: $localize`:@@initiate-payment-edit-submit-success-notification:Edited payment submitted successfully`,
  paymentSubmitSuccessPendingApproval: $localize`:@@initiate-payment-submit-success-pendingApproval-notification:Payment is submitted successfully, \
  and pending further approval(s)`,
  newContactSubmitSuccess: $localize`:@@initiate-payment-newContact-submit-success-notification:Contact saved successfully`,
  newContactSubmitFailure: $localize`:@@initiate-payment-newContact-submit-failure-notification:Failed to save contact. Please try again later.`,
  newContactSubmitSuccessPendingApproval: $localize`:@@initiate-payment-newContact-submit-success-pendingApproval-notification:Contact submitted successfully, \
  and pending further approval(s)`,
  submitPaymentFailure: $localize`:@@initiate-payment-submit-failure-notification:Payment data error`,
  debitSubmitSuccess: $localize`:@@initiate-debit-submit-success-notification:Debit request submitted successfully`,
  editdebitSubmitSuccess: $localize`:@@initiate-debit-edit-submit-success-notification:Edited debit request submitted successfully`,
  debitSubmitSuccessPendingApproval: $localize`:@@initiate-debit-submit-success-pendingApproval-notification:Debit request is submitted successfully, and pending further approval(s)`,
  submitDebitFailure: $localize`:@@initiate-debit-submit-failure-notification:Debit request data error`,
  submitPaymentFailureUnknownError: $localize`:@@initiate-payment-submit-unknown-failure-notification:Unknown error occurred.`,
  submitPaymentFailureUnknownErrorHeader: $localize`:@@initiate-payment-submit-unknown-failure-header-notification:Server error`,
  submitPaymentApprovalFailureCOED: {
    header: $localize`:@@edited-payment-submit-ts-failure-header-notification:Payment not submitted`,
    message: $localize`:@@edited-payment-submit-ts-failure-message-notification:Payment is already edited by another user`,
  },
};
