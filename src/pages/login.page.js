import { test } from '@playwright/test';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInputName = 'Email';
    this.passwordInputName = 'Password';
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  async signIn({ email, password }) {
    return test.step('Авторизоваться под учетной записью', async () => {
      await this.clickAndFill(this.emailInputName, email);
      await this.clickAndFill(this.passwordInputName, password);

      await this.loginButton.click();
    });
  }

  async clickAndFill(name, value) {
    await this.page.getByRole('textbox', { name }).click();
    await this.page.getByRole('textbox', { name }).fill(value);
  }
}
