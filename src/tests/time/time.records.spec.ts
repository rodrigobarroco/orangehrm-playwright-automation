import { test, expect, AuthActions, TimePage } from '@base';

/**
 * Feature: Time Module – My Records
 * These tests validate editing and deleting of existing attendance records.
 */

test.describe('Time Module – Attendance Records', () => {
  /**
   * Scenario: Edit an existing Punch In/Out record successfully
   *
   * Given I am on the Attendance > My Records page
   * And a record exists for the selected date
   * When I click the edit icon for that record
   * And update the Punch Out Note field
   * Then I should see a success toast message saying "Successfully Updated"
   * And the updated note should appear in the records table
   */
  test('should edit an existing Punch In/Out record', async ({ page }) => {
    const auth = new AuthActions(page);
    const timePage = new TimePage(page);

    // Step 1: Login and navigate to My Records
    await auth.loginAsAdmin();
    await timePage.openMyRecords();

    // Step 2: Ensure there's a record listed
    await expect(timePage.recordRow).toBeVisible();

    // Step 3: Edit and update note
    await timePage.editRecord('Updated punch out note');

    // Step 4: Validate success message
    await expect(timePage.successMessage).toBeVisible();
  });

  /**
   * Scenario: Delete an existing Punch record and confirm deletion
   *
   * Given I am on the Attendance > My Records page
   * And at least one Punch record exists
   * When I click the delete icon for a record
   * And confirm the deletion
   * Then I should see a success toast saying "Successfully Deleted"
   * And the record should no longer appear in the table
   */
  test('should delete an existing Punch record successfully', async ({ page }) => {
    const auth = new AuthActions(page);
    const timePage = new TimePage(page);

    // Step 1: Login and navigate to My Records
    await auth.loginAsAdmin();
    await timePage.openMyRecords();

    // Step 2: Delete the first record
    await timePage.deleteRecord();

    // Step 3: Validate success message and absence of record
    await expect(timePage.successMessage).toBeVisible();
    await expect(timePage.recordRow).not.toBeVisible();
  });
});
