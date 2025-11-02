import { test, expect, AuthActions, DashboardPage, TimePage } from '@base';

/**
 * Scenario: "Time at Work" clock icon navigates to Attendance > Punch In page
 *
 * Given I am logged in as "Admin" and the "Time at Work" widget is visible on the Dashboard
 * When I click the clock icon on the "Time at Work" widget
 * Then I should be navigated to the Attendance > Punch In page
 * And I should see the Punch In form with fields:
 *   | Date | Time | Note |
 * And the page title should display "Punch In"
 * And the URL should contain "/attendance/punchIn"
 */

test.describe('Dashboard → Time navigation', () => {
  test('should navigate from Time at Work to Punch In page', async ({ page }) => {
    const auth = new AuthActions(page);
    const dashboard = new DashboardPage(page);
    const timePage = new TimePage(page);

    // Step 1: Log in as Admin
    await auth.loginAsAdmin();

    // Step 2: Go to Dashboard and click the Time at Work clock icon
    await dashboard.goto();
    await dashboard.openTimeAtWork();

    // Step 3: Validate navigation to Punch In page
    await expect(page).toHaveURL(/attendance\/punchIn/);
    await expect(timePage.punchInHeader).toBeVisible();
    await expect(timePage.noteInput).toBeVisible();

    // Optional sanity checks
    await expect(timePage.datePickerIcon).toBeVisible();
    await expect(timePage.clockIcon).toBeVisible();
    await expect(timePage.punchInButton).toBeVisible();
  });
});