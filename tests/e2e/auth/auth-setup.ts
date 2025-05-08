import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test as setup } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const authFile = path.join(__dirname, 'user.json');

if (!fs.existsSync(path.dirname(authFile))) {
  fs.mkdirSync(path.dirname(authFile), { recursive: true });
}

setup('authenticate', async ({ page, context }) => {
  console.log('Starting authentication setup...');
  const baseURL = 'http://localhost:5173';

  await page.goto(baseURL);

  await page.waitForLoadState('networkidle', { timeout: 30000 });

  const usernameInput = page.locator('input[name="username"]');
  const passwordInput = page.locator('input[name="password"]');

  if ((await usernameInput.isVisible()) && (await passwordInput.isVisible())) {
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

  await page.waitForLoadState('networkidle', { timeout: 30000 });

  const isLoggedIn = await page
    .locator('body')
    .textContent()
    .then(text => text && /dashboard/i.test(text));

  if (!isLoggedIn) {
    throw new Error('Authentication failed - login unsuccessful');
  }

  await context.storageState({ path: authFile });
  console.log('Authentication successful, state saved');
});
