import { faker } from '@faker-js/faker';

export function user() {
  return {
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password()
  }
}