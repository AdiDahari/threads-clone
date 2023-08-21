import { faker } from "@faker-js/faker";
import { Reply, Thread, User } from "../types/threads";

export function generateRandomFollower(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    name: firstName + " " + lastName,
    username: faker.internet.displayName({ firstName, lastName }),
    verified: Math.random() >= 0.6,
    photo: faker.image.avatar(),
    bio: faker.person.bio(),
    followers: [],
    link: faker.internet.url(),
    createdAt: faker.date.past({ years: 2 }).toLocaleString(),
  };
}

export function generateRandomUser(): User {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    id: faker.string.uuid(),
    name: firstName + " " + lastName,
    username: faker.internet.displayName({ firstName, lastName }),
    verified: Math.random() >= 0.6,
    photo: faker.image.avatar(),
    bio: faker.person.bio(),
    followers: new Array(Math.floor(Math.random() * 10))
      .fill(null)
      .map((_) => generateRandomFollower()),
    link: faker.internet.url(),
    createdAt: faker.date.past({ years: 2 }).toLocaleString(),
  };
}

export function generateRandomThread(): Thread {
  const author = generateRandomUser();
  const mentionedUser = generateRandomUser();
  const likers = new Array(Math.floor(Math.random() * 10))
    .fill(null)
    .map((_) => generateRandomFollower());

  const createdAt = faker.date.recent();

  const replies = new Array(Math.floor(Math.random() * 10))
    .fill(null)
    .map((_) => ({
      id: faker.string.uuid(),
      author: generateRandomUser(),
      content: faker.lorem.paragraph(),
      replies: [],
      repliesCount: 0,
      likers: [],
      likesCount: 0,
      mentions: [],
      createdAt: faker.date.past({ refDate: createdAt }).toISOString(),
    }));

  return {
    id: faker.string.uuid(),
    author,
    content: faker.lorem.paragraph(),
    image: Math.random() > 0.5 ? faker.image.url() : undefined,
    replies,
    repliesCount: replies.length,
    likers,
    likesCount: likers.length,
    mentions: new Array(Math.floor(Math.random() * 2))
      .fill(null)
      .map((_) => generateRandomFollower()),
    createdAt: createdAt.toISOString(),
  };
}

export function generateThreads(): Thread[] {
  return new Array(50).fill(null).map((_) => generateRandomThread());
}
