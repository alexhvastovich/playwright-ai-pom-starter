import { test } from '../fixtures/pom.fixture';

test.describe('Login practice agent seed', () => {
  test('opens the login environment for Playwright Test Agents', async ({ pm }) => {
    await pm.loginPage.open();
    await pm.loginPage.expectLoaded();
  });
});
