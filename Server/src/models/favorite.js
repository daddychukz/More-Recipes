

export default (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
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
        notEmpty: { msg: 'Empty strings not allowed' },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Category can only contain strings'
        }
      }
    }
  });
  Favorite.associate = (models) => {
    // associations can be defined here
    Favorite.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'SET NULL' });
  };
  return Favorite;
};
