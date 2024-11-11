import { chromium, FullConfig } from '@playwright/test';

const globalSetup = async (config: FullConfig) => {
  const { baseURL, storageState } = config.projects[0].use;
  const browser = await chromium.launch();
  const context = await browser.newContext({ acceptDownloads: true });

  if (!(baseURL && storageState)) {
    throw new Error('Base URL and page state storage should be defined in context');
  }

  const page = await context.newPage();
  await page.context().storageState({ path: storageState as string });
  await context.close();
  await browser.close();
};

export default globalSetup;
