import { test, expect, LoginPage, users } from '@base';

/**
 * Scenario Outline: Login outcomes matrix for common combinations
 *
 * Given I am on the OrangeHRM login page
 * When I enter username "<username>" and password "<password>" and click "Login"
 * Then the outcome should be "<outcome>"
 *
 * Examples:
 * | username | password  | outcome                                |
 * | Admin    | admin123  | Redirects to Dashboard                  |
 * | Admin    | wrong     | Shows "Invalid credentials"             |
 * | wrong    | admin123  | Shows "Invalid credentials"             |
 * |          | admin123  | Shows "Required" for Username           |
 * | Admin    |           | Shows "Required" for Password           |
 * |          |           | Shows "Required" for both fields        |
 */

test.describe('Login Outcomes Matrix', () => {
  const examples = [
    { username: users.admin.username, password: users.admin.password, outcome: 'Redirects to Dashboard' },
    { username: users.admin.username, password: users.invalid.password, outcome: 'Shows "Invalid credentials"' },
    { username: users.invalid.username, password: users.admin.password, outcome: 'Shows "Invalid credentials"' },
    { username: users.empty.username, password: users.admin.password, outcome: 'Shows "Required" for Username' },
    { username: users.admin.username, password: users.empty.password, outcome: 'Shows "Required" for Password' },
    { username: users.empty.username, password: users.empty.password, outcome: 'Shows "Required" for both fields' },
  ];

  for (const { username, password, outcome } of examples) {
    test(`${outcome} → username="${username}" / password="${password}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      // Step 1: Navigate to login page
      await loginPage.goto();

      // Step 2: Fill in credentials
      await loginPage.login(username, password);

      // Step 3: Validate outcome based on test data
      if (outcome.includes('Redirects')) {
        await expect(page).toHaveURL(/dashboard/);
      } else if (outcome.includes('Invalid')) {
        await loginPage.expectInvalidCredentials();
        await loginPage.assertOnLoginPage();
      } else if (outcome.includes('Required')) {
        const usernameEmpty = username === '';
        const passwordEmpty = password === '';
        await loginPage.expectRequiredMessages(usernameEmpty, passwordEmpty);
        await loginPage.assertOnLoginPage();
      }
    });
  }
});
