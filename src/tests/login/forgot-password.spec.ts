import { test, expect, LoginPage, ForgotPasswordPage } from '@base';

/**
 * Scenario: Forgot Password navigates to reset screen and confirms request
 *
 * Given I am on the OrangeHRM login page
 * When I click "Forgot your password?"
 * Then I should be navigated to the "Reset Password" screen at
 *   "/web/index.php/auth/requestPasswordResetCode"
 * And I should see the "Reset Password" header and the username field
 * When I enter username "Admin" and click "Reset Password"
 * Then I should see a confirmation message containing
 *   "Reset Password link sent successfully"
 */

test.describe('Forgot Password Flow', () => {
  test('User can navigate to Reset Password and request link', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Step 1: Navigate to login page
    await loginPage.goto();

    // Step 2: Click the "Forgot your password?" link
    await loginPage.page.getByText('Forgot your password?').click();
    await page.waitForURL(/requestPasswordResetCode/);

    // Step 3: Validate Reset Password page elements
    const resetPage = new ForgotPasswordPage(page);
    await expect(resetPage.header).toBeVisible();
    await expect(resetPage.usernameLabel).toBeVisible();
    await expect(resetPage.cancelButton).toBeVisible();
    await expect(resetPage.resetButton).toBeVisible();

    // Step 4: Submit a valid username for password reset
    await resetPage.requestPasswordReset('Admin');

    // Step 5: Validate confirmation message after successful request
    await resetPage.verifyConfirmationMessage();
  });
});
