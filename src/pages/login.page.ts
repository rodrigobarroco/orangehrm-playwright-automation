import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly logo: Locator;
  readonly headerLogo: Locator;
  readonly heading: Locator;
  readonly usernameRequiredMsg: Locator;
  readonly passwordRequiredMsg: Locator;
  readonly invalidCredentialsAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByText('Forgot your password?');
    this.logo = page.getByRole('img', { name: 'orangehrm-logo' });
    this.headerLogo = page.getByRole('img', { name: 'company-branding' });
    this.heading = page.getByRole('heading', { name: 'Login' });

    // Error & validation messages
    this.usernameRequiredMsg = page.getByText('UsernameRequired', { exact: true });
    this.passwordRequiredMsg = page.getByText('PasswordRequired', { exact: true });
    this.invalidCredentialsAlert = page
      .getByRole('alert')
      .locator('div')
      .filter({ hasText: /^Invalid credentials$/ });
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/login');
    await expect(this.heading).toBeVisible();
    await expect(this.logo).toBeVisible();
  }

  async login(username: string, password: string) {
    if (username) await this.usernameInput.fill(username);
    if (password) await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertOnLoginPage() {
    await expect(this.heading).toHaveText(/Login/i);
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async expectInvalidCredentials() {
    await expect(this.invalidCredentialsAlert).toBeVisible();
  }

  async expectRequiredMessages(usernameEmpty: boolean, passwordEmpty: boolean) {
    if (usernameEmpty) {
      await expect(this.usernameRequiredMsg).toBeVisible();
    }
    if (passwordEmpty) {
      await expect(this.passwordRequiredMsg).toBeVisible();
    }
  }
}
