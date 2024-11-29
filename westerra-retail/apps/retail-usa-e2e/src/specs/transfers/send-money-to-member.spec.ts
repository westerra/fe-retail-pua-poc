import {
  test,
  LoginState,
  expect,
  addOneMonthToDate,
  getFormattedDateString,
  TransactionSigningOTPPopup,
} from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Send money to member', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User should be able to successfully send money to member', async ({ sendMoneyToMemberPage, config }) => {
    await expect(sendMoneyToMemberPage.journeyUI).toBeVisible();
    await expect(sendMoneyToMemberPage.pageTitle).toHaveText('Send Money to Member');
    const transferAmount = '2';
    const reviewTransferPage = await sendMoneyToMemberPage.makeTransfer(transferAmount);
    await reviewTransferPage.verifyTransferDetails(transferAmount);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(sendMoneyToMemberPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
  test('User should be able to schedule transfer for the future date', async ({ sendMoneyToMemberPage, config }) => {
    await expect(sendMoneyToMemberPage.journeyUI).toBeVisible();
    await expect(sendMoneyToMemberPage.pageTitle).toHaveText('Send Money to Member');
    const transferAmount = '5';
    const executionDate = addOneMonthToDate(true);
    const expectedExecutionDateString = getFormattedDateString(executionDate);
    const reviewTransferPage = await sendMoneyToMemberPage.makeFutureDateTransfer(
      transferAmount,
      executionDate.toISOString(),
    );
    await reviewTransferPage.verifyTransferDetails(transferAmount, expectedExecutionDateString);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(sendMoneyToMemberPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer();
  });
});
