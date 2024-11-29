import { CommonFixtures, UseFunction } from '../../fixtures';
import {
  SelfEnrollmentCheckStatusPage,
  SelfEnrollmentCreateUsernamePage,
  SelfEnrollmentIdentificationPage,
  SelfEnrollmentInstructionsPage,
  SelfEnrollmentTwoFactorEntryPage,
  SelfEnrollmentTwoFactorSelectionPage,
} from '../page-objects';

export interface SelfEnrollmentPageFixtures {
  seCheckStatusPage: SelfEnrollmentCheckStatusPage;
  seCreateUsernamePage: SelfEnrollmentCreateUsernamePage;
  seIdentificationPage: SelfEnrollmentIdentificationPage;
  seInstructionsPage: SelfEnrollmentInstructionsPage;
  seTwoFAEntryPage: SelfEnrollmentTwoFactorEntryPage;
  seTwoFASelectionPage: SelfEnrollmentTwoFactorSelectionPage;
}

export const selfEnrollmentFixtures = {
  seInstructionsPage: async ({ page, config }: CommonFixtures, use: UseFunction) => {
    await use(new SelfEnrollmentInstructionsPage(page, config));
  },
  seCheckStatusPage: async ({ page, config }: CommonFixtures, use: UseFunction) => {
    await use(new SelfEnrollmentCheckStatusPage(page, config));
  },
  seCreateUsernamePage: async ({ page, config }: CommonFixtures, use: UseFunction) => {
    await use(new SelfEnrollmentCreateUsernamePage(page, config));
  },
  seIdentificationPage: async ({ page, config }: CommonFixtures, use: UseFunction) => {
    await use(new SelfEnrollmentIdentificationPage(page, config));
  },
  seTwoFAEntryPage: async ({ page, config }: CommonFixtures, use: UseFunction) => {
    await use(new SelfEnrollmentTwoFactorEntryPage(page, config));
  },
  seTwoFASelectionPage: async ({ page, config }: CommonFixtures, use: UseFunction) => {
    await use(new SelfEnrollmentTwoFactorSelectionPage(page, config));
  },
};
