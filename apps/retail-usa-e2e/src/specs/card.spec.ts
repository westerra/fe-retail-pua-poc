import { expect, test, Card, LoginState, UserType, CardDetailsPage } from '@backbase/retail-e2e';

test.describe('Card test', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User can lock and unlock card.', async ({ page, manageCardsListPage }) => {
    const cardDetailsPage = new CardDetailsPage(page);
    const firstCard = new Card(manageCardsListPage.cards.first());
    const cardNumberFirstCard = await firstCard.cardNumber.innerText();
    const lastcardNumberDigits = cardNumberFirstCard.slice(cardNumberFirstCard.length - 5);

    await expect(firstCard.lockedIcon).toBeHidden();
    await expect(firstCard.name).toHaveText('emily-autotest');
    await firstCard.cardContainer.click();
    await expect(cardDetailsPage.cardDetailHeader).toHaveText('emily-autotest debit card');
    await cardDetailsPage.lockSwitch.click();
    await expect(cardDetailsPage.notificationToast).toHaveText(
      `Card locked  Card number ending with ${lastcardNumberDigits} has been locked.`,
    );
    await cardDetailsPage.notificationToast.waitFor({ state: 'hidden' });
    await cardDetailsPage.backToManageCardsButton.click();
    await expect(firstCard.lockedIcon).toBeVisible();
    await firstCard.cardContainer.click();
    await expect(cardDetailsPage.cardDetailHeader).toHaveText('emily-autotest debit card');
    await cardDetailsPage.lockSwitch.click();
    await expect(cardDetailsPage.notificationToast).toHaveText(
      `Card unlocked  Card number ending with ${lastcardNumberDigits} has been unlocked.`,
    );
    await cardDetailsPage.backToManageCardsButton.click();
    await expect(firstCard.lockedIcon).toBeHidden();
  });

  test('User can request a new card.', async ({ page, manageCardsListPage }) => {
    const cardDetailsPage = new CardDetailsPage(page);
    const firstCard = new Card(manageCardsListPage.cards.first());
    const secondCard = new Card(manageCardsListPage.cards.nth(1));

    await expect(firstCard.lockedIcon).toBeHidden();
    await expect(firstCard.name).toHaveText('emily-autotest');
    const cardNumberFirstCard = await firstCard.cardNumber.innerText();
    await firstCard.cardContainer.click();
    await expect(cardDetailsPage.cardDetailHeader).toHaveText('emily-autotest debit card');
    await cardDetailsPage.replaceCardButton.click();
    await cardDetailsPage.modalPrimaryButton.click();
    await cardDetailsPage.modalPrimaryButton.click();
    await expect(cardDetailsPage.notificationToast).toHaveText(`New card ordered  A new card has been ordered.`);
    await cardDetailsPage.notificationToast.waitFor({ state: 'hidden' });
    await cardDetailsPage.backToManageCardsButton.click();
    await expect(firstCard.badge).toHaveText('Inactive');
    await expect(secondCard.cardNumber).toContainText(cardNumberFirstCard);
    await expect(secondCard.badge).toHaveText('Cancelled');
  });

  test('User can activate new card.', async ({ page, manageCardsListPage }) => {
    const cardDetailsPage = new CardDetailsPage(page);
    const firstCard = new Card(manageCardsListPage.cards.first());
    const cardNumberFirstCard = await firstCard.cardNumber.innerText();

    await expect(firstCard.badge).toHaveText('Inactive');
    await expect(firstCard.name).toHaveText('emily-autotest');
    await firstCard.cardContainer.click();
    await expect(cardDetailsPage.cardDetailHeader).toHaveText('emily-autotest debit card');
    await cardDetailsPage.activateButton.click();
    await cardDetailsPage.modalBodyCvvInput.fill('123');
    await cardDetailsPage.modalPrimaryButton.click();
    await expect(cardDetailsPage.notificationToast).toHaveText(`Card Activated.`);
    await cardDetailsPage.notificationToast.waitFor({ state: 'hidden' });
    await cardDetailsPage.backToManageCardsButton.click();
    await expect(firstCard.cardNumber).toContainText(cardNumberFirstCard);
    await expect(firstCard.deactivatedIcon).toBeHidden();
  });

  test('User can reset card pin.', async ({ page, manageCardsListPage }) => {
    const cardDetailsPage = new CardDetailsPage(page);
    const firstCard = new Card(manageCardsListPage.cards.first());

    await expect(firstCard.lockedIcon).toBeHidden();
    await expect(firstCard.name).toHaveText('emily-autotest');
    await firstCard.cardContainer.click();
    await expect(cardDetailsPage.cardDetailHeader).toHaveText('emily-autotest debit card');
    await cardDetailsPage.buttonRequestResetPin.click();
    await cardDetailsPage.modalBodyCvvInput.fill('123');
    await cardDetailsPage.modalPrimaryButton.click();
    await cardDetailsPage.modalInput.fill('1234');
    await cardDetailsPage.modalPrimaryButton.click();
    await cardDetailsPage.modalInput.fill('1234');
    await cardDetailsPage.modalPrimaryButton.click();
    await expect(cardDetailsPage.notificationToast).toHaveText(`PIN successfully reset`);
  });
});
