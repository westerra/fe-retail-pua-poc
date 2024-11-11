import { test, expect, LoginState } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

const { describe, use } = test;

describe('Accounts Details:', () => {
  use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  describe.configure({ mode: 'parallel' });

  test('User can see My Accounts page header', async ({ myAccountsPage }) => {
    await expect(myAccountsPage.journeyUi).toBeVisible();
    await expect(myAccountsPage.pageTitleHeader).toHaveText('My Accounts');
  });

  test('User can see List of transactions', async ({ myAccountsPage }) => {
    await myAccountsPage.accountItem.nth(0).click();
    await myAccountsPage.transactionsListTab.click();
    await expect(myAccountsPage.transactionsList).toBeVisible();
    await expect(myAccountsPage.allTransactions).toHaveCount(10);
  });

  test('User can see Ach routing number in account details ', async ({ myAccountsPage }) => {
    await myAccountsPage.accountItem.nth(0).click();
    await myAccountsPage.accountDetailsTab.click();
    await expect(myAccountsPage.achRoutingNumberLabel).toBeVisible();
    await expect(myAccountsPage.achRoutingNumberLabel).toHaveText('ACH Routing Number');
    await expect(myAccountsPage.achRoutingNumber).toBeVisible();
  });

  describe('When the show_maintenance_banner feature is toggled in Remote Config', () => {
    test('User should see a maintenance banner if show_maintenance_banner is true', async ({
      page,
      myAccountsPage,
    }) => {
      await page.route('**/parameters', async (route) => {
        route.fulfill({
          body: '{"show_maintenance_banner": true, "maintenance_banner_text": "Some services are unavailable due to maintenance"}',
        });
      });
      await page.reload({ waitUntil: 'networkidle' });

      await expect(myAccountsPage.remoteConfigMaintenanceBanner).toBeVisible();
      await expect(myAccountsPage.remoteConfigMaintenanceText).toContainText(
        'Some services are unavailable due to maintenance',
      );
    });

    test('User should see a maintenance banner with fallback text if show_maintenance_banner is true', async ({
      page,
      myAccountsPage,
    }) => {
      await page.route('**/parameters', async (route) => {
        route.fulfill({
          body: '{"show_maintenance_banner": true}',
        });
      });
      await page.reload({ waitUntil: 'networkidle' });

      await expect(myAccountsPage.remoteConfigMaintenanceBanner).toBeVisible();
      await expect(myAccountsPage.remoteConfigMaintenanceText).toContainText(
        'Dear Customer, some services in the online banking app are  not available due to maintenance activity.',
      );
    });

    test('User should not see a maintenance banner if show_maintenance_banner is false', async ({
      page,
      myAccountsPage,
    }) => {
      await page.route('**/parameters', async (route) => {
        route.fulfill({ body: '{"show_maintenance_banner": false}' });
      });
      await page.reload({ waitUntil: 'networkidle' });

      await expect(myAccountsPage.remoteConfigMaintenanceBanner).toBeHidden();
    });

    test('User should not see a maintenance banner if Remote Config service is unavailable', async ({
      page,
      myAccountsPage,
    }) => {
      await page.route('**/parameters', async (route) => {
        route.fulfill({ status: 404 });
      });
      await page.reload({ waitUntil: 'networkidle' });

      await expect(myAccountsPage.remoteConfigMaintenanceBanner).toBeHidden();
    });
  });
});
