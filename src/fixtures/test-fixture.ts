import { test as base } from '@playwright/test';

import { AuthActions } from '@base';

export const test = base.extend<{
  auth: AuthActions;
}>({
  auth: async ({ page }, use) => {
    const auth = new AuthActions(page);
    await use(auth);
  },
});
