const recipeData = {

  addRecipeRequest: {
    Title: 'Jollof Rice',
    Description: 'lorem ipsum bla bla bla'
  },

  addRecipeResponse: [{
    recipe: {
      recipeId: '434c71b3-04a1-44bb-abe6-11badced59c4',
      imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
      publicId: 'home_gipmmy.jpg',
      upvotes: 0,
      downvotes: 0,
      viewsCount: 0,
      isViewed: false,
      userId: '054ef146-46ce-40ab-8e93-812facae48db',
      fullname: 'Adam Eve',
      title: 'Jollof Rice',
      description: 'lorem ipsum bla bla bla',
      updatedAt: '2018-02-08T05:12:31.195Z',
      createdAt: '2018-02-08T05:12:31.195Z'
    }
  }],

  getAllRecipeResponse: {
    pagination: {
      Page: 1,
      pageSize: 1,
      pageCount: 1,
      totalCount: 1
    },
    recipes: [
      {
        recipeId: 'f871151a-6f33-44c1-8ad3-3b00b91d57fe',
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        fullname: 'Adam Eve',
        title: 'Jollof Rice',
        description: 'lorem ipsum bla bla bla',
        imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
        publicId: 'home_gipmmy.jpg',
        upvotes: 0,
        downvotes: 0,
        viewsCount: 0,
        isViewed: false,
        createdAt: '2018-02-08T05:12:31.195Z',
        updatedAt: '2018-02-08T05:12:31.195Z'
      }
    ]
  },

  getSingleRecipeResponse: {
    recipe: {
      recipeId: '434c71b3-04a1-44bb-abe6-11badced59c4',
      imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
      publicId: 'home_gipmmy.jpg',
      upvotes: 0,
      downvotes: 0,
      viewsCount: 0,
      isViewed: false,
      userId: '054ef146-46ce-40ab-8e93-812facae48db',
      fullname: 'Adam Eve',
      title: 'Jollof Rice',
      description: 'lorem ipsum bla bla bla',
      updatedAt: '2018-02-08T05:12:31.195Z',
      createdAt: '2018-02-08T05:12:31.195Z',
      votes: []
    }
  },

  getUserRecipeResponse: {
    pagination: {
      Page: 1,
      pageSize: 1,
      pageCount: 1,
      totalCount: 1
    },
    recipes: [
      {
        recipeId: 'f871151a-6f33-44c1-8ad3-3b00b91d57fe',
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        fullname: 'Adam Eve',
        title: 'Jollof Rice',
        description: 'lorem ipsum bla bla bla',
        imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
        publicId: 'home_gipmmy.jpg',
        upvotes: 0,
        downvotes: 0,
        viewsCount: 0,
        isViewed: false,
        createdAt: '2018-02-08T05:12:31.195Z',
        updatedAt: '2018-02-08T05:12:31.195Z'
      },
      {
        recipeId: 'f871251a-6f33-44c1-8ad3-3b00b91d57fe',
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        fullname: 'Adam Eve',
        title: 'Yam Sauce',
        description: 'lorem ipsum bla bla bla',
        imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
        publicId: 'home_gipmmy.jpg',
        upvotes: 0,
        downvotes: 0,
        viewsCount: 0,
        isViewed: false,
        createdAt: '2018-02-08T05:12:31.195Z',
        updatedAt: '2018-02-08T05:12:31.195Z'
      },
    ]
  },

  updateRecipeResponse: {
    updatedRecipe: [
      {
        recipeId: '434c71b3-04a1-44bb-abe6-11badced59c4',
        imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
        publicId: 'home_gipmmy.jpg',
        upvotes: 0,
        downvotes: 0,
        viewsCount: 0,
        isViewed: false,
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        fullname: 'Adam Eve',
        title: 'Jollof Rice',
        description: 'lorem ipsum bla bla bla',
        updatedAt: '2018-02-08T05:12:31.195Z',
        createdAt: '2018-02-08T05:12:31.195Z',
      }
    ]
  },

  getPopularRecipesResponse: {
    recipes: [
      {
        recipeId: '434c71b3-04a1-44bb-abe6-11badced59c4',
        imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
        publicId: 'home_gipmmy.jpg',
        upvotes: 0,
        downvotes: 0,
        viewsCount: 0,
        isViewed: false,
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        fullname: 'Adam Eve',
        title: 'Jollof Rice',
        description: 'lorem ipsum bla bla bla',
        createdAt: '2018-02-08T05:12:31.195Z'
      }
    ]
  }
};

export default recipeData;
