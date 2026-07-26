import { Page, test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SecurePage } from '../pages/SecurePage';

export class PageManager {
  private loginPage?: LoginPage;
  private securePage?: SecurePage;

  constructor(private readonly page: Page) {}

  get login(): LoginPage {
    return this.loginPage ??= new LoginPage(this.page);
  }

  get secure(): SecurePage {
    return this.securePage ??= new SecurePage(this.page);
  }
}

export const test = base.extend<{ pm: PageManager }>({
  pm: async ({ page }, use) => {
    await use(new PageManager(page));
  }
});

export { expect } from '@playwright/test';
