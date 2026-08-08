import { test } from '@playwright/test';

export class ChallengerService {
  constructor(request) {
    this.request = request;
    this.path = 'challenger';
  }

  async post() {
    return test.step(`POST /${this.path}`, async () => {
      const response = await this.request.post(`${process.env.API_URL}/${this.path}`);

      const status = await response.status();
      const headers = await response.headers();

      return {
        status,
        headers
      };
    });
  }
}
