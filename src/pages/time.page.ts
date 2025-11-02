import { Page, Locator, expect } from '@playwright/test';

export class TimePage {
  readonly page: Page;

  // Common fields
  readonly punchInHeader: Locator;
  readonly punchOutHeader: Locator;
  readonly datePickerIcon: Locator;
  readonly clockIcon: Locator;
  readonly noteInput: Locator;
  readonly punchInButton: Locator;
  readonly punchOutButton: Locator;
  readonly successMessage: Locator;

  // My Records section
  readonly attendanceMenu: Locator;
  readonly myRecordsOption: Locator;
  readonly recordRow: Locator;
  readonly editButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteModal: Locator;
  readonly confirmDeleteButton: Locator;
  readonly durationValue: Locator;

  constructor(page: Page) {
    this.page = page;

    // Punch In/Out selectors
    this.punchInHeader = page.getByRole('heading', { name: 'Punch In' });
    this.punchOutHeader = page.getByRole('heading', { name: 'Punch Out' });
    this.datePickerIcon = page.locator('.oxd-icon.bi-calendar');
    this.clockIcon = page.locator('.oxd-icon.bi-clock');
    this.noteInput = page.getByRole('textbox', { name: 'Type here' });
    this.punchInButton = page.getByRole('button', { name: 'In' });
    this.punchOutButton = page.getByRole('button', { name: 'Out' });
    this.successMessage = page.getByText('SuccessSuccessfully Saved×');

    // Navigation + My Records
    this.attendanceMenu = page.getByLabel('Topbar Menu').getByText('Attendance');
    this.myRecordsOption = page.getByRole('menuitem', { name: 'My Records' });
    this.recordRow = page.locator('div.oxd-table-body > div > div');
    this.editButton = page.locator('div.oxd-table-body button:nth-child(2) > i');
    this.deleteButton = page.locator('div.oxd-table-body button:nth-child(1) > i');
    this.confirmDeleteModal = page.getByRole('dialog', { name: 'Are you sure?' });
    this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
    this.durationValue = page.getByText('8.00', { exact: true });
  }

  async goto() {
    await this.page.goto('/web/index.php/attendance/punchIn');
    await expect(this.punchInHeader).toBeVisible();
  }

  async openMyRecords() {
    await this.attendanceMenu.click();
    await this.myRecordsOption.click();
    await expect(this.page).toHaveURL(/attendance\/viewMyAttendanceRecord/);
  }

  async punchIn(time: string, note: string) {
    await this.clockIcon.click();
    await this.noteInput.fill(note);
    await this.punchInButton.click();
  }

  async punchOut(time: string, note: string) {
    await this.clockIcon.click();
    await this.noteInput.fill(note);
    await this.punchOutButton.click();
  }

  async editRecord(note: string) {
    await this.editButton.click();
    const noteField = this.page.getByRole('textbox', { name: 'Type here' });
    await noteField.fill(note);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async deleteRecord() {
    await this.deleteButton.click();
    await expect(this.confirmDeleteModal).toBeVisible();
    await this.confirmDeleteButton.click();
  }
}
