import { test as base } from '@playwright/test';
import { App } from '../../pages';
import { Api } from '../../services';
import { TodoBuilder } from '../builders';
import { API_TOKEN_KEY } from './../constants';

let cachedToken = null;

export const test = base.extend({
  app: async ({ page }, use) => {
    const app = new App(page);
    await app.mainPage.goTo();
    await use(app);
  },
  api: async ({ request }, use) => {
    const api = new Api(request);
    await use(api);
  },
  token: async ({ api }, use) => {
    if (cachedToken) {
      await use(cachedToken);

      return;
    }

    const { status, headers } = await api.challenger.post();
    cachedToken = headers[API_TOKEN_KEY];
    await use(cachedToken);
  },
  createdTodo: async ({ api, token }, use) => {
    let createdTodo = new TodoBuilder()
      .withTitle()
      .withDoneStatus(false)
      .withDescription()
      .build();
    const { status, body } = await api.todoList.post({
      token,
      data: createdTodo
    });

    createdTodo.id = body.id;
    await use(createdTodo);
  }
});
