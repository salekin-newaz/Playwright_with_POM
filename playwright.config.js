// @ts-check
const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
    headless: true,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*login-application\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1536, height: 864 },
      },
    },
    {
      name: 'chromium',
      dependencies: ['setup'],
      testMatch: /.*(logout-application|course-purchase)\.spec\.js/,
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1536, height: 864 },
        screenshot: 'on',
        video: 'on',
        trace: 'on',
        storageState: 'authState.json',
      },
    },
  ],
});
