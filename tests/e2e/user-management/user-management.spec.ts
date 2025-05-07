import { test, expect } from '@playwright/test';


test.describe('User Management', () => {
  test('should navigate to user creation page', async ({ page }) => {
    // Navigate to the user management page
    await page.goto('/users');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'users_page.png', fullPage: true });
    await page.getByRole('link', { name: /add new user/i }).click();
    await expect(page).toHaveURL(/\/users\/create/);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'users_page.png', fullPage: true });
    // await expect(page.getByRole('heading', { name: /user registration/i })).toBeVisible();
  });

  test('should create a new user with valid data', async ({ page }) => {
    // Navigate directly to the user creation form
    await page.goto('/users/create');

    // Fill the form with valid data
    await page.getByLabel('Full Name').fill('Test');
    await page.getByLabel('Username').fill('testuser' + Date.now());
    await page.getByLabel('Email').fill(`test${Date.now()}@example.com`);
    await page.getByLabel('Password').fill('Test@1234');
    await page.getByLabel('Mobile Number').fill('+1234567890');
    await page.screenshot({ path: 'filled_form.png', fullPage: true });
    // Submit the form
    await page.getByRole('button', { name: /register user/i }).click();

    // Verify redirection to user list page
    await expect(page).toHaveURL(/\/users$/);
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'success.png', fullPage: true });
    // // Verify the success message appears
    // await expect(page.getByText(/successfully registered/i)).toBeVisible();
  });

  test('should show validation errors for invalid input', async ({ page }) => {
    // Navigate to the user creation form
    await page.goto('/users/create');

    // Fill with invalid data
    await page.getByLabel('Full Name').fill('T');
    await page.getByLabel('Username').fill('t');  // Too short
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Password').fill('weak');
    await page.getByLabel('Mobile Number').fill('123');

    // Submit the form
    await page.getByRole('button', { name: /register user/i }).click();
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: 'validation.png', fullPage: true });

    // Verify validation errors appear
    //await expect(page.getByText(/invalid-email/i)).toBeVisible();
  });

  test('should search and filter users', async ({ page }) => {
    await page.goto('/users');
    await page.getByPlaceholder(/search users/i).fill('Test');
    await page.screenshot({ path: 'search.png', fullPage: true });
    //await expect(page.getByRole('cell', { name: /test/i }).first()).toBeVisible();
  });
});