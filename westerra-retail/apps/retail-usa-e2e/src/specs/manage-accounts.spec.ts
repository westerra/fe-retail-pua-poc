import { test, expect, LoginState, MyAccountsPage } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Manage accounts:', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test.describe.configure({ mode: 'parallel' });

  test('User can see Manage my Accounts page header', async ({ manageAccountsPage }) => {
    await expect(manageAccountsPage.journeyUi).toBeVisible();
    await expect(manageAccountsPage.pageTitleHeader).toHaveText('Manage my Accounts');
  });

  test('User can see edited account name from accounts details', async ({ manageAccountsPage }) => {
    const newAlias = 'This is a new awesome alias for TERM DEPOSITS';
    await manageAccountsPage.editAccountName(newAlias);
    await expect(manageAccountsPage.accountName).toHaveText(newAlias);
  });

  test('User can not see account if it swiched to hidden in manage accounts page', async ({
    page,
    manageAccountsPage,
  }) => {
    const myAccountsPage = new MyAccountsPage(page);
    await manageAccountsPage.manageAccountItem.first().waitFor();
    const productItems = await manageAccountsPage.manageAccountItem.count();
    await manageAccountsPage.showHideAccountSlider.click();
    await manageAccountsPage.backToAccountsBtn.click();
    await expect(myAccountsPage.productItem).toHaveCount(productItems - 1);
    await myAccountsPage.manageAccountBtn.click();
    await manageAccountsPage.showHideAccountSlider.click();
    await manageAccountsPage.backToAccountsBtn.click();
    await expect(myAccountsPage.productItem).toHaveCount(productItems);
  });
});
