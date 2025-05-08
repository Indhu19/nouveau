import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { chromium } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, 'e2e', 'auth', 'user.json');

export default async function globalSetup() {
  const setupTimeout = setTimeout(() => {
    console.error('Global setup timed out');
    process.exit(1);
  }, 120000); // 2 minutes

  try {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    const baseURL = process.env.BASE_URL ?? 'http://localhost:5173';

    console.log('Starting global authentication setup...');
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle', { timeout: 50000 });
    await page.screenshot({ path: 'home-page.png', fullPage: true });

    const usernameInput = page.locator('input[name="username"]');
    const passwordInput = page.locator('input[name="password"]');

    if ((await usernameInput.isVisible()) && (await passwordInput.isVisible())) {
      console.log('Auth0 login form detected');
      await usernameInput.fill(process.env.AUTH0_USERNAME ?? '');
      await passwordInput.fill(process.env.AUTH0_PASSWORD ?? '');

      const submitButton = page.locator('button[name="action"][value="default"]');

      if (await submitButton.isVisible()) {
        await submitButton.click();
      } else {
        throw new Error('Submit button not found on Auth0 login page');
      }
    } else {
      console.log('Auth0 login form not detected, checking if already logged in');
    }

    await page.waitForLoadState('networkidle', { timeout: 50000 });

    const isLoggedIn = await page
      .locator('body')
      .textContent()
      .then(text => text && /dashboard/i.test(text));
    console.log('isLoggedIn', isLoggedIn);
    await page.screenshot({ path: 'auth-success.png', fullPage: true });

    if (!isLoggedIn) {
      throw new Error('Authentication failed - login unsuccessful');
    }

    fs.mkdirSync(path.dirname(authFile), { recursive: true });
    await context.storageState({ path: authFile });
    await browser.close();

    console.log('Authentication successful, storage state saved at:', authFile);
  } finally {
    clearTimeout(setupTimeout);
  }
}
