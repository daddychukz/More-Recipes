import faker from 'Faker';

const fakeData = {

  invalidToken: 'invalidtoken',

  userOne: {
    fullName: 'Daddychuks',
    userName: 'chuks',
    email: 'chuks@yahoo.com',
    password: 'chuks',
    confirmPassword: 'chuks'
  },

  userFour: {
    fullName: 'Emmanuel',
    email: 'emma@yahoo.com',
    sex: 'Male',
    userName: 'emma',
    password: 'emma',
    confirmPassword: 'emma'
  },

  userUpdate: {
    fullName: 'Chuks',
    userName: 'Daddy',
    about: 'learner',
    address: 'lagos',
    phone: '08088017665',
    hobbies: 'Singing',
    imageUrl: 'image-url',
    publicId: 'public-url'
  },

  userTwo: {
    fullName: 'John Charles',
    email: 'chuks@yahoo.com',
    sex: 'Male',
    userName: 'user',
    password: 'user',
    confirmPassword: 'user'
  },

  userThree: {
    fullName: faker.Name.findName(),
    email: 'chike@yahoo.com',
    sex: 'Male',
    userName: 'chyke',
    password: 'chyke',
    confirmPassword: 'chyke'
  },

  wrongUser: {
    fullName: '123456',
    email: 'chyykey@eee.com',
    sex: 'Male',
    userName: '2244',
    password: 'chyke',
    confirmPassword: 'chyke'
  },

  wrongUser2: {
    fullName: 'chyke',
    email: '123456',
    sex: 'Male',
    userName: '2344',
    password: 'chyke',
    confirmPassword: 'chyke'
  },

  recipe1: {
    title: 'Beans',
    fullName: 'Daddychuks',
    description: 'This is how to prepare beans',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  recipe2: {
    title: 'Egusi',
    fullName: 'Daddychuks',
    description: 'This is how to prepare Egusi soup',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  recipe3: {
    userId: '0c29ce9f-0dab-4a68-a776-ca1338577cda',
    title: 'Yam',
    fullName: 'Emeka Oka',
    description: 'This is how to prepare Yam',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  recipe4: {
    userId: '0c29ce2f-0dab-4a68-a776-ca1338577cda',
    title: 'Egg Sauce',
    fullName: 'Emeka Oka',
    description: 'This is how to prepare Egg',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  incompleteRecipe: {
    userId: '0c29ce2f-0dab-4a68-a776-ca1338577cda',
    fullName: 'Emeka Oka',
    description: 'This is how to prepare Yam',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  incompleteRecipe2: {
    userId: '0c29ce2f-0dab-4a68-a776-ca1338577cda',
    fullName: 'Emeka Oka',
    title: 'Afang',
    imageUrl: 'https://res.cloudinary.com/chuks-andela32/home_gipmmy.jpg',
    publicId: 'home_gipmmy.jpg'
  },

  review: {
    userId: '',
    recipeId: '',
    fullName: faker.Name.findName(),
    review: 'Cool Stuff!!'
  },
};

export default fakeData;
