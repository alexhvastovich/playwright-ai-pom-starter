import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SecurePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get heading(): Locator {
    return this.page.getByRole('heading', {
      name: 'Great Job Getting In! Did you automate it?'
    });
  }

  async expectLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/secure(?:\.html)?(?:$|[?#])/);
    await expect(this.heading).toBeVisible();
  }
}
