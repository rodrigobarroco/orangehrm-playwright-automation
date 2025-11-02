import { Page, Locator, expect } from '@playwright/test';

export class ForgotPasswordPage {
  readonly page: Page;
  readonly header: Locator;
  readonly usernameLabel: Locator;
  readonly usernameInput: Locator;
  readonly cancelButton: Locator;
  readonly resetButton: Locator;
  readonly confirmationMessage: Locator;
  readonly noteMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByRole('heading', { name: 'Reset Password' });
    this.usernameLabel = page.getByText('Username', { exact: true });
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
    this.resetButton = page.getByRole('button', { name: 'Reset Password' });
    this.confirmationMessage = page.getByText(
      'Reset Password link sent successfullyA reset password link has been sent to you',
    );
    this.noteMessage = page.getByText(
      'Note: If the email does not arrive, please contact your OrangeHRM Administrator.',
      { exact: false },
    );
  }

  async goto() {
    await this.page.goto('/web/index.php/auth/requestPasswordResetCode');
    await expect(this.header).toBeVisible();
  }

  async requestPasswordReset(username: string) {
    await this.usernameInput.fill(username);
    await this.resetButton.click();
    await this.page.waitForURL(/sendPasswordReset/);
  }

  async verifyConfirmationMessage() {
    await expect(this.page).toHaveURL(/sendPasswordReset/);
    await expect(
      this.page.getByRole('heading', { name: 'Reset Password link sent successfully' }),
    ).toBeVisible();

    await expect(this.noteMessage).toBeVisible();
  }
}
