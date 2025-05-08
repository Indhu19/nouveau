import { test, expect } from '@playwright/test';

test.describe('User Management', () => {
  test('should navigate to user creation page', async ({ page }) => {
    // Navigate to the user management page
    await page.goto('/users');
    await page.waitForLoadState('networkidle', { timeout: 50000 });
    await page.getByRole('link', { name: /add new user/i }).click();
    await expect(page).toHaveURL(/\/users\/create/);
    await page.waitForLoadState('networkidle', { timeout: 50000 });
    const title = page.locator('[data-slot="card-title"]');
    await expect(title).toHaveText('User Registration');
  });

  test('should create a new user with valid data', async ({ page }) => {
    // Navigate directly to the user creation form
    await page.goto('/users/create');
    await page.screenshot({ path: 'auth-test.png', fullPage: true });
    await page.getByLabel('Full Name').fill('Test');
    await page.getByLabel('Username').fill('testuser' + Date.now().toString());
    await page.getByLabel('Email').fill(`test${Date.now().toString()}@example.com`);
    await page.getByLabel('Password').fill('Test@1234');
    await page.getByLabel('Mobile Number').fill('+1234567890');
    await page.getByRole('button', { name: /register user/i }).click();
    await expect(page).toHaveURL(/\/users$/);
  });

  test.skip('should show validation errors for invalid input', async ({ page }) => {
    // Navigate to the user creation form
    await page.goto('/users/create');

    // Fill with invalid data
    await page.getByLabel('Full Name').fill('T');
    await page.getByLabel('Username').fill('t'); // Too short
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('weak');
    await page.getByLabel('Mobile Number').fill('123');
    await page.getByRole('button', { name: /register user/i }).click();
    await page.waitForLoadState('networkidle', { timeout: 100000 });
    await page.screenshot({ path: 'validation.png', fullPage: true });
    await expect(page.getByText(/invalid-email/i)).toBeVisible();
  });
});
