import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, 'user.json');
const baseURL = process.env.BASE_URL ?? 'http://localhost:5173';

// Verify auth file exists before running test
test.beforeAll(() => {
  if (!fs.existsSync(authFile)) {
    throw new Error(`Auth file not found at ${authFile}. Auth setup may have failed.`);
  }
  console.log('Auth file exists, proceeding with tests');
});

test.describe('Authentication', () => {
  test('authenticated user can access protected routes', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');
    await expect(page.locator('body')).toContainText(/dashboard/i, {
      timeout: 10000,
    });
  });
});
