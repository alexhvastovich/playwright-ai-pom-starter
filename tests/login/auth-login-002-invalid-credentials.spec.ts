// spec: specs/login.md
// seed: seeds/login.seed.spec.ts

import { test } from '../../fixtures/pom.fixture';

test.describe('Authentication / Login', () => {
  test('AUTH-LOGIN-002 rejects incorrect credentials', async ({ pm }) => {
    await pm.loginPage.open();
    await pm.loginPage.login('BestStudent', 'not-the-password');
    await pm.loginPage.expectError('Invalid credentials. Please try again.');
  });
});
