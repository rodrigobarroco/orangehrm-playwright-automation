import { Page, expect, Locator, SidebarComponent, TopbarComponent } from '@base';

export class DashboardPage {
  readonly page: Page;
  readonly sidebar: SidebarComponent;
  readonly topbar: TopbarComponent;
  readonly clockButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sidebar = new SidebarComponent(page);
    this.topbar = new TopbarComponent(page);
    this.clockButton = page.getByRole('button', { name: '' });
  }

  async goto() {
    await this.page.goto('/web/index.php/dashboard/index');
    await expect(this.page).toHaveURL(/dashboard/);
  }

  async openTimeAtWork() {
    await expect(this.clockButton).toBeVisible();
    await this.clockButton.click();
  }

  async expectWidgetsVisible() {
    const widgets = [
      'Time at Work',
      'My Actions',
      'Quick Launch',
      'Buzz Latest Posts',
      'Employees on Leave Today',
      'Employee Distribution by Sub',
      'Employee Distribution by Location',
    ];

    for (const widget of widgets) {
      await expect(this.page.getByText(widget)).toBeVisible();
    }
  }
}
