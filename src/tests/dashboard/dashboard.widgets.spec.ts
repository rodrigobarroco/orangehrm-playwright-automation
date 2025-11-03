import { test } from '@base';

/**
 * Scenario: Dashboard renders core widgets, sidebar, and topbar correctly
 *
 * Given I am logged in as "Admin"
 * When I navigate to the Dashboard
 * Then I should see all core dashboard widgets visible:
 *   | Time at Work |
 *   | My Actions |
 *   | Quick Launch |
 *   | Buzz Latest Posts |
 *   | Employees on Leave Today |
 *   | Employee Distribution by Sub Unit |
 *   | Employee Distribution by Location |
 * And the sidebar should display the full navigation menu:
 *   | Search | Admin | PIM | Leave | Time | Recruitment | My Info |
 *   | Performance | Dashboard | Directory | Maintenance | Claim | Buzz |
 * And the topbar should be visible with user info and brand banner
 */

test.describe('Dashboard layout validation', () => {
  test('should render core widgets, sidebar, and topbar correctly', async ({ auth, dashboard }) => {
    await auth.loginAsAdmin();
    await dashboard.goto();

    await dashboard.sidebar.expectVisible();
    await dashboard.sidebar.expectMenuItemsVisible();

    await dashboard.topbar.expectVisible();
    await dashboard.topbar.expectUserInfoVisible();

    await dashboard.expectWidgetsVisible();
  });
});
