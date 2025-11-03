import { test as base, expect } from '@playwright/test';

import {
  AuthActions,
  TimePage,
  DashboardPage,
  ForgotPasswordPage,
  TopbarComponent,
  SidebarComponent,
  LoginPage,
} from '@base';

export const test = base.extend<{
  auth: AuthActions;
  timePage: TimePage;
  dashboard: DashboardPage;
  loginPage: LoginPage;
  forgotPassword: ForgotPasswordPage;
  topbar: TopbarComponent;
  sidebar: SidebarComponent;
}>({
  auth: async ({ page }, use) => {
    const auth = new AuthActions(page);
    await use(auth);
  },
  timePage: async ({ page }, use) => {
    const timePage = new TimePage(page);
    await use(timePage);
  },
  dashboard: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
  forgotPassword: async ({ page }, use) => {
    await use(new ForgotPasswordPage(page));
  },
  topbar: async ({ page }, use) => {
    await use(new TopbarComponent(page));
  },
  sidebar: async ({ page }, use) => {
    await use(new SidebarComponent(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

// Cleanup before each test with a @punch Tag
test.beforeEach(async ({ auth, timePage }, testInfo) => {
  if (!testInfo.title.includes('@punch')) return;

  await auth.loginAsAdmin();
  await timePage.openMyRecords();

  await timePage.page.locator('.oxd-table-body').first().waitFor({ state: 'attached' });

  const recordCount = await timePage.recordRow.count();

  if (recordCount > 0) {
    console.log(`🧹 Found ${recordCount} records, deleting all...`);
    await timePage.deleteAllRecords();
    await expect(timePage.successDeletedMessage).toBeVisible();
  } else {
    console.log('✅ No records to delete, continuing...');
  }
});

// Cleanup after each test with a @punch Tag
test.afterEach(async ({ timePage }, testInfo) => {
  if (testInfo.title.includes('@punch')) {
    console.log(`🧹 [Teardown] Cleaning time records after test "${testInfo.title}"...`);
    await timePage.openMyRecords();
    await timePage
      .deleteAllRecords()
      .catch(() => console.warn('⚠️ Cleanup skipped (no records or slow response).'));
  }
});

test.beforeEach(async ({ auth, timePage }, testInfo) => {
  // Run setup only for tests with "@records" Tag
  if (!testInfo.title.includes('@records')) return;

  await auth.loginAsAdmin();
  await timePage.openMyRecords();

  await timePage.page.locator('.oxd-table-body').first().waitFor({ state: 'attached' });

  const recordCount = await timePage.recordRow.count();

  if (recordCount === 0) {
    console.log('🧩 No records found — creating setup Punch In/Out record...');

    await timePage.goto();
    await timePage.punchIn('08:00 AM', 'Test setup punch in');
    await expect(timePage.successSavedMessage).toBeVisible();

    await timePage.punchOut('05:00 PM', 'Test setup punch out');
    await expect(timePage.successSavedMessage).toBeVisible();

    console.log('✅ Setup record created successfully!');
  } else {
    console.log(`📄 Found ${recordCount} existing record(s), skipping setup.`);
  }
});
