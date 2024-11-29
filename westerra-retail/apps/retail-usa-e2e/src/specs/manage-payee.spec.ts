import { test, LoginState, UserType, AddPayeePage } from '@backbase/retail-e2e';
import { expect } from '@playwright/test';
import { payeeData } from '@backbase/retail-e2e';
const PAYEENAME = 'Ace Sanitation';
const PAYEE_ZIP = '686020383';
const PAYEE_ACCOUNT_NUM = Math.floor(Math.random() * 90000) + 10000;

test.describe('Manage payees', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('Add Manual Payee succesfully', async ({ page, payBillsListPage }) => {
    expect(payBillsListPage.isOnPage());
    await payBillsListPage.addPayeeBtn.click();
    const addPayeePage = new AddPayeePage(page);
    await addPayeePage.isOnPage();
    await addPayeePage.enterDtlsManBtn.click();
    await addPayeePage.fillPayeeDetailsManually(
      payeeData.companyName,
      payeeData.addressLine1,
      payeeData.addressLine2,
      payeeData.city,
      payeeData.zipCode,
    );
    await addPayeePage.addPayeeBtn.click();
    expect(payBillsListPage.isOnPage);
  });

  test('Delete Payee succesfully', async ({ payBillsListPage }) => {
    expect(payBillsListPage.isOnPage());
    await payBillsListPage.deletePayee();
    await expect(payBillsListPage.successNotificationMessage).toContainText('has been deleted successfully');
  });

  test('Add electronic Payee succesfully', async ({ page, payBillsListPage }) => {
    await payBillsListPage.addPayeeBtn.click();
    const addPayeePage = new AddPayeePage(page);
    await addPayeePage.isOnPage();
    await page.keyboard.type(PAYEENAME, { delay: 100 });
    await addPayeePage.listOfPayees.first().click();
    await addPayeePage.addElectronicPayee(PAYEE_ACCOUNT_NUM.toString(), PAYEE_ZIP);
    await addPayeePage.addPayeeBtn.click();
    await expect(payBillsListPage.successNotificationMessage.first()).toContainText('has been created successfully');
  });
});
