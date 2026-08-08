import { test } from '@playwright/test';

export class RegisterPage {
  constructor(page) {
    this.page = page;
    this.usernameInputName = 'Your Name';
    this.emailInputName = 'Email';
    this.passwordInputName = 'Password';
    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
  }

  async signUp({ username, email, password }) {
    return test.step('Зарегистрировать новую учетную запись', async () => {
      await this.clickAndFill(this.usernameInputName, username);
      await this.clickAndFill(this.emailInputName, email);
      await this.clickAndFill(this.passwordInputName, password);

      await this.signUpButton.click();
    });
  }

  async clickAndFill(name, value) {
    await this.page.getByRole('textbox', { name }).click();
    await this.page.getByRole('textbox', { name }).fill(value);
  }
}
