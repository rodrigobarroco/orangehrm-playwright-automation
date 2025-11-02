import { test, expect, AuthActions, TimePage } from '@base';

/**
 * Scenario: Prevent Punch In with overlapping or duplicate records
 *
 * Given I am on the Attendance > Punch In page
 * And an existing Punch In record already exists for date "<date>" at "<time>"
 * When I enter the following values again:
 *   | Date | <date> |
 *   | Time | <time> |
 *   | Note | Test duplicate punch in |
 * And I click the "In" button
 * Then I should see an inline validation error under the Time field saying "Overlapping Records Found"
 * And I should see an inline validation error under the Date field saying "Overlapping Records Found"
 * And the record should not be saved again
 */

test.describe('Time Tracking - Duplicate Prevention', () => {
  test('Prevent duplicate Punch In entries', async ({ page }) => {
    const auth = new AuthActions(page);
    const timePage = new TimePage(page);

    // Step 1: Log in as Admin and navigate to Punch In page
    await auth.loginAsAdmin();
    await timePage.goto();

    // Step 2: Attempt to create a duplicate Punch In record
    await timePage.punchIn('08:00 AM', 'Test duplicate punch in');

    // Step 3: Validate overlapping record message appears
    const overlappingMessage = page.getByText('Overlapping Records Found');
    await expect(overlappingMessage).toBeVisible();
  });
});