import { Page, Locator, expect } from '@base';

export class TopbarComponent {
  readonly page: Page;
  readonly dashboardTitle: Locator;
  readonly upgradeButton: Locator;
  readonly userDropdownTab: Locator;
  readonly userProfileImage: Locator;
  readonly userName: Locator;
  readonly dropdownIcon: Locator;

  constructor(page: Page) {
    this.page = page;

    // Header title
    this.dashboardTitle = page.locator('div').filter({ hasText: /^Dashboard$/ });
    this.upgradeButton = page.getByRole('button', { name: 'Upgrade' });

    // User dropdown elements
    this.userDropdownTab = page.locator('span.oxd-userdropdown-tab');
    this.userProfileImage = this.userDropdownTab.locator('img.oxd-userdropdown-img');
    this.userName = this.userDropdownTab.locator('p.oxd-userdropdown-name');
    this.dropdownIcon = this.userDropdownTab.locator('i.oxd-userdropdown-icon');
  }

  async expectVisible() {
    await expect(this.dashboardTitle).toBeVisible();
    await expect(this.upgradeButton).toBeVisible();
    await expect(this.userDropdownTab).toBeVisible();
  }

  async expectUserInfoVisible() {
    await expect(this.userProfileImage).toBeVisible();
    await expect(this.userName).toBeVisible();
    await expect(this.dropdownIcon).toBeVisible();
  }

  async openUserDropdown() {
    await this.userDropdownTab.click();
  }

  async getUserName(): Promise<string> {
    return (await this.userName.textContent()) ?? '';
  }
}
