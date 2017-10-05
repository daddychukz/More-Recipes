

export default (sequelize, DataTypes) => {
  const votes = sequelize.define('votes', {
    userId: {
      type: DataTypes.UUID,
      references: {
        model: 'User',
        key: 'userId'
      },
    },
    recipeId: {
      type: DataTypes.UUID,
      references: {
        model: 'Recipe',
        key: 'recipeId'
      },
    },
    vote: {
      type: DataTypes.BOOLEAN
    },
  });
  return votes;
};
