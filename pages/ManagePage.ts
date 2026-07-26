import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { SecurePage } from './SecurePage';

/**
 * Test-scoped lazy Page Object manager.
 *
 * A Page Object is constructed on first access and reused for the remainder
 * of the test. Tests never instantiate Page Objects directly.
 */
export class PomManager {
  private login?: LoginPage;
  private secure?: SecurePage;

  constructor(private readonly page: Page) {}

  get loginPage(): LoginPage {
    return this.login ??= new LoginPage(this.page);
  }

  get securePage(): SecurePage {
    return this.secure ??= new SecurePage(this.page);
  }
}
