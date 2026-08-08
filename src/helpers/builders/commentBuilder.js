import { faker } from '@faker-js/faker';

export class CommentBuilder {
  withText() {
    this.text = faker.lorem.paragraphs(1);

    return this;
  }

  build() {
    return { ...this };
  }
}
