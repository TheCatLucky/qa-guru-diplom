import { faker } from '@faker-js/faker';

export class UserBuilder {
  withEmail() {
    this.email = faker.internet.email({ provider: 'example.com' });

    return this;
  }

  withUsername(username) {
    this.username = username ?? faker.person.fullName();

    return this;
  }

  withPassword(password) {
    this.password = password ?? faker.internet.password();

    return this;
  }

  withBio() {
    this.bio = faker.lorem.paragraphs(2);

    return this;
  }

  build() {
    return { ...this };
  }
}
