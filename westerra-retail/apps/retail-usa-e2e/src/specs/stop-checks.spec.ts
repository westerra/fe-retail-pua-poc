import { test, LoginState, UserType, StopChecksPage } from '@backbase/retail-e2e';
import { expect } from '@playwright/test';

const getNumberOfStopChecks = async (page: StopChecksPage) => {
  await page.tableLabels.first().waitFor();
  return await page.listItem.count();
};

test.describe('Stop checks', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('should verify creating a new stop checks', async ({ stopChecksPage }) => {
    const numberOfStopChecks = await getNumberOfStopChecks(stopChecksPage);
    await stopChecksPage.createButton.click();
    await expect(stopChecksPage.createFormHeader).toBeVisible();
    await stopChecksPage.fillTheFormAndContinue();
    await expect(stopChecksPage.reviewModalHeader).toBeVisible();
    await expect(stopChecksPage.reviewCheckAccountLabel).toHaveText('Check account');
    await expect(stopChecksPage.reviewAmountLabel).toHaveText('Check amount');
    await expect(stopChecksPage.reviewAmountValue).toHaveText(`USD${stopChecksPage.formValues.amount}.00`);
    await expect(stopChecksPage.reviewCheckNumberLabel).toHaveText('Check number');
    await expect(stopChecksPage.reviewCheckNumberValue).toHaveText(stopChecksPage.formValues.checkNumber);
    await stopChecksPage.reviewSubmitButton.click();
    await expect(stopChecksPage.notificationHeader).toHaveText('Stop check request submitted');
    await expect(stopChecksPage.notificationMessage).toHaveText(' We will soon update the status of your request ');
    const newNumberOfStopChecks = await getNumberOfStopChecks(stopChecksPage);
    await expect(newNumberOfStopChecks, 'should add the item').toBe(numberOfStopChecks + 1);
  });

  test('should verify the list page and item details', async ({ stopChecksPage }) => {
    await expect(stopChecksPage.pageTitleHeader, '(journey header)').toHaveText('Stop Checks');
    const expectedLabels = ['Check account', 'Check number(s)', 'Date submitted', 'Expiry date', 'Status'];
    await stopChecksPage.tableLabels.first().waitFor();
    const uiTableLabels = await stopChecksPage.tableLabels.allInnerTexts();
    await expect(uiTableLabels, '(table labels)').toEqual(expectedLabels);
    await stopChecksPage.originatorAccountName.nth(0).click();
    await expect(stopChecksPage.detailsModalHeader, '(check details modal)').toBeVisible();
  });
});
