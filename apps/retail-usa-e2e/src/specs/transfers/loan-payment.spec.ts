import { test, LoginState, expect, addOneMonthToDate, getFormattedDateString } from '@backbase/retail-e2e';

export enum AmountOptions {
  PaymentDue = 'Payment Due',
  PayoffAmount = 'Payoff Amount',
  PastDueBalance = 'Past Due Balance',
  DifferentAmount = 'Different amount',
}

/**
 * This test suites are written against mock-server and will be modified after retail-e2e road map is defined
 */
test.describe('Make retail loan payment', () => {
  test('User should be able to successfully make a transfer', async ({ loanPaymentPage }) => {
    await expect(loanPaymentPage.journeyUI).toBeVisible();
    await expect(loanPaymentPage.pageTitle).toHaveText('Repay Loan');
    await loanPaymentPage.verifyFormFields();
    await loanPaymentPage.selectAmountOption(AmountOptions.PaymentDue);
    const reviewTransferPage = await loanPaymentPage.submitForm();
    await reviewTransferPage.verifyTransferDetails('200');
    await reviewTransferPage.confirmTransfer();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
  test('User should be able to enter different amount and schedule transfer', async ({ loanPaymentPage }) => {
    const transferAmount = '250';
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);

    await loanPaymentPage.selectAmountOption(AmountOptions.DifferentAmount, transferAmount);
    await loanPaymentPage.setExecutionDate(expectedExecutionDateString);
    const reviewTransferPage = await loanPaymentPage.submitForm();
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
});
