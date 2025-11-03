import { test, expect } from '@base';

/**
 * Scenario: User performs Punch In and Punch Out successfully
 *
 * Given I am on the Attendance > Punch In page
 * When I enter the following values:
 *   | Date | <today> |
 *   | Time | 08:00 AM |
 *   | Note | Test punch in |
 * And I click the "In" button
 * Then I should see a success toast message saying "Successfully Saved"
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

test.describe('Time Module → Time Punch Creation', () => {
  test('@punch User performs Punch In and Punch Out successfully', async ({ timePage }) => {
    await timePage.goto();

    await timePage.punchIn('08:00 AM', 'Test punch in');
    await expect(timePage.successSavedMessage).toBeVisible();

    await timePage.punchOut('05:00 PM', 'Test punch out');
    await expect(timePage.successSavedMessage).toBeVisible();
  });
});
