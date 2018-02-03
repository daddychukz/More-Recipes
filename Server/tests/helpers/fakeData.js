import faker from 'Faker';

const fakeData = {

  invalidToken: 'invalidtoken',

  userOne: {
    FullName: 'Daddychuks',
    Email: 'chuks@yahoo.com',
    Sex: 'Male',
    UserName: 'chuks',
    Password: 'chuks',
    ConfirmPassword: 'chuks'
  },

  userFour: {
    FullName: 'Emmanuel',
    Email: 'emma@yahoo.com',
    Sex: 'Male',
    UserName: 'emma',
    Password: 'emma',
    ConfirmPassword: 'emma'
  },

  userUpdate: {
    FullName: 'Chuks',
    UserName: 'Daddy',
    About: 'learner',
    Address: 'lagos',
    Phone: '08088017665',
    Hobbies: 'Singing',
    ImageUrl: 'image-url',
    PublicId: 'public-url'
  },

  userTwo: {
    FullName: 'John Charles',
    Email: 'chuks@yahoo.com',
    Sex: 'Male',
    UserName: 'user',
    Password: 'user',
    ConfirmPassword: 'user'
  },

  userThree: {
    FullName: faker.Name.findName(),
    Email: 'chike@yahoo.com',
    Sex: 'Male',
    UserName: 'chyke',
    Password: 'chyke',
    ConfirmPassword: 'chyke'
  },

  wrongUser: {
    FullName: '123456',
    Email: 'chyykey@eee.com',
    Sex: 'Male',
    UserName: '2244',
    Password: 'chyke',
    ConfirmPassword: 'chyke'
  },

  wrongUser2: {
    FullName: 'chyke',
    Email: '123456',
    Sex: 'Male',
    UserName: '2344',
    Password: 'chyke',
    ConfirmPassword: 'chyke'
  },

  recipe1: {
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
    Title: 'Egg Sauce',
    FullName: 'Emeka Oka',
    Description: 'This is how to prepare Yam',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  incompleteRecipe: {
    userId: '0c29ce2f-0dab-4a68-a776-ca1338577cda',
    FullName: 'Emeka Oka',
    Description: 'This is how to prepare Yam',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  incompleteRecipe2: {
    userId: '0c29ce2f-0dab-4a68-a776-ca1338577cda',
    FullName: 'Emeka Oka',
    Title: 'Afang',
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
