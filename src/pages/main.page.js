import { test } from '@playwright/test';

export class MainPage {
  constructor(page) {
    this.page = page;
    this.baseUrl = process.env.APP_URL;
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.loginLink = page.getByRole('link', { name: 'Login' });
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  async goTo() {
    return test.step('Перейти на Главную страницу', async () => {
      await this.page.goto('');
    });
  }

  async goToRegister() {
    return test.step('Перейти на страницу регистрации', async () => {
      await this.signUpLink.click();
    });
  }

  async goToLogin() {
    return test.step('Перейти на страницу авторизации', async () => {
      await this.loginLink.click();
    });
  };
}
