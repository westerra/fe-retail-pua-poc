import { PlaywrightTestArgs, PlaywrightTestOptions, test as baseTest } from '@playwright/test';

import { Config, UserData, UserType } from './lib/data';
import {
  LoginState,
  getStorageStatePathForUser,
  isReloginRequired,
  readFile,
  augmentPageWithBaasHeader,
  authenticateUser,
} from './lib/utils';
import { pageFixtures, PageFixtures } from './lib/fixtures/page-fixtures';

export type CommonFixtures = TestOptions &
  PageFixtures &
  ConfigurationFixtures &
  PlaywrightTestArgs &
  PlaywrightTestOptions;
export type UseFunction = (...args: any[]) => Promise<void>;

export interface TestOptions {
  configPath: string;
  testUserType: UserType;
  loginState: LoginState;
}

export interface ConfigurationFixtures {
  config: Config;
  testUser: UserData;
}

export const test = baseTest.extend<CommonFixtures>({
  ...pageFixtures,
  configPath: ['', { option: true }],
  loginState: [LoginState.loggedIn, { option: true }],
  testUserType: [UserType.userWithSingleContext, { option: true }],

  config: async ({ configPath }, use) => {
    const configObject = readFile<Config>(configPath);
    await use(configObject);
  },
  baseURL: async ({ config }, use) => {
    await use(config.baseUrl);
  },
  testUser: async ({ config, testUserType }, use) => {
    await use(config.users[testUserType]);
  },
  storageState: async ({ testUser, config, loginState }, use) => {
    const sessionStoragePath = getStorageStatePathForUser(testUser.username);
    if (loginState === LoginState.loggedIn && (await isReloginRequired(sessionStoragePath))) {
      await authenticateUser(testUser, config);
      await use(sessionStoragePath);
    } else if (loginState === LoginState.loggedIn) {
      await use(sessionStoragePath);
    } else {
      await use({ cookies: [], origins: [] });
    }
  },
  page: async ({ page, config }, use) => {
    await augmentPageWithBaasHeader(page, config);
    await page.goto(config.baseUrl);
    await use(page);
  },
});

export const expect = test.expect;
