import faker from "../utils/faker.js";
import { generateId, recentDate } from "../utils/faker.js";

export let categories = Array.from({ length: 5 }).map(() => ({
  id: generateId(),
  createdAt: recentDate(),
  title: faker.commerce.department(),
  icon: faker.image.imageUrl(),
  order: faker.datatype.number({ min: 1, max: 10 }),
}));
