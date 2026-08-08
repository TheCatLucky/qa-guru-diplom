import { test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInputName = 'Article Title';
    this.descriptionInputName = 'What\'s this article about?';
    this.contentInputName = 'Write your article (in markdown)';
    this.publishButton = page.getByRole('button', { name: 'Update Article' });
  }

  async updateArticle({ title, description, content }) {
    return test.step('Отредактировать статью', async () => {
      await this.clickAndFill(this.titleInputName, title);
      await this.clickAndFill(this.descriptionInputName, description);
      await this.clickAndFill(this.contentInputName, content);

      await this.publishButton.click();
    });
  }

  async clickAndFill(name, value) {
    await this.page.getByRole('textbox', { name }).click();
    await this.page.getByRole('textbox', { name }).fill(value);
  }
}
