import { test, expect, LoginState } from '@backbase/retail-e2e';
import { UserType } from '@backbase/retail-e2e';

test.describe('@rtc Real time communication live chat:', () => {
  test.use({ loginState: LoginState.loggedIn, testUserType: UserType.userWithSingleContext });
  test.describe.configure({ mode: 'parallel' });

  test('User can see chat bubble', async ({ myAccountsPage }) => {
    await expect(myAccountsPage.journeyUi).toBeVisible();
    await expect(myAccountsPage.pageTitleHeader).toHaveText('My Accounts');
    await expect(myAccountsPage.liveChat.chatButton).toBeVisible();
  });

  test('User can toggle on-off chat from more menu or clicking on chat bubble', async ({ myAccountsPage }) => {
    const moreNavigation = myAccountsPage.moreNavigation;
    await moreNavigation.click();
    expect(
      (await myAccountsPage.topNavMenuDropdown(moreNavigation).getAllOptions()).includes('Live Chat'),
    ).toBeTruthy();
    await myAccountsPage.topNavMenuDropdown(myAccountsPage.moreNavigation).select('Live Chat');
    //assert chat window is displayed
    await expect(myAccountsPage.liveChat.conversationPanel).toBeVisible();
    //assert chat bubble class has expand-more
    await expect(myAccountsPage.liveChat.chatBubble.chatIcon).toHaveClass(/bb-icon-expand-more/);
    //assert chat text area is focussed
    await expect(myAccountsPage.liveChat.chatWindow.chatTextArea).toBeFocused();
    // Click on chat bubble to minimize the chat window
    await myAccountsPage.liveChat.chatBubble.toggleChat();
    //assert chat window is not displayed
    await expect(myAccountsPage.liveChat.conversationPanel).toBeHidden();
    //assert chat bubble class has different class other than expand-more
    await expect(myAccountsPage.liveChat.chatBubble.chatIcon).not.toHaveClass(/bb-icon-expand-more/);
  });

  test('Start a new conversation and end without employee accepting', async ({ myAccountsPage }) => {
    await myAccountsPage.liveChat.chatBubble.toggleChat();
    await expect(myAccountsPage.liveChat.chatWindow.firstMessage).toContainText('How can we help you today?');
    await myAccountsPage.liveChat.chatWindow.sendMessage('Message 1');
    await myAccountsPage.liveChat.chatWindow.sendMessage('Message 2');
    const sentMessages = await myAccountsPage.liveChat.chatWindow.getAllMessages();
    console.log('Sent Messages: ', sentMessages);
    await expect(myAccountsPage.liveChat.chatWindow.messages).toHaveText(sentMessages);
    await myAccountsPage.liveChat.chatWindow.closeChat();
    await expect(myAccountsPage.modalWindow.title).toContainText('End live chat & leave queue?');
    await expect(myAccountsPage.modalWindow.body).toContainText(
      'You will have to re-join a new queue if you want to talk to an agent.',
    );
    await myAccountsPage.modalWindow.confirm();
    await myAccountsPage.logOut();
  });
});
