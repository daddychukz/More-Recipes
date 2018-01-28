import faker from 'Faker';

const fakeData = {

  userOne: {
    FullName: 'Daddychuks',
    Email: 'chuks@yahoo.com',
    Sex: 'Male',
    UserName: 'chuks',
    Password: 'chuks',
    ConfirmPassword: 'chuks'
  },

  userTwo: {
    FullName: faker.Name.findName(),
    Email: 'chuks@yahoo.com',
    Sex: 'Male',
    UserName: 'user',
    Password: 'user',
    ConfirmPassword: 'user'
  },
  recipe: {
    Title: 'Beans',
    FullName: 'Daddychuks',
    Description: 'This is how to prepare beans',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  recipe2: {
    Title: 'Egusi',
    FullName: 'Daddychuks',
    Description: 'This is how to prepare Egusi soup',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  recipe3: {
    userId: '0c29ce9f-0dab-4a68-a776-ca1338577cda',
    Title: 'Yam',
    FullName: 'Emeka Oka',
    Description: 'This is how to prepare Yam',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  recipe4: {
    userId: '0c29ce2f-0dab-4a68-a776-ca1338577cda',
    Title: 'Yam',
    FullName: 'Emeka Oka',
    Description: 'This is how to prepare Yam',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  review: {
    userId: '',
    recipeId: '',
    FullName: faker.Name.findName(),
    Review: 'Cool Stuff!!'
  },
};

export default fakeData;
