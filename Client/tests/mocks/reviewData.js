const reviewData = {

  addReviewResponse: {
    id: 32,
    userId: '054ef146-46ce-40ab-8e93-812facae48db',
    recipeId: 'f871151a-6f33-44c1-8ad3-3b00b91d57fe',
    review: 'Nice',
    createdAt: '2018-02-08',
    User: {
      fullname: 'Adam Eve',
      publicUrl: 'user-male_jvc8hn.jpg',
      imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg'
    }
  },

  getReviewsResponse: {
    reviews: [
      {
        id: 32,
        userId: '054ef146-46ce-40ab-8e93-812facae48db',
        recipeId: 'f871151a-6f33-44c1-8ad3-3b00b91d57fe',
        fullname: 'Adam Eve',
        review: 'Nice',
        createdAt: '2018-02-08',
        updatedAt: '2018-02-08',
        User: {
          userId: '054ef146-46ce-40ab-8e93-812facae48db',
          fullname: 'Adam Eve',
          email: 'example@example.com',
          hobbies: 'Nil',
          phone: '0',
          imageUrl: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg',
          publicUrl: 'user-male_jvc8hn.jpg'
        }
      }
    ]
  }
};

export default reviewData;
