import faker from "../utils/faker.js";
import { generateId, recentDate } from "../utils/faker.js";
import { categories } from "./categories.js";

export let products = [];

categories.forEach((category) => {
  for (let i = 0; i < 4; i++) {
    products.push({
      id: generateId(),
      categoryId: category.id,
      createdAt: recentDate(),
      title: faker.commerce.productName(),
      badge: faker.random.word(),
      image: faker.image.imageUrl(),
      rating: faker.datatype.number({ min: 1, max: 5 }),
      weight: faker.datatype.number({ min: 200, max: 800 }),
      basePrice: faker.datatype.number({ min: 20, max: 100 }),
      sizes: ["S", "M", "L"],
      doughs: ["thin", "thick"],
      ingredients: ["cheese", "tomato", "pepper"],
      extras: ["ketchup", "mayo"],
      inCart: false,
      quantity: 0,
    });
  }
});
