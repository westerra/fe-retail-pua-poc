import { test, expect, LoginState, selectMockScenario } from '@backbase/retail-e2e';

test.describe('Self Enrollment:', () => {
  test.use({ loginState: LoginState.notLoggedIn });
  test.describe.configure({ mode: 'parallel' });

  test.describe('Instructions Page', () => {
    test.beforeEach(async ({ seInstructionsPage }) => {
      await seInstructionsPage.open();
    });

    test('Unauthenticated user can access self enrollment journey', async ({ seInstructionsPage }) => {
      await expect.soft(seInstructionsPage.pageHeader).toContainText('Register for online banking');
      await expect.soft(seInstructionsPage.termsAndConditionsLink).toBeVisible();
      await expect.soft(seInstructionsPage.privacyPolicyLink).toBeVisible();
      await seInstructionsPage.stepFragment.validateStep('1');
    });

    test('Attempt to progress without checkbox confirmed', async ({ seInstructionsPage }) => {
      expect.soft(await seInstructionsPage.checkbox.checkboxInput.isChecked()).toBeFalsy();
      await seInstructionsPage.continueButton.click();
      await expect(seInstructionsPage.validationError.errorMessage).toContainText(
        'You must read & agree to the terms & conditions and privacy policy.',
      );
    });

    test('Progress from instructions to identification step', async ({ seInstructionsPage, seIdentificationPage }) => {
      await selectMockScenario('postEnrollmentResponse', 'identification');
      await seInstructionsPage.progressToNextStep();
      await expect(seIdentificationPage.pageHeader).toContainText('Identify your account');
    });
  });

  test.describe('Identification Page', () => {
    test.beforeEach(async ({ seIdentificationPage }) => {
      await seIdentificationPage.open();
    });

    test('Identification Page layout', async ({ seIdentificationPage }) => {
      await expect.soft(seIdentificationPage.pageHeader).toContainText('Identify your account');
      await seIdentificationPage.stepFragment.validateStep('2');
    });

    test('Submit an empty form', async ({ seIdentificationPage }) => {
      await seIdentificationPage.nextButton.click();
      const messages = await seIdentificationPage.validationError.allValidationErrors();
      const acceptedMessages = [
        'You must enter a valid date of birth',
        'You must enter a valid account number',
        'You must enter a valid social security number',
      ];
      expect.soft(messages).toStrictEqual(acceptedMessages);
    });

    test('Submit incorrect information', async ({ seIdentificationPage }) => {
      await selectMockScenario('postEnrollmentResponse', '400IdentificationReIssue');
      await seIdentificationPage.fillInAccountDetails(seIdentificationPage.generateAccount());
      await seIdentificationPage.progressToNextStep();
      const errorHeading = 'Incorrect details provided';
      const errorContent = 'Please take your time and ensure your details are correct before trying again';
      expect.soft(await seIdentificationPage.alerts.alertHeading.textContent()).toContain(errorHeading);
      expect.soft(await seIdentificationPage.alerts.alertContent.textContent()).toContain(errorContent);
    });

    test('Use card details instead of SSN', async ({ seIdentificationPage }) => {
      await seIdentificationPage.switchCardOrSSN.click();
      expect.soft(await seIdentificationPage.cardNoField.isVisible()).toBeTruthy();
    });

    test('Speak with an advisor modal', async ({ seIdentificationPage }) => {
      await seIdentificationPage.csrModalFragment.modalOpenButton.click({ delay: 500 });
      await seIdentificationPage.csrModalFragment.modal.waitFor({ state: 'visible' });
      expect.soft(await seIdentificationPage.csrModalFragment.modal.isVisible()).toBeTruthy();

      const modalHeading = 'Having problems?';
      const modalContent = "If you're having problems while registering, call us on";
      expect.soft(await seIdentificationPage.csrModalFragment.modalHeader.textContent()).toContain(modalHeading);
      expect.soft(await seIdentificationPage.csrModalFragment.modalContent.textContent()).toContain(modalContent);
    });

    test('Submit correct information', async ({ seIdentificationPage, seTwoFASelectionPage }) => {
      await selectMockScenario('postEnrollmentResponse', 'twoFASelection');
      await seIdentificationPage.fillInAccountDetails(seIdentificationPage.generateAccount());
      await seIdentificationPage.progressToNextStep();
      await seTwoFASelectionPage.stepFragment.validateStep('3');
      expect.soft(await seTwoFASelectionPage.pageHeader.textContent()).toContain('2-Step Verification');
    });
  });

  test.describe('Two FA Selection Page', () => {
    test.beforeEach(async ({ seTwoFASelectionPage }) => {
      await seTwoFASelectionPage.open();
    });

    test('Two Fa Selection Page layout', async ({ seTwoFASelectionPage }) => {
      await expect.soft(seTwoFASelectionPage.pageHeader).toContainText('2-Step Verification:');
      await seTwoFASelectionPage.stepFragment.validateStep('3');
      await expect.soft(seTwoFASelectionPage.emailVerificationMethod).toBeVisible();
      await expect.soft(seTwoFASelectionPage.emailVerificationIcon).toBeVisible();
      await expect.soft(seTwoFASelectionPage.smsVerificationMethod).toBeVisible();
      await expect.soft(seTwoFASelectionPage.smsVerificationIcon).toBeVisible();
      await expect.soft(seTwoFASelectionPage.csrModalFragment.modalOpenButton).toBeVisible();
    });

    test('Verify data is masked', async ({ seTwoFASelectionPage }) => {
      await expect.soft(seTwoFASelectionPage.emailVerificationText).toContainText('xxxxxxxyz@backbase.com');
      await expect.soft(seTwoFASelectionPage.smsVerificationText).toContainText('xxxxxx789');
    });

    test('Progress from 2FA Selection to 2FA Verify', async ({ seTwoFASelectionPage, seTwoFAEntryPage }) => {
      await selectMockScenario('postEnrollmentResponse', 'twoFAEntryEmail');
      await seTwoFASelectionPage.progressToNextStepWithEmail();
      await expect.soft(seTwoFAEntryPage.pageHeader).toContainText('Your code is on its way!');
    });
  });

  test.describe('Two FA Entry Page', () => {
    test('Two Fa Entry Page common layout', async ({ seTwoFAEntryPage }) => {
      await seTwoFAEntryPage.open();
      await expect.soft(seTwoFAEntryPage.pageHeader).toContainText('Your code is on its way!');
      await seTwoFAEntryPage.stepFragment.validateStep('4');
    });

    test('Two Fa Entry Page layout - Email', async ({ seTwoFAEntryPage }) => {
      await seTwoFAEntryPage.open();
      await seTwoFAEntryPage.checkChannelInfoIsVisible();
      await expect.soft(seTwoFAEntryPage.channelText).toContainText('xxxxxxxyz@backbase.com');
    });

    test('Two Fa Entry Page layout - SMS', async ({ seTwoFAEntryPage }) => {
      await seTwoFAEntryPage.open('twoFAEntrySMS');
      await seTwoFAEntryPage.checkChannelInfoIsVisible();
      await expect.soft(seTwoFAEntryPage.channelText).toContainText('xxxxxx789');
    });

    test('Try a different verification method', async ({ seTwoFAEntryPage, seTwoFASelectionPage }) => {
      await seTwoFAEntryPage.open();
      await selectMockScenario('postEnrollmentResponse', 'twoFASelection');
      await seTwoFAEntryPage.tryAnotherMethod.click();
      await seTwoFASelectionPage.stepFragment.validateStep('3');

      await selectMockScenario('postEnrollmentResponse', 'twoFAEntrySMS');
      await seTwoFASelectionPage.progressToNextStepWithSMS();
      await seTwoFAEntryPage.stepFragment.validateStep('4');
      await seTwoFAEntryPage.checkChannelInfoIsVisible();
      await expect.soft(seTwoFAEntryPage.channelText).toContainText('xxxxxx789');
    });

    test('Progress from 2FA Entry to Create Username', async ({ seTwoFAEntryPage, seCreateUsernamePage }) => {
      await seTwoFAEntryPage.open();
      await selectMockScenario('postEnrollmentResponse', 'username');
      await seTwoFAEntryPage.progressToNextStep();
      await expect.soft(seCreateUsernamePage.pageHeader).toContainText('Create a username');
    });
  });

  test.describe('Create Username Page', () => {
    const invalidUsernameMessage = 'You must enter a valid username';

    test.beforeEach(async ({ seCreateUsernamePage }) => {
      await seCreateUsernamePage.open();
    });

    test('Create Username page layout', async ({ seCreateUsernamePage }) => {
      await expect.soft(seCreateUsernamePage.pageHeader).toContainText('Create a username');
      await seCreateUsernamePage.stepFragment.validateStep('5');
    });

    test('Enter an invalid username - blacklist', async ({ seCreateUsernamePage }) => {
      await selectMockScenario('postEnrollmentResponse', '400UsernameReIssue');
      await seCreateUsernamePage.setUsername(seCreateUsernamePage.usernames.blacklisted);
      await seCreateUsernamePage.progressToNextStep();
      await expect
        .soft(seCreateUsernamePage.validationErrorsFragment.errorMessage)
        .toContainText(invalidUsernameMessage);
    });
  });

  test.describe('Enrollment Status Page', () => {
    test('Enrollment Status page shows loading state', async ({ seCheckStatusPage }) => {
      await seCheckStatusPage.open();
      await expect.soft(seCheckStatusPage.startedHeader).toBeVisible();
      await expect.soft(seCheckStatusPage.loadingState).toBeVisible();
    });

    test('Enrollment Status page shows complete state', async ({ seCheckStatusPage }) => {
      await seCheckStatusPage.open('complete');
      await expect.soft(seCheckStatusPage.completeHeader).toBeVisible();
      await expect.soft(seCheckStatusPage.successImage).toBeVisible();
      await expect.soft(seCheckStatusPage.completeInfo).toBeVisible();
      await expect.soft(seCheckStatusPage.loginLink).toBeVisible();
    });

    test('Enrollment Status page shows failed state', async ({ seCheckStatusPage }) => {
      await seCheckStatusPage.open('failed');
      await expect.soft(seCheckStatusPage.failedHeader).toBeVisible();
      await expect.soft(seCheckStatusPage.failedImage).toBeVisible();
      await expect.soft(seCheckStatusPage.failedInfo).toBeVisible();
      await expect.soft(seCheckStatusPage.restartLink).toBeVisible();
    });
  });
});
