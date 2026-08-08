import { test } from '@playwright/test';

export class TodoService {
  constructor(request) {
    this.request = request;
    this.path = 'todo';
  }

  async get(token) {
    return test.step(`GET /${this.path}`, async () => {
      const response = await this.request.get(`${process.env.API_URL}/${this.path}`, {
        headers: {
          'x-challenger': token
        }
      });

      const status = response.status();
      const statusText = response.statusText();

      return {
        status,
        statusText
      };
    });
  }
}
