import { test } from '@playwright/test';
import { MainPage } from './main.page';

export class AuthenticatedPage extends MainPage {
  constructor(page) {
    super(page);
    this.profileDropdown = page.getByRole('listItem').and(page.locator('.dropdown'));
    this.profileLink = this.profileDropdown.getByRole('link', { name: 'Profile' });
    this.settingsLink = this.profileDropdown.getByRole('link', { name: 'Settings' });
    this.newArticlePageLink = page.getByRole('link', { name: 'New Article' });
  }

  getProfileDropdown() {
    return this.profileDropdown;
  }

  async clickDropdownProfileLink() {
    return test.step('Перейти в профиль пользователя', async () => {
      await this.profileDropdown.click();
      await this.profileLink.click();
    });
  }

  async clickDropdownSettingsLink() {
    return test.step('Перейти в настройки профиля пользователя', async () => {
      await this.profileDropdown.click();
      await this.settingsLink.click();
    });
  }

  async getNewArticlePagePath() {
    return this.newArticlePageLink.getAttribute('href');
  };

  async clickNewArticlePageLink() {
    return test.step('Перейти на страницу создания новой статьи', async () => {
      await this.newArticlePageLink.click();
    });
  }
}
