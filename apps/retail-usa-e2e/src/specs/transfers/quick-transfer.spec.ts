import { test, LoginState, expect, QuickTransfer, TransactionSigningOTPPopup } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Quick transfer', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test('User should be able to successfully make a transfer', async ({ myAccountsPage, config }) => {
    await expect(myAccountsPage.pageTitleHeader).toBeVisible();
    const quickTransfer = new QuickTransfer(myAccountsPage.page);
    await expect(quickTransfer.header).toHaveText('Quick Transfer');
    const transferAmount = '2';
    const reviewQuickTransfer = await quickTransfer.makeTransfer(transferAmount);
    await expect(reviewQuickTransfer.modalHeader).toHaveText('Quick Transfer');
    await expect(reviewQuickTransfer.amount).toHaveText(new RegExp(transferAmount));
    await reviewQuickTransfer.confirmTransfer();
    const otpPopup = new TransactionSigningOTPPopup(myAccountsPage.page, config);
    await otpPopup.enterOTPAndSubmit();
    await expect(quickTransfer.successTitle).toHaveText('Well done!');
    await expect(quickTransfer.successMessage).toHaveText(new RegExp(`You just transferred \\$${transferAmount}.*`));
  });
});
