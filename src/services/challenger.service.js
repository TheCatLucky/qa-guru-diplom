import { test } from '@playwright/test';

export class ChallengerService {
  constructor(request) {
    this.request = request;
    this.path = 'challenger';
  }

  async post() {
    return test.step(`POST /${this.path}`, async () => {
      const response = await this.request.post(`${process.env.API_URL}/${this.path}`);

      const status = response.status();
      const headers = response.headers();

      return {
        status,
        headers
      };
    });
  }
}
