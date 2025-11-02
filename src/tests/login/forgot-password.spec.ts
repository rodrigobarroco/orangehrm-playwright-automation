import { test, expect } from '@playwright/test';

import { LoginPage, ForgotPasswordPage } from '@base';

test.describe('Forgot Password Flow', () => {
  test('User can navigate to Reset Password and request link', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    await loginPage.page.getByText('Forgot your password?').click();
    await page.waitForURL(/requestPasswordResetCode/);

    const resetPage = new ForgotPasswordPage(page);

    await expect(resetPage.header).toBeVisible();
    await expect(resetPage.usernameLabel).toBeVisible();
    await expect(resetPage.cancelButton).toBeVisible();
    await expect(resetPage.resetButton).toBeVisible();

    await resetPage.requestPasswordReset('Admin');

    await resetPage.verifyConfirmationMessage();
  });
});
