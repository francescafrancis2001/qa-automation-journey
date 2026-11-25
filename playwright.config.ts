import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

const env = process.env.TEST_ENV || 'dev';
const envFile = path.resolve(__dirname, `.env.${env}`);
if (!fs.existsSync(envFile)) {
  throw new Error(`Environment file not found: .env.${env}`);
}
dotenv.config({ path: envFile });

// Files that the browser projects must NOT run
const browserIgnore = ['**/*.setup.ts', '**/*.loggedin.spec.ts', '**/api/**'];

export default defineConfig({
  testDir: './tests',
  timeout: 90000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    navigationTimeout: 60000,
  },
  projects: [
    { name: 'setup', testMatch: '**/*.setup.ts' },
    { name: 'api', testMatch: '**/api/**/*.spec.ts' },
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: browserIgnore },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] }, testIgnore: browserIgnore },
    { name: 'webkit', use: { ...devices['Desktop Safari'] }, testIgnore: browserIgnore },
    { name: 'chrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' }, testIgnore: browserIgnore },
    {
      name: 'logged-in',
      testMatch: '**/*.loggedin.spec.ts',
      use: { ...devices['Desktop Chrome'], storageState: 'playwright/.auth/standard.json' },
      dependencies: ['setup'],
    },
  ],
});