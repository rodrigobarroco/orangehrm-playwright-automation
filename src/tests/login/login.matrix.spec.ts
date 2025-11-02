import { test, expect } from '@playwright/test';

import { LoginPage, users } from '@base';

test.describe('Login Outcomes Matrix', () => {
  const examples = [
    {
      username: users.admin.username,
      password: users.admin.password,
      outcome: 'Redirects to Dashboard',
    },
    { username: users.admin.username, password: 'wrong', outcome: 'Shows "Invalid credentials"' },
    { username: 'wrong', password: users.admin.password, outcome: 'Shows "Invalid credentials"' },
    { username: '', password: users.admin.password, outcome: 'Shows "Required" for Username' },
    { username: users.admin.username, password: '', outcome: 'Shows "Required" for Password' },
    { username: '', password: '', outcome: 'Shows "Required" for both fields' },
  ];
  for (const { username, password, outcome } of examples) {
    test(`${outcome} → username="${username}" / password="${password}"`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      await loginPage.goto();
      await loginPage.login(username, password);

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
