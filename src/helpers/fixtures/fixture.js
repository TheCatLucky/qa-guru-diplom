import { test as base } from '@playwright/test';
import { App } from '../../pages';
import { Api } from '../../services';

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.mainPage.goTo();
    await use(app);
  },
  api: async ({ request }, use) => {
    const api = new Api(request);
    await use(api);
  }
});
