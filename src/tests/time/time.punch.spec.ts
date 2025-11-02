import { test, expect, AuthActions, TimePage } from '@base';

/**
 * Scenario: User performs Punch In and Punch Out successfully
 *
 * Given I am on the Attendance > Punch In page
 * When I enter the following values:
 *   | Date | <today> |
 *   | Time | 08:00 AM |
 *   | Note | Test punch in |
 * And I click the "In" button
 * Then I should see a success toast message saying "Successfully Saved" at the bottom left
 * And the page should reload showing:
 *   | field            | expected value |
 *   | Punched In Time  | 08:00 AM       |
 *   | Punched In Note  | Test punch in  |
 * When I enter the following values:
 *   | Date | <today>   |
 *   | Time | 05:00 PM  |
 *   | Note | Test punch out |
 * And I click the "Out" button
 * Then I should see a success toast message saying "Successfully Saved"
 * And the page should reload showing:
 *   | field             | expected value |
 *   | Punched Out Time  | 05:00 PM       |
 *   | Punched Out Note  | Test punch out |
 */

test.describe('Time Tracking - Punch In/Out Workflow', () => {
  test('User performs Punch In and Punch Out successfully', async ({ page }) => {
    const auth = new AuthActions(page);
    const timePage = new TimePage(page);

    // Step 1: Log in as Admin and navigate to Punch In page
    await auth.loginAsAdmin();
    await timePage.goto();

    // Step 2: Perform Punch In
    await timePage.punchIn('08:00 AM', 'Test punch in');
    await expect(timePage.successMessage).toBeVisible();

    // Step 3: Perform Punch Out
    await timePage.punchOut('05:00 PM', 'Test punch out');
    await expect(timePage.successMessage).toBeVisible();
  });
});
