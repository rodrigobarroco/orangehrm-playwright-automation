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
  readonly successSavedMessage: Locator;
  readonly successDeletedMessage: Locator;

  // My Records section
  readonly attendanceMenu: Locator;
  readonly myRecordsOption: Locator;
  readonly recordRow: Locator;
  readonly editButton: Locator;
  readonly deleteAllButton: Locator;
  readonly confirmDeleteButton: Locator;
  readonly durationValue: Locator;
  readonly goToTime: Locator;
  readonly selectAllRecords: Locator;
  readonly editModal: Locator;
  readonly noteField: Locator;
  readonly saveButton: Locator;
  readonly successUpdatedMessage: Locator;

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
    this.successSavedMessage = page.getByText('SuccessSuccessfully Saved×');
    this.successDeletedMessage = page.getByText('SuccessSuccessfully Deleted×');

    // Navigation + My Records
    this.attendanceMenu = page.getByLabel('Topbar Menu').getByText('Attendance');
    this.myRecordsOption = page.getByRole('menuitem', { name: 'My Records' });
    this.recordRow = page.locator('.oxd-table-body > div');
    this.editButton = page.locator('div.oxd-table-body button:nth-child(2) > i');
    this.deleteAllButton = page.getByRole('button', { name: ' Delete Selected' });
    this.confirmDeleteButton = page.getByRole('button', { name: ' Yes, Delete' });
    this.durationValue = page.getByText('8.00', { exact: true });
    this.goToTime = page.getByRole('link', { name: 'Time' });
    this.selectAllRecords = page.locator('.oxd-icon.bi-check').first();
    this.editModal = page.locator('.oxd-dialog');
    this.noteField = page.getByRole('textbox', { name: 'Type here' }).first();
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.successUpdatedMessage = page.getByText('SuccessSuccessfully Updated×');
  }

  async goto() {
    await this.page.goto('/web/index.php/attendance/punchIn');
    await expect(this.punchInHeader).toBeVisible();
  }

  async openMyRecords() {
    await this.goToTime.click();
    await this.attendanceMenu.click();
    await this.myRecordsOption.click();
    await expect(this.page).toHaveURL(/attendance\/viewMyAttendanceRecord/);
  }

  async punchIn(time: string, note: string) {
    // select date
    await this.datePickerIcon.click();
    await this.page.getByText('Today').click();

    // select hour
    await this.clockIcon.click();

    const [hour, minuteWithPeriod] = time.split(':');
    const [minute, period] = minuteWithPeriod.split(' ');

    await this.page.getByRole('textbox').nth(3).fill(hour.padStart(2, '0'));
    await this.page.getByRole('textbox').nth(4).fill(minute.padStart(2, '0'));

    if (period.toUpperCase() === 'AM') {
      await this.page.locator('input[name="am"]').check();
    } else {
      await this.page.locator('input[name="pm"]').check();
    }

    await this.clockIcon.click();
    await this.noteInput.fill(note);
    await this.punchInButton.click();
  }

  async punchOut(time: string, note: string) {
    // Select date
    await this.datePickerIcon.click();
    await this.page.getByText('Today').click();

    // Select hour
    await this.clockIcon.click();

    const [hour, minuteWithPeriod] = time.split(':');
    const [minute, period] = minuteWithPeriod.split(' ');

    await this.page.getByRole('textbox').nth(3).fill(hour.padStart(2, '0'));
    await this.page.getByRole('textbox').nth(4).fill(minute.padStart(2, '0'));

    if (period.toUpperCase() === 'AM') {
      await this.page.locator('input[name="am"]').check();
    } else {
      await this.page.locator('input[name="pm"]').check();
    }

    await this.clockIcon.click();
    await this.noteInput.fill(note);
    await this.punchOutButton.click();
  }

  async editRecord(note: string) {
    await this.editButton.first().click();
    await this.noteField.fill(note);
    await this.saveButton.click();
    await expect(this.successUpdatedMessage).toBeVisible();
  }

  async deleteAllRecords() {
    await this.selectAllRecords.click();
    await this.deleteAllButton.click();
    await expect(this.confirmDeleteButton).toBeVisible();
    await this.confirmDeleteButton.click();
    await expect(this.successDeletedMessage).toBeVisible();
  }
}
