import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  private get usernameInput(): Locator {
    return this.page.getByLabel('Username');
  }

  private get passwordInput(): Locator {
    return this.page.getByLabel('Password');
  }

  private get submitButton(): Locator {
    return this.byTestId('btn-login');
  }

  private get errorMessage(): Locator {
    return this.byTestId('login-error');
  }

  async open(): Promise<void> {
    await this.goto('/login');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }

  async expectLoaded(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.submitButton).toBeEnabled();
  }

  async expectLoginSucceeded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/secure(?:\.html)?(?:$|[?#])/);
  }

  async expectError(message: string): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
    await expect(this.errorMessage).toContainText(message);
  }
}
