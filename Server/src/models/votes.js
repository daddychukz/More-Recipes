

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
  votes.associate = (models) => {
    // associations can be defined here
    votes.belongsTo(models.Recipe, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
  };
  return votes;
};
