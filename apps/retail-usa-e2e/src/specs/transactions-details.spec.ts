import { test, expect, LoginState } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Transactions details page:', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test.describe.configure({ mode: 'parallel' });

  test('User can see Transactions details modal', async ({ transactionsDetailsPage }) => {
    await expect(transactionsDetailsPage.journeyUi).toBeVisible();
  });

  test('User can see relevant fields titles in transactions details modal', async ({ transactionsDetailsPage }) => {
    await expect(transactionsDetailsPage.transactionAmount.nth(0)).toBeVisible();
    await expect(transactionsDetailsPage.transactionBookingdate.nth(0)).toBeVisible();
    await expect(transactionsDetailsPage.typeLabel).toHaveText('Type');
    await expect(transactionsDetailsPage.typeValue).toBeVisible();
    await expect(transactionsDetailsPage.counterPartyAccountNumberLabel).toHaveText('Counter party account number');
    await expect(transactionsDetailsPage.counterPartyAccountNumberValue).toBeVisible();
    await expect(transactionsDetailsPage.descriptionLabel).toHaveText('Description');
    await expect(transactionsDetailsPage.descriptionValue).toBeVisible();
  });

  test('User can see transaction category in transactions details category button', async ({
    transactionsDetailsPage,
  }) => {
    await expect(transactionsDetailsPage.transactionCategory).toBeVisible();
  });

  test.skip('User can update transaction category in transactions details', async ({ transactionsDetailsPage }) => {
    const randomIndex = Math.floor(Math.random() * 10);
    await transactionsDetailsPage.changeCategoryButton.click();
    await transactionsDetailsPage.allCategories.nth(randomIndex).click();
    await transactionsDetailsPage.saveChangeCategoryButton.scrollIntoViewIfNeeded();
    await transactionsDetailsPage.saveChangeCategoryButton.waitFor();
    await transactionsDetailsPage.saveChangeCategoryButton.click();
    await expect(transactionsDetailsPage.changeCategoryAlert).toBeVisible();
  });
});
