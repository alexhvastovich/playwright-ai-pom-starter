import { test } from '../fixtures/pom';

test.describe('Login practice seed', () => {
  test('seed', async ({ pm }) => {
    await pm.login.open();
  });
});
