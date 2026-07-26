import { Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export class PageManager {
  private loginPage?: LoginPage;

  constructor(private readonly page: Page) {}

  get login(): LoginPage {
    return this.loginPage ??= new LoginPage(this.page);
  }
}

export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page }, use) => {
    await use(new PageManager(page));
  }
});

export { expect } from '@playwright/test';
