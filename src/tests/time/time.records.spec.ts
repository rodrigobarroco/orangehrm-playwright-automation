import { test, expect } from '@base';

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
  test('@records should edit an existing Punch In/Out record', async ({ timePage }) => {
    await timePage.openMyRecords();

    await expect(timePage.recordRow.first()).toBeVisible();

    await timePage.editRecord('Updated punch out note');
  });

  /**
   * Scenario: Delete existing Punch records from My Records page
   *
   * Given there is at least one existing Punch record
   * When I navigate to Attendance > My Records
   * And I select all records and confirm deletion
   * Then I should see a success toast message "Successfully Deleted"
   * And the records table should be empty
   */

  test('@records should delete all existing Punch records successfully', async ({ timePage }) => {
    await timePage.openMyRecords();

    await timePage.deleteAllRecords();

    await expect(timePage.successDeletedMessage).toBeVisible();
    await expect(timePage.recordRow.first()).not.toBeVisible();
  });
});
