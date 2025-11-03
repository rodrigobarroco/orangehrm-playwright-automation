import { test, expect } from '@base';

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

test.describe('Time Module → Duplicate Prevention', () => {
  test('@punch should prevent duplicate Punch In entries', async ({ timePage }) => {
    await timePage.goto();

    await timePage.punchIn('08:00 AM', 'Test punch in');
    await expect(timePage.successSavedMessage).toBeVisible();

    await timePage.punchIn('08:00 AM', 'Test duplicate punch in');

    const overlappingMessage = timePage.page.getByText('Overlapping Records Found');
    await expect(overlappingMessage).toBeVisible();
  });
});
