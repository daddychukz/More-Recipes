

export default (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'User',
        key: 'userId'
      }
    },
    recipeId: {
      allowNull: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      references: {
        model: 'Recipe',
        key: 'recipeId'
      }
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Firstname can only contain strings'
        }
      }
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      },
      is: {
        args: /([A-Za-z])+/,
        msg: 'Firstname can only contain strings'
      }
    },
  });
  Review.associate = (models) => {
    // associations can be defined here
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'SET NULL'
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'SET NULL'
    });
  };
  return Review;
};
