import { ArticlePage } from './article.page';
import { AuthenticatedPage } from './authenticated.page';
import { LoginPage } from './login.page';
import { MainPage } from './main.page';
import { NewArticlePage } from './newArticle.page';
import { RegisterPage } from './register.page';
import { UserProfilePage } from './userProfile.page';
import { UserProfileSettingsPage } from './userProfileSettings.page';
import { EditArticlePage } from './editArticle.page';

export class App {
  constructor(page) {
    this.page = page;
    this.articlePage = new ArticlePage(page);
    this.authenticatedPage = new AuthenticatedPage(page);
    this.loginPage = new LoginPage(page);
    this.mainPage = new MainPage(page);
    this.newArticlePage = new NewArticlePage(page);
    this.registerPage = new RegisterPage(page);
    this.editArticlePage = new EditArticlePage(page);
    this.userProfilePage = new UserProfilePage(page);
    this.userProfileSettingsPage = new UserProfileSettingsPage(page);
  }
}
