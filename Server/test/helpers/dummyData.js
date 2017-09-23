
const faker = require('Faker');

module.exports = {

  recipe: {
    id: 4,
    Title: 'Jollof Beans',
    Description: faker.Lorem.sentences(2),
    Upvotes: 0
  },

  user: {
    Username: 'Chuks',
  },

  reviews: {
    Title: 'Jollof Beans',
    Username: 'Chuks',
    Review: faker.Lorem.sentence(8)
  },
};
