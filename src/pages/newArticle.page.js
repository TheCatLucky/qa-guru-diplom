import { test } from '@playwright/test';

export class NewArticlePage {
  constructor(page) {
    this.page = page;
    this.titleInputName = 'Article Title';
    this.descriptionInputName = 'What\'s this article about?';
    this.contentInputName = 'Write your article (in markdown)';
    this.tagsInputName = 'Enter tags';
    this.publishButton = page.getByRole('button', { name: 'Publish Article' });
  }

  async createNewArticle({ title, description, content, tags }) {
    return test.step('Создать статью', async () => {
      await this.clickAndFill(this.titleInputName, title);
      await this.clickAndFill(this.descriptionInputName, description);
      await this.clickAndFill(this.contentInputName, content);
      await this.clickAndFill(this.tagsInputName, tags);

      await this.publishButton.click();
    });
  }

  async clickAndFill(name, value) {
    await this.page.getByRole('textbox', { name }).click();
    await this.page.getByRole('textbox', { name }).fill(value);
  }
}
