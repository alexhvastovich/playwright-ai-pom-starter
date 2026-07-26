import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://alexusadays.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      testDir: './tests',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'agent-seed',
      testDir: './seeds',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});

