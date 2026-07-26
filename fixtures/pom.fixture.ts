import { test as base } from '@playwright/test';
import { PomManager } from '../pages/ManagePage';
import { validUser } from '../test-data/validUser';

type PomFixtures = {
  pm: PomManager;
  validUser: typeof validUser;
};

export const test = base.extend<PomFixtures>({
  pm: async ({ page }, use) => {
    await use(new PomManager(page));
  },
  validUser
});

export { expect } from '@playwright/test';
