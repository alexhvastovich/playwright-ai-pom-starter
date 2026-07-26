import { test } from '../../fixtures/pom';

test.describe('Login practice', () => {
  test('accepts the documented demo credentials', async ({ pm }) => {
    await pm.login.open();
    await pm.login.expectLoaded();
    await pm.login.login('BestStudent', 'Password123!');
    await pm.login.expectLoginSucceeded();
  });

  test('rejects incorrect credentials', async ({ pm }) => {
    await pm.login.open();
    await pm.login.login('BestStudent', 'not-the-password');
    await pm.login.expectError('Invalid credentials. Please try again.');
  });
});
