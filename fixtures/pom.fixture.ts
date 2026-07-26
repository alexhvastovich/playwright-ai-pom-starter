import { test as base } from '@playwright/test';
import { PomManager } from '../pages/ManagePage';

type PomFixtures = {
  pm: PomManager;
};

export const test = base.extend<PomFixtures>({
  pm: async ({ page }, use) => {
    await use(new PomManager(page));
  }
});

export { expect } from '@playwright/test';
