import { test, expect } from '@base';

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
  test('should navigate to Reset Password and confirm request', async ({
    page,
    loginPage,
    forgotPassword,
  }) => {
    await loginPage.goto();
    await loginPage.page.getByText('Forgot your password?').click();
    await page.waitForURL(/requestPasswordResetCode/);

    await expect(forgotPassword.header).toBeVisible();
    await expect(forgotPassword.usernameLabel).toBeVisible();
    await expect(forgotPassword.cancelButton).toBeVisible();
    await expect(forgotPassword.resetButton).toBeVisible();

    await forgotPassword.requestPasswordReset('Admin');
    await forgotPassword.verifyConfirmationMessage();
  });
});
