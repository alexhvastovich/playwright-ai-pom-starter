// spec: specs/login.md
// seed: seeds/login.seed.spec.ts

import { test } from '../../fixtures/pom.fixture';

test.describe('Authentication / Login', () => {
  test('AUTH-LOGIN-001 accepts documented demo credentials', async ({ pm, validUser }) => {
    await pm.loginPage.open();
    await pm.loginPage.expectLoaded();
    await pm.loginPage.login(validUser.username, validUser.password);
    await pm.securePage.expectLoaded();
  });
});
