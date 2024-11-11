import { test, LoginState, UserType, generateUniqueString, SUCCESS_NOTIFICATION_ALERT } from '@backbase/retail-e2e';
import { expect } from '@playwright/test';

test.describe('Create and send a message', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });

  test('Create and send a messages', async ({ messagesPage }) => {
    const data = `${new Date().toUTCString()}`;
    await messagesPage.composeButton.click();
    //TODO: add function to get random topic from the list, DLRN-4805
    await messagesPage.newMessageModalWindow.topicFieldDropDown.selectOption({ index: 1 });
    await messagesPage.newMessageModalWindow.subjectField.fill(data);
    await messagesPage.newMessageModalWindow.messageField.fill(`${generateUniqueString()}`);
    await messagesPage.newMessageModalWindow.sendButton.click();
    await expect(await messagesPage.popUpNotification).toHaveText(SUCCESS_NOTIFICATION_ALERT);
    await messagesPage.outBoxTab.click();
    await expect(await messagesPage.subjectColumn.first().innerText()).toEqual(data);
  });
});
