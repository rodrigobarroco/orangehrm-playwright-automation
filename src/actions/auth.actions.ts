/**
 * AuthActions
 * - Encapsulates business-level login flows using LoginPage + user data.
 * - Used in higher-level tests (Dashboard, Time, PIM, etc.).
 */

import { Page, expect, LoginPage, users } from '@base';

export class AuthActions {
  readonly page: Page;
  readonly loginPage: LoginPage;

  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(page);
  }

  async loginAsAdmin() {
    await this.loginPage.goto();
    await this.loginPage.login(users.admin.username, users.admin.password);

    await this.page.waitForURL(/dashboard/);
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async loginWith(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }
}
