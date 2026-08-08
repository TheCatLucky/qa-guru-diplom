import { test } from '@playwright/test';

export class ArticlePage {
  constructor(page) {
    this.page = page;
    this.articleHeading = page.locator('.article-page').locator('h1');
    this.articleContent = page.locator('.article-page').locator('.article-content');
    this.tagList = page.getByRole('list').and(page.locator('.tag-list'));
    this.editArticleButton = page.locator('div[class="banner"]').getByRole('button', { name: 'Edit Article' });
    this.commentInput = page.getByRole('textbox', { name: 'Write a comment...' });
    this.postCommentButton = page.getByRole('button', { name: 'Post Comment' });
    this.lastCommentCard = page.locator('.card').last()
      .locator('.card-block');
  }

  getArticleHeading() {
    return this.articleHeading;
  }

  getArticleContent() {
    return this.articleContent;
  }

  getTagList() {
    return this.tagList;
  }

  getLastCommentCard() {
    return this.lastCommentCard;
  }

  async clickEditArticleButton() {
    return test.step('Перейти на страницу редактирования статьи', async () => {
      await this.editArticleButton.click();
    });
  }

  async postComment(comment) {
    return test.step('Опубликовать комментарий к статье', async () => {
      await this.commentInput.click();
      await this.commentInput.fill(comment);

      await this.postCommentButton.click();
    });
  }
}
