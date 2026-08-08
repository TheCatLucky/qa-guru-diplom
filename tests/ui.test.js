import { expect } from '@playwright/test';
import { test, ArticleBuilder, UserBuilder, CommentBuilder } from '../src/helpers';

test.describe('UI тесты', () => {
  let currentUser;

  test.beforeEach(async ({ app }) => {
    currentUser = new UserBuilder()
      .withUsername()
      .withEmail()
      .withPassword()
      .build();

    await app.mainPage.goToRegister();
    await app.registerPage.signUp(currentUser);
  });

  test.describe('Базовый функционал: Авторизованный пользователь ', () => {
    test('может изменить данные своего профиля', async ({ app }) => {
      const user = new UserBuilder()
        .withEmail()
        .withUsername()
        .withPassword()
        .withBio()
        .build();

      await app.authenticatedPage.clickDropdownSettingsLink();
      await app.userProfileSettingsPage.updateUserProfileSettings(user);

      await expect(app.authenticatedPage.getProfileDropdown()).toContainText(user.username);

      await app.authenticatedPage.clickDropdownProfileLink();

      await expect(app.userProfilePage.getUserHeading()).toContainText(user.username);
      await expect(app.userProfilePage.getUserBio()).toContainText(user.bio);

      await app.authenticatedPage.clickDropdownSettingsLink();
      await app.userProfileSettingsPage.resetUserProfileSettings(currentUser);
    });

    test('может создать статью', async ({ page, app }) => {
      const newArticlePath = await app.authenticatedPage.getNewArticlePagePath();

      const article = new ArticleBuilder().withTitle()
        .withDescription()
        .withContent()
        .withTags()
        .build();

      await app.authenticatedPage.clickNewArticlePageLink();

      await expect(page).toHaveURL(app.authenticatedPage.getBaseUrl() + newArticlePath);

      await app.newArticlePage.createNewArticle(article);

      await expect(app.articlePage.getArticleHeading()).toContainText(article.title);
      await expect(app.articlePage.getArticleContent()).toContainText(article.content);

      for (const tag of article.tags.split(',')) {
        await expect(app.articlePage.getTagList()).toContainText(tag);
      }
    });
  });

  test.describe('Работа с статей: Авторизованный пользователь', () => {
    let initialArticle;

    test.beforeEach(async ({ app }) => {
      initialArticle = new ArticleBuilder().withTitle()
        .withDescription()
        .withContent()
        .withTags()
        .build();

      await app.authenticatedPage.clickNewArticlePageLink();

      await app.newArticlePage.createNewArticle(initialArticle);
    });

    test('может отредактировать статью', async ({ app }) => {
      const article = new ArticleBuilder().withTitle()
        .withDescription()
        .withContent()
        .build();

      await expect(app.articlePage.getArticleHeading()).toContainText(initialArticle.title);

      await app.articlePage.clickEditArticleButton();

      await app.editArticlePage.updateArticle(article);

      await expect(app.articlePage.getArticleHeading()).toContainText(article.title);
      await expect(app.articlePage.getArticleContent()).toContainText(article.content);
    });

    test('может добавить и удалить статью из Избранного', async ({ app }) => {
      await expect(app.articlePage.getArticleHeading()).toContainText(initialArticle.title);

      await app.authenticatedPage.clickDropdownProfileLink();

      await expect(app.userProfilePage.getFirstArticleHeading()).toContainText(initialArticle.title);
      await expect(app.userProfilePage.getFirstAddToFavoritesButton()).toBeVisible();

      const initialText = await app.userProfilePage.getFirstAddToFavoritesButtonText();
      const initialCount = await app.userProfilePage.getFirstAddToFavoritesButtonCount();

      await app.userProfilePage.clickFirstAddToFavoritesButton();

      await expect(app.userProfilePage.getFirstAddToFavoritesButton()).toContainClass('active');
      await expect(app.userProfilePage.getFirstAddToFavoritesButton()).toHaveText(initialText.replace(/\d+/, initialCount + 1));

      await app.userProfilePage.clickFirstAddToFavoritesButton();

      await expect(app.userProfilePage.getFirstAddToFavoritesButton()).not.toContainClass('active');
      await expect(app.userProfilePage.getFirstAddToFavoritesButton()).toHaveText(initialText.replace(/\d+/, initialCount));
    });

    test('может оставить комментарий к своей статье', async ({ app }) => {
      const { text } = new CommentBuilder().withText()
        .build();

      await expect(app.articlePage.getArticleHeading()).toContainText(initialArticle.title);

      await app.articlePage.postComment(text);

      await expect(app.articlePage.getLastCommentCard()).toContainText(text);
    });
  });
});
