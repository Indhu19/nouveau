
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

/**
 * See https://playwright.dev/docs/test-configuration.
 */

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, 'tests', 'e2e', 'auth', 'user.json');

const authDir = path.dirname(authFile);
if (!fs.existsSync(authDir)) {
  fs.mkdirSync(authDir, { recursive: true });
}

const baseURL = process.env.BASE_URL ?? 'http://localhost:5173';

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/global-setup.ts',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], storageState: authFile }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], storageState: authFile },
    },
  //
  //   /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'], storageState: authFile },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 15 Pro'], storageState: authFile},
      //  dependencies: ['setup'],
      // testIgnore: ['**/auth-setup.ts'],
    },

    /* Test against Tablet viewports. */
    {
      name: 'iPad',
      use: { ...devices['iPad Pro 11'], storageState: authFile},
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge', storageState: authFile},
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome', storageState: authFile },
    },
   ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'docker compose up -d -f PATH_TO_DOCKER_COMPOSE_FILE --build && docker compose logs -f',
  //   url: 'http://127.0.0.1:8000',
  //   reuseExistingServer: !process.env.CI,
  // },

});
