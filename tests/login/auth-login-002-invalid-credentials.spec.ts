// spec: specs/login.md
// seed: tests/seed.spec.ts

import { test } from '../../fixtures/pom';

test.describe('Authentication / Login', () => {
  test('AUTH-LOGIN-002 rejects incorrect credentials', async ({ pm }) => {
    await pm.login.open();
    await pm.login.login('BestStudent', 'not-the-password');
    await pm.login.expectError('Invalid credentials. Please try again.');
  });
});
