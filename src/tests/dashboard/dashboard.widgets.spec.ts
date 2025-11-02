import { test, AuthActions, DashboardPage } from '@base';

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
  test('Dashboard renders core widgets, sidebar, and topbar correctly', async ({ page }) => {
    const auth = new AuthActions(page);
    const dashboard = new DashboardPage(page);

    // Step 1: Login as Admin user
    await auth.loginAsAdmin();

    // Step 2: Navigate to Dashboard
    await dashboard.goto();

    // Step 3: Validate sidebar visibility and menu items
    await dashboard.sidebar.expectVisible();
    await dashboard.sidebar.expectMenuItemsVisible();

    // Step 4: Validate topbar visibility and user info section
    await dashboard.topbar.expectVisible();
    await dashboard.topbar.expectUserInfoVisible();

    // Step 5: Validate all core dashboard widgets are visible
    await dashboard.expectWidgetsVisible();
  });
});
