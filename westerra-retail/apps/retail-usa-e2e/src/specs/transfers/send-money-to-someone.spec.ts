import {
  test,
  LoginState,
  expect,
  addOneMonthToDate,
  getFormattedDateString,
  TransactionSigningOTPPopup,
} from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Send money to someone', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User should be able to successfully make a transfer', async ({ sendMoneyToSomeonePage, config }) => {
    await expect(sendMoneyToSomeonePage.journeyUI).toBeVisible();
    await expect(sendMoneyToSomeonePage.pageTitle).toHaveText('Send Money to Someone');
    const transferAmount = '2';
    const reviewTransferPage = await sendMoneyToSomeonePage.makeTransfer(transferAmount);
    await reviewTransferPage.verifyTransferDetails(transferAmount);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(sendMoneyToSomeonePage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
  test('User should be able to schedule transfer for the future date', async ({ sendMoneyToSomeonePage, config }) => {
    await expect(sendMoneyToSomeonePage.journeyUI).toBeVisible();
    await expect(sendMoneyToSomeonePage.pageTitle).toHaveText('Send Money to Someone');
    const transferAmount = '5';
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);
    const reviewTransferPage = await sendMoneyToSomeonePage.makeFutureDateTransfer(
      transferAmount,
      executionDate.toISOString(),
    );
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(sendMoneyToSomeonePage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
});
