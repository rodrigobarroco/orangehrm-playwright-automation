import { test, expect, users } from '@base';

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
    {
      username: users.admin.username,
      password: users.admin.password,
      outcome: 'Redirects to Dashboard',
    },
    {
      username: users.admin.username,
      password: users.invalid.password,
      outcome: 'Shows "Invalid credentials"',
    },
    {
      username: users.invalid.username,
      password: users.admin.password,
      outcome: 'Shows "Invalid credentials"',
    },
    {
      username: users.empty.username,
      password: users.admin.password,
      outcome: 'Shows "Required" for Username',
    },
    {
      username: users.admin.username,
      password: users.empty.password,
      outcome: 'Shows "Required" for Password',
    },
    {
      username: users.empty.username,
      password: users.empty.password,
      outcome: 'Shows "Required" for both fields',
    },
  ];

  for (const { username, password, outcome } of examples) {
    test(`username="${username}" / password="${password}" → ${outcome}`, async ({ loginPage }) => {
      await loginPage.goto();
      await loginPage.login(username, password);

      if (outcome.includes('Redirects')) {
        await expect.soft(loginPage.page).toHaveURL(/dashboard/);
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
