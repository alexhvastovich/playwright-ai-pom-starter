import { test } from '../fixtures/pom';

test.describe('Login practice agent seed', () => {
  test('opens the login environment for Playwright Test Agents', async ({ pm }) => {
    await pm.login.open();
    await pm.login.expectLoaded();
  });
});
