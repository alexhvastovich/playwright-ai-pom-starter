import { Locator, Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected async goto(path: string): Promise<void> {
    await this.page.goto(path);
  }

  protected byTestId(id: string): Locator {
    return this.page.getByTestId(id);
  }
}

