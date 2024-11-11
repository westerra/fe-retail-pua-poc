import { test, LoginState, expect, addOneMonthToDate, getFormattedDateString } from '@backbase/retail-e2e';

/**
 * This test suites are written against mock-server and will be modified after retail-e2e road map is defined
 * Skipped due to core banking LOAN_ADVANCE integration impediments
 */
test.describe.skip('Make retail loan advance', () => {
  test('User should be able to successfully make a loan payment transfer', async ({ loanAdvancePage }) => {
    const transferAmount = '330';
    await expect(loanAdvancePage.journeyUI).toBeVisible();
    await expect(loanAdvancePage.pageTitle).toHaveText('Loan Advance');
    await loanAdvancePage.selectToAccount(1);
    await loanAdvancePage.fillAmount(transferAmount);
    const reviewTransferPage = await loanAdvancePage.submitForm();
    await reviewTransferPage.verifyTransferDetails(transferAmount);
    await reviewTransferPage.confirmTransfer();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
  test('User should be able to schedule transfer', async ({ loanAdvancePage }) => {
    const transferAmount = '250';
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);

    await loanAdvancePage.selectToAccount(1);
    await loanAdvancePage.fillAmount(transferAmount);
    await loanAdvancePage.setExecutionDate(expectedExecutionDateString);
    const reviewTransferPage = await loanAdvancePage.submitForm();
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
});
