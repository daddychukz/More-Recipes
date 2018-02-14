const favoriteData = {

  addToFavoriteResponse: {
    message: 'Recipe added to your favorites',
    favorite: {
      id: 38,
      userId: '054ef146-46ce-40ab-8e93-812facae48db',
      recipeId: '851e6aef-192a-46a3-b6e4-a65b681cb30c',
      category: 'Lunch',
      updatedAt: '2018-02-08T09:01:18.855Z',
      createdAt: '2018-02-08T09:01:18.855Z'
    }
  },

  getFavoriteRecipeResponse: {
    favoriteRecipe: [
      {
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        recipeId: '851e6aef-192a-46a3-b6e4-a65b681cb30c',
        category: 'Lunch',
        createdAt: '2018-02-08T09:01:18.855Z',
        Recipe: {
          recipeId: '851e6aef-192a-46a3-b6e4-a65b681cb30c',
          userId: '054ef146-46ce-40ab-8e93-812facae48db',
          fullname: 'Adam Eve',
          title: 'Jollof Rices',
          description: 'lorem ipsum bla bla bla',
          imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg',
          publicId: 'home_gipmmy.jpg',
          upvotes: 0,
          downvotes: 0,
          viewsCount: 0,
          isViewed: false,
          createdAt: '2018-02-08T09:00:50.150Z',
          updatedAt: '2018-02-08T09:00:50.150Z'
        }
      }
    ]
  },

  searchUserFavoriteResponse: {
    pagination: {
      Page: 1,
      pageSize: 1,
      pageCount: 1,
      totalCount: 1
    },
    totalCount: 1,
    searchResult: [
      {
        id: 1,
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        recipeId: '851e6aef-192a-46a3-b6e4-a65b681cb30c',
        category: 'Lunch',
        createdAt: '2018-02-08T09:01:18.855Z',
        Recipe: {
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
      }
    ]
  }
};

export default favoriteData;
