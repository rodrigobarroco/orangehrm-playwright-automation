import { test, expect, AuthActions, DashboardPage, TimePage } from '@base';

/**
 * Scenario: "Time at Work" clock icon navigates to Attendance > Punch In page
 *
 * Given I am logged in as "<user>"
 * And the "Time at Work" widget is visible on the Dashboard
 * When I click the blue clock icon on the "Time at Work" widget
 * Then I should be navigated to the Attendance > Punch In page
 * And I should see the Punch In form with the following fields:
 *   | field |
 *   | Date  |
 *   | Time  |
 *   | Note  |
 * And the page title should display "Punch In"
 * And the URL should contain "/attendance/punchIn"
 */

test.describe('Dashboard → Time Navigation', () => {
  test('Time at Work clock icon navigates to Punch In page', async ({ page }) => {
    const auth = new AuthActions(page);
    const dashboard = new DashboardPage(page);
    const timePage = new TimePage(page);

    // Step 1: Log in as Admin
    await auth.loginAsAdmin();

    // Step 2: Navigate to Dashboard
    await dashboard.goto();

    // Step 3: Click the "Time at Work" clock icon
    await dashboard.openTimeAtWork();

    // Step 4: Validate navigation to Attendance > Punch In page
    await expect(page).toHaveURL(/attendance\/punchIn/);

    // Step 5: Validate Punch In header is visible
    await expect(timePage.punchInHeader).toBeVisible();
  });
});
