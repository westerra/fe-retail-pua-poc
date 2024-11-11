import { test, expect, LoginState, UserType, BudgetCard } from '@backbase/retail-e2e';

test.describe('Budget test', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('User can create new budget', async ({ manageBudgetsPage }) => {
    const budgetAmount = '666';

    await manageBudgetsPage.createBudgetButton.click();
    await manageBudgetsPage.categoryRadioButtons.first().click();
    await manageBudgetsPage.continueButton.click();
    await manageBudgetsPage.budgetAmountInput.fill(budgetAmount);
    await manageBudgetsPage.confirmButton.click();
    await expect(manageBudgetsPage.notificationToast).toHaveText('Budget created successfully');
  });

  test('User can edit existing budget', async ({ page, manageBudgetsPage }) => {
    const newBudgetAmount = '999';
    const firstBudgetCard = new BudgetCard(manageBudgetsPage.budgetCards.first());

    await firstBudgetCard.toggleButton.click();
    await manageBudgetsPage.editBudgetLink.click();
    await manageBudgetsPage.budgetAmountInput.fill(newBudgetAmount);
    await manageBudgetsPage.confirmButton.click();
    await expect(manageBudgetsPage.notificationToast).toHaveText('Budget updated successfully');
    await page.reload({ waitUntil: 'networkidle' });
    expect(firstBudgetCard.budgetAmountSpendAndTotal).toContainText(`${newBudgetAmount}`);
  });

  test('User can delete budget', async ({ manageBudgetsPage }) => {
    const firstBudgetCard = new BudgetCard(manageBudgetsPage.budgetCards.first());

    await firstBudgetCard.toggleButton.click();
    await manageBudgetsPage.deleteBudgetLink.click();
    await manageBudgetsPage.deleteButtonPopUp.click();
    await expect(manageBudgetsPage.notificationToast).toHaveText('Budget deleted successfully');
  });
});
