import faker from 'Faker';

const fakeData = {

  userOne: {
    fullname: 'Daddychuks',
    email: 'chuks@yahoo.com',
    sex: 'male',
    username: 'chuks',
    password: 'chuks',
    confirmPassword: 'chuks'
  },

  userTwo: {
    fullname: faker.Name.findName(),
    email: 'user@yahoo.com',
    sex: 'male',
    username: 'user',
    password: 'user',
    confirmPassword: 'user'
  },

  recipe: {
    title: 'Beans',
    description: 'This is how to prepare beans'
  },

  recipe2: {
    title: 'Egusi',
    description: 'This is how to prepare Egusi soup'
  },

  review: {
    fullname: faker.Name.findName(),
    title: 'Egusi',
    review: 'Cool Stuff!!'
  },
};

export default fakeData;
