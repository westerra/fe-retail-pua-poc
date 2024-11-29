import { PlaywrightTestConfig, devices } from '@playwright/test';
import { join } from 'path';
import { TestOptions } from '@backbase/retail-e2e';

const localhostLaunchOptions = ['--disable-web-security'];
const defaultLaunchOptions = [];
const localEnv = 'local';
const env = process.env.ENV || localEnv;

const config: PlaywrightTestConfig<TestOptions> = {
  testDir: './src',
  timeout: process.env.CI ? 120 * 1000 : 60 * 1000,
  expect: {
    timeout: 5000,
  },
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : 1,
  use: {
    actionTimeout: 0,
    headless: true,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    configPath: join(__dirname, `config/ret-ref-${env}.config.json`),
  },
  reporter: [
    ['list'],
    ['github'],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'apps/retail-usa-e2e/allure-results',
        suiteTitle: true,
      },
    ],
    ['html', { outputFolder: './html-report' }],
  ],
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1723, height: 896 },
        launchOptions: {
          args: env === localEnv ? localhostLaunchOptions : defaultLaunchOptions,
        },
      },
    },
  ],
};

export default config;
