import { test, LoginState, expect } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';
test.describe('Activity Page', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('verify whether Scheduled and History tabs are present', async ({ scheduledTransfersPage }) => {
    await expect(scheduledTransfersPage.journeyUI).toBeVisible();
    await expect(scheduledTransfersPage.pageTitle).toHaveText('Activity');
    await expect(scheduledTransfersPage.historyTab).toBeVisible();
    await expect(scheduledTransfersPage.scheduledTab).toBeVisible();
  });
  test('verify whether cancel is not present in History tab', async ({ scheduledTransfersPage }) => {
    await scheduledTransfersPage.historyTab.click();
    await scheduledTransfersPage.paymentItemsInHistoryTab.first().waitFor();
    const list = await scheduledTransfersPage.paymentItemsInHistoryTab.count();
    if (list > 0) {
      await expect(scheduledTransfersPage.cancelBtn).not.toBeVisible();
      await expect(scheduledTransfersPage.cancelBtn).not.toBeVisible();
    }
  });
});
