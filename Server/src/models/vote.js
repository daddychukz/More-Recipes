

export default (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
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
  Vote.associate = (models) => {
    // associations can be defined here
    Vote.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL'
    });
  };
  return Vote;
};
