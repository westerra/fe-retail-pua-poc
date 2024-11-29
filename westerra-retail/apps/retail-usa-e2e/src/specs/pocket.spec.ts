import {
  test,
  expect,
  PocketListItem,
  PocketListPage,
  LoginState,
  UserType,
  generateUniqueString,
} from '@backbase/retail-e2e';

test.describe('Pocket test', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  const pocketName = generateUniqueString();

  test('Create pocket succesfully', async ({ page, createPocketPage }) => {
    const pocketListPage = new PocketListPage(page);

    await expect(createPocketPage.pageHeader).toHaveText('Create Pocket');
    await expect(createPocketPage.step1).toBeVisible();

    await createPocketPage.nameInput.fill(pocketName);
    await createPocketPage.continueButton.click();

    await expect(createPocketPage.step2).toBeVisible();
    await createPocketPage.targetAmountInput.fill('10000000000000000');
    await createPocketPage.deadlineDate.fill('12/31/44');
    await createPocketPage.continueButton.click();

    await expect(createPocketPage.step3).toBeVisible();
    await expect(createPocketPage.nameReview).toHaveText(pocketName);
    await expect(createPocketPage.dateReview).toHaveText('Dec 31, 2044');
    await expect(createPocketPage.amountReview).toHaveText('$10,000,000,000,000,000.00');

    await createPocketPage.continueButton.click();
    const firstPocket = new PocketListItem(pocketListPage.pocketListItems.first());
    await pocketListPage.pocketListItems.first().waitFor();

    await expect(firstPocket.title).toHaveText(pocketName);
  });

  test('Add money successfully', async ({ page, addMoneyPage }) => {
    const pocketListPage = new PocketListPage(page);
    const transferAmount = 1;

    await addMoneyPage.fillStep(transferAmount.toString());
    await addMoneyPage.continueButton.click();

    await pocketListPage.isOnSuccessPage();
    await expect(pocketListPage.notificationMessage).toHaveText(
      `You've just transfered USD ${transferAmount} to your '${pocketName}' pocket.`,
    );
  });

  test('Withdraw money successfully', async ({ page, withdrawMoneyPage }) => {
    const pocketListPage = new PocketListPage(page);
    const transferAmount = 1;

    await withdrawMoneyPage.fillStep(transferAmount.toString());
    await withdrawMoneyPage.continueButton.click();

    await pocketListPage.isOnSuccessPage();
    await expect(pocketListPage.notificationMessage).toHaveText(
      `You've just withdrawn USD ${transferAmount} from your '${pocketName}' pocket.`,
    );
  });

  test('Delete created pocket succesfully', async ({ pocketListPage }) => {
    await pocketListPage.pocketListItems.last().waitFor();
    const numberOfPocketsBeforeDeletion = await pocketListPage.pocketListItems.count();
    const numberOfPocketsExpectedAfterDelete = numberOfPocketsBeforeDeletion - 1;
    const firstPocket = new PocketListItem(pocketListPage.pocketListItems.first());
    await firstPocket.transferButton.click();
    await pocketListPage.deletePocketLink.click();
    await pocketListPage.confirmDeleteModal.click();
    await expect(pocketListPage.notificationMessage).toHaveText(
      `Your "${pocketName}" pocket has been successfully deleted.`,
    );
    if (numberOfPocketsExpectedAfterDelete === 0) {
      await expect(pocketListPage.emptyList).toBeVisible();
    } else {
      await pocketListPage.pocketListItems.last().waitFor();
      const numberOfPocketsAfterDelete = await pocketListPage.pocketListItems.count();
      expect(numberOfPocketsAfterDelete).toBe(numberOfPocketsExpectedAfterDelete);
    }
  });
});
