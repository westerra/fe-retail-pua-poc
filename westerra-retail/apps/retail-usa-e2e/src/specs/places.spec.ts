import { test, expect, LoginState } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('Places Journeys', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User is able to access Find ATM or Branch', async ({ findAtmBranchPage }) => {
    await expect(findAtmBranchPage.journeyUi).toBeVisible();
    await expect(await findAtmBranchPage.pageTitleHeader.textContent()).toContain('Find Branches and ATMs');
    await expect(await findAtmBranchPage.page.title()).toContain('Find branches and ATMs - Retail Banking');
  });

  test('it should show the Places list with searchBox and map', async ({ findAtmBranchPage }) => {
    await expect(findAtmBranchPage.searchBox).toBeVisible();
    await expect(findAtmBranchPage.placesList).toBeVisible();
    await expect(findAtmBranchPage.placesMap).toBeVisible();
  });
});
