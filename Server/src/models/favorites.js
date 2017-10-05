

export default (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    recipeId: {
      allowNull: false,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Recipe',
        key: 'recipeId'
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    }
  });
  return Favorites;
};
