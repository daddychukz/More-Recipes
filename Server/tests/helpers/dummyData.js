
const faker = require('Faker');

const fakeData = {

  recipe: {
    id: 4,
    Title: 'Jollof Beans',
    Description: faker.Lorem.sentences(2),
    Upvotes: 0
  },

  recipe2: {
    id: 4,
    Title: '',
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

export default fakeData;
