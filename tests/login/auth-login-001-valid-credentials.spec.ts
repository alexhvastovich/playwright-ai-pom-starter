// spec: specs/login.md
// seed: seeds/login.seed.spec.ts

import { test } from '../../fixtures/pom';

test.describe('Authentication / Login', () => {
  test('AUTH-LOGIN-001 accepts documented demo credentials', async ({ pm }) => {
    await pm.login.open();
    await pm.login.expectLoaded();
    await pm.login.login('BestStudent', 'Password123!');
    await pm.login.expectLoginSucceeded();
    await pm.secure.expectLoaded();
  });
});
