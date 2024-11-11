import {
  test,
  LoginState,
  expect,
  addOneMonthToDate,
  getFormattedDateString,
  TransactionSigningOTPPopup,
} from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

const transferAmount = '2';

test.describe('Make a transfer', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test('User should be able to successfully make a transfer', async ({ makeTransferPage, config }) => {
    await expect(makeTransferPage.journeyUI).toBeVisible();
    await expect(makeTransferPage.pageTitle).toHaveText('Make a Transfer');
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);
    const reviewTransferPage = await makeTransferPage.makeTransfer(transferAmount, executionDate.toISOString());
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(makeTransferPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
  test('User should be able to schedule external A2A transfer for the future date', async ({
    makeTransferPage,
    config,
  }) => {
    await expect(makeTransferPage.journeyUI).toBeVisible();
    await expect(makeTransferPage.pageTitle).toHaveText('Make a Transfer');
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);
    const reviewTransferPage = await makeTransferPage.makeFutureDateA2ATransfer(
      transferAmount,
      executionDate.toISOString(),
    );
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(makeTransferPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
  test('User should be able to schedule external A2A pull funds for the future date', async ({
    makeTransferPage,
    config,
  }) => {
    await expect(makeTransferPage.journeyUI).toBeVisible();
    await expect(makeTransferPage.pageTitle).toHaveText('Make a Transfer');
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);
    const reviewTransferPage = await makeTransferPage.makeFutureDateA2APullFundsTransfer(
      transferAmount,
      executionDate.toISOString(),
    );
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(makeTransferPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
});
