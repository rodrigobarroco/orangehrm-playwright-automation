import { Page } from '@playwright/test';
import { LoginPage, users } from '@base';

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
  }

  async loginWith(username: string, password: string) {
    await this.loginPage.goto();
    await this.loginPage.login(username, password);
  }
}
