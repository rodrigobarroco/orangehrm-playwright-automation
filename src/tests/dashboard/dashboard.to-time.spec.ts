import { test, expect } from '@base';

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
  test('should navigate from Time at Work to Punch In page', async ({
    page,
    auth,
    dashboard,
    timePage,
  }) => {
    await auth.loginAsAdmin();
    await dashboard.goto();
    await dashboard.openTimeAtWork();

    await expect(page).toHaveURL(/attendance\/punchIn/);
    await expect(timePage.punchInHeader).toBeVisible();
    await expect(timePage.noteInput).toBeVisible();
    await expect(timePage.datePickerIcon).toBeVisible();
    await expect(timePage.clockIcon).toBeVisible();
    await expect(timePage.punchInButton).toBeVisible();
  });
});
