import { test, expect, LoginState } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Transactions page:', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test.describe.configure({ mode: 'parallel' });

  test('User can see Transactions page', async ({ transactionsPage }) => {
    await expect(transactionsPage.journeyUi).toBeVisible();
    await expect(transactionsPage.allTransactions).toHaveCount(10);
  });

  test('User can see returned Transactions after search', async ({ transactionsPage }) => {
    const searchText = 'Hard Rock Cafe';
    await transactionsPage.searchForText(searchText);
    await expect(transactionsPage.numbeOfResultsFound).toBeVisible();
    await transactionsPage.cancelSearchButton.click();
  });

  test.skip('User can see returned Transactions after filtering by start date', async ({ transactionsPage }) => {
    const filterDate = '7/25/22';
    await transactionsPage.filterButton.click();
    await transactionsPage.dateStartField.fill(filterDate);
    await transactionsPage.dateEndField.fill(filterDate);
    await transactionsPage.applyFiltersButton.click();
    await expect(transactionsPage.numbeOfResultsFound).toBeVisible();
    await transactionsPage.clearAllFiltersButton.click();
    await transactionsPage.closeFiltersButton.click();
  });
});
