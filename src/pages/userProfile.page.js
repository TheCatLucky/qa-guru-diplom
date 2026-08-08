import { test } from '@playwright/test';

export class UserProfilePage {
  constructor(page) {
    this.page = page;
    this.userHeading = page.locator('.user-info').locator('h4');
    this.userImage = page.locator('.user-info').locator('img');
    this.userBio = page.locator('.user-info').locator('p');
    this.firstArticlePreview = page.locator('.article-preview').first();
    this.firstArticleHeading = this.firstArticlePreview.getByRole('link').locator('h1');
    this.firstAddToFavoritesButton = this.firstArticlePreview.getByRole('button');
    this.firstAddToFavoritesButtonCount = this.firstAddToFavoritesButton.locator('.counter');
  }

  getUserHeading() {
    return this.userHeading;
  }

  getUserImage() {
    return this.userImage;
  }

  getUserBio() {
    return this.userBio;
  }

  getFirstArticleHeading() {
    return this.firstArticleHeading;
  }

  getFirstAddToFavoritesButton() {
    return this.firstAddToFavoritesButton;
  }

  async clickFirstAddToFavoritesButton() {
    return test.step('Добавить или исключить первую статью из избранного', async () => {
      await this.firstAddToFavoritesButton.click();
    });
  }

  getFirstAddToFavoritesButtonText() {
    return this.firstAddToFavoritesButton.textContent();
  };

  async getFirstAddToFavoritesButtonCount() {
    const text = await this.getFirstAddToFavoritesButtonText();

    if (text) {
      const number = text.match(/\d+/)?.[0] ?? -1;

      return Number(number);
    }

    return -1;
  }
}
