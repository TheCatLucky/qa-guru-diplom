import { faker } from '@faker-js/faker';

export class ArticleBuilder {
  withTitle() {
    this.title = faker.lorem.sentence(5);

    return this;
  }

  withDescription() {
    this.description = faker.lorem.sentence(10);

    return this;
  }

  withContent() {
    this.content = faker.lorem.paragraphs(3);

    return this;
  }

  withTags() {
    this.tags = Array.from({ length: 3 }).map(() => faker.word.noun())
      .join(',');

    return this;
  }

  build() {
    return { ...this };
  }
}
