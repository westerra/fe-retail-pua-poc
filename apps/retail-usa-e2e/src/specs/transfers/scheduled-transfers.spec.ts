import { test, LoginState, expect, TransactionSigningOTPPopup } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Scheduled transfers', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User should be able to edit scheduled transfer', async ({ scheduledTransfersPage, config }) => {
    await expect(scheduledTransfersPage.journeyUI).toBeVisible();
    await expect(scheduledTransfersPage.pageTitle).toHaveText('Activity');
    const transferAmount = '2';
    const reviewTransferPage = await scheduledTransfersPage.editScheduledPayment(transferAmount);
    await reviewTransferPage.verifyTransferDetails(transferAmount);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(scheduledTransfersPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer(true);
  });

  test('User should be able to edit scheduled A2A transfer', async ({ scheduledTransfersPage, config }) => {
    await expect(scheduledTransfersPage.journeyUI).toBeVisible();
    await expect(scheduledTransfersPage.pageTitle).toHaveText('Activity');
    const transferAmount = '2';
    const reviewTransferPage = await scheduledTransfersPage.editScheduledA2APayment(transferAmount);
    await reviewTransferPage.verifyTransferDetails(transferAmount);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(scheduledTransfersPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer(true);
  });

  test('User should be able to edit scheduled A2A pull funds', async ({ scheduledTransfersPage, config }) => {
    await expect(scheduledTransfersPage.journeyUI).toBeVisible();
    await expect(scheduledTransfersPage.pageTitle).toHaveText('Activity');
    const transferAmount = '2';
    const reviewTransferPage = await scheduledTransfersPage.editScheduledA2APPullFunds(transferAmount);
    await reviewTransferPage.verifyTransferDetails(transferAmount);
    await reviewTransferPage.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(scheduledTransfersPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await reviewTransferPage.verifySuccessfulTransfer(true);
  });

  test('User should be able to cancel scheduled transfer', async ({ scheduledTransfersPage }) => {
    await expect(scheduledTransfersPage.journeyUI).toBeVisible();
    await expect(scheduledTransfersPage.pageTitle).toHaveText('Activity');
    await scheduledTransfersPage.cancelScheduledPayment();
    await expect(scheduledTransfersPage.notificationMessage).toBeVisible();
    await expect(scheduledTransfersPage.notificationMessage).toHaveText(/Payment cancelled.*/);
  });
});
