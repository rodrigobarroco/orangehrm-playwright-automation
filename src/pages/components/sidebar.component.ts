import { Page, Locator, expect } from '@base';

export class SidebarComponent {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly toggleButton: Locator;
  readonly titleLink: Locator;

  readonly menuAdmin: Locator;
  readonly menuPIM: Locator;
  readonly menuLeave: Locator;
  readonly menuTime: Locator;
  readonly menuRecruitment: Locator;
  readonly menuMyInfo: Locator;
  readonly menuPerformance: Locator;
  readonly menuDashboard: Locator;
  readonly menuDirectory: Locator;
  readonly menuMaintenance: Locator;
  readonly menuClaim: Locator;
  readonly menuBuzz: Locator;

  constructor(page: Page) {
    this.page = page;

    // Core elements
    this.searchInput = page.getByRole('textbox', { name: 'Search' });
    this.toggleButton = page.getByRole('button', { name: '' });
    this.titleLink = page.getByRole('link', { name: 'client brand banner' });

    // Menu items
    this.menuAdmin = page.getByRole('link', { name: 'Admin' });
    this.menuPIM = page.getByRole('link', { name: 'PIM' });
    this.menuLeave = page.getByRole('link', { name: 'Leave' });
    this.menuTime = page.getByRole('link', { name: 'Time' });
    this.menuRecruitment = page.getByRole('link', { name: 'Recruitment' });
    this.menuMyInfo = page.getByRole('link', { name: 'My Info' });
    this.menuPerformance = page.getByRole('link', { name: 'Performance' });
    this.menuDashboard = page.getByRole('link', { name: 'Dashboard' });
    this.menuDirectory = page.getByRole('link', { name: 'Directory' });
    this.menuMaintenance = page.getByRole('link', { name: 'Maintenance' });
    this.menuClaim = page.getByRole('link', { name: 'Claim' });
    this.menuBuzz = page.getByRole('link', { name: 'Buzz' });
  }

  async expectVisible() {
    await expect(this.titleLink).toBeVisible();
    await expect(this.searchInput).toBeVisible();
    await expect(this.toggleButton).toBeVisible();
  }

  async expectMenuItemsVisible() {
    const menuItems = [
      this.menuAdmin,
      this.menuPIM,
      this.menuLeave,
      this.menuTime,
      this.menuRecruitment,
      this.menuMyInfo,
      this.menuPerformance,
      this.menuDashboard,
      this.menuDirectory,
      this.menuMaintenance,
      this.menuClaim,
      this.menuBuzz,
    ];

    for (const item of menuItems) {
      await expect(item).toBeVisible();
    }
  }

  async getAllMenuTexts(): Promise<string[]> {
    const allLinks = await this.page.getByRole('link').allTextContents();
    return allLinks.filter((t) => !!t.trim());
  }

  async clickMenuItem(name: string) {
    await this.page.getByRole('link', { name }).click();
  }

  async toggleSidebar() {
    await this.toggleButton.click();
  }
}
