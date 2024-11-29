import { expect, LoginState, test, TravelNoticeListPage, UserType } from '@backbase/retail-e2e';
test.describe('Travel Notice test', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('Create travel notice succesfully', async ({ page, createTravelNoticePage }) => {
    const travelNoticeListPage = new TravelNoticeListPage(page);

    const futureDate = new Date();
    futureDate.setMonth(new Date().getMonth() + 1);
    const travelDestination = 'France'; //TODO: get random country from list

    await createTravelNoticePage.addCountryToList(travelDestination);
    await createTravelNoticePage.dateFromField.fill(futureDate.toISOString());
    await createTravelNoticePage.dateToField.fill(futureDate.toISOString());

    await createTravelNoticePage.continueButton.nth(0).click();
    await createTravelNoticePage.cardsCheckboxes.nth(0).click();
    await createTravelNoticePage.cardsCheckboxes.nth(1).click();

    await createTravelNoticePage.continueButton.nth(1).click();
    await createTravelNoticePage.confirmButton.click();
    await expect(travelNoticeListPage.travelNoticeItemHeaders.filter({ hasText: travelDestination })).not.toHaveCount(
      0,
    );
  });

  test('Delete travel notice succesfully', async ({ travelNoticeListPage }) => {
    await travelNoticeListPage.travelNoticeItemHeaders.last().waitFor({ state: 'visible' });
    const travelNoticesBeforeDelete = await travelNoticeListPage.travelNoticeItemHeaders.count();
    await travelNoticeListPage.deleteTravelNotice(0);
    await travelNoticeListPage.expectedTravelNoticesAfterDelete(travelNoticesBeforeDelete);
  });
});
