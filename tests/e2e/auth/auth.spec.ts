import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { test, expect } from '@playwright/test';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const authFile = path.join(__dirname, '..', 'playwright', '.auth', 'user.json');

// Verify auth file exists before running test
test.beforeAll(() => {
  if (!fs.existsSync(authFile)) {
    throw new Error(`Auth file not found at ${authFile}. Auth setup may have failed.`);
  }
  console.log('Auth file exists, proceeding with tests');
});

test.describe('Authentication', () => {
  test('authenticated user can access protected routes', async ({ page }) => {
    // Go to the home page
    await page.goto('http://localhost:5173');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Take screenshot to verify state
    await page.screenshot({ path: 'auth-test-result.png', fullPage: true });

    // This should now fail if we're not authenticated
    await expect(page.locator('body')).toContainText(/dashboard/i, {
      timeout: 10000
    });
    await page.screenshot({ path: 'auth-test.png', fullPage: true });
  });
});