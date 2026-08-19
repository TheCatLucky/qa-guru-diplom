import { test } from '@playwright/test';

export class UserProfileSettingsPage {
  constructor(page) {
    this.page = page;
    this.imageUrlInputName = 'URL of profile picture';
    this.usernameInputName = 'Your Name';
    this.bioInputName = 'Short bio about you';
    this.passwordInputName = 'Password';
    this.updateSettingsButton = page.getByRole('button', { name: 'Update Settings' });
  }

  async updateUserProfileSettings({ username, bio, password }) {
    return test.step('Обновить данные пользователя', async () => {
      await this.clickAndFill(this.usernameInputName, username);
      await this.clickAndFill(this.bioInputName, bio);
      await this.clickAndFill(this.passwordInputName, password);

      await this.updateSettingsButton.click();
    });
  }

  async resetUserProfileSettings({ username, password }) {
    return test.step('Сбросить данные пользователя на состояние по умолчанию', async () => {
      await this.clickAndFill(this.usernameInputName, username);
      await this.clickAndFill(this.bioInputName, '');
      await this.clickAndFill(this.passwordInputName, password);

      await this.updateSettingsButton.click();
    });
  };

  async clickAndFill(name, value) {
    await this.page.getByRole('textbox', { name }).click();
    await this.page.getByRole('textbox', { name }).fill(value);
  }
}
