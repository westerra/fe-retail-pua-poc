import { test, LoginState, expect } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

const accountName = `A2A_${new Date().getTime()}`;

test.describe('Connected Accounts', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User should be able to create connected  account', async ({ connectedAccountsPage }) => {
    await expect(connectedAccountsPage.journeyUI).toBeVisible();
    await expect(connectedAccountsPage.pageTitleHeader).toHaveText('Connected Accounts');
    await connectedAccountsPage.createConnectedAccounts(accountName);
    await expect(connectedAccountsPage.notificationMessage).toBeVisible();
    await expect(connectedAccountsPage.notificationMessage).toHaveText('Information submitted successfully');
  });
  test('User should be able to delete connected  account', async ({ connectedAccountsPage }) => {
    await expect(connectedAccountsPage.journeyUI).toBeVisible();
    await expect(connectedAccountsPage.pageTitleHeader).toHaveText('Connected Accounts');
    await connectedAccountsPage.deleteConnectedAccounts(accountName);
    await expect(connectedAccountsPage.notificationMessage).toBeVisible();
    await expect(connectedAccountsPage.notificationMessage).toHaveText('Account removed successfully');
  });
});
