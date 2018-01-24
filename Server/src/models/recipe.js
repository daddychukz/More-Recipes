

export default (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    recipeId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      allowNull: false,
      references: {
        model: 'User',
        key: 'userId'
      },
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fullname: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' },
        is: {
          args: /([A-Za-z])+/,
          msg: 'Fullname can only contain strings'
        }
      }
    },
    title: {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    publicId: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    upvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    downvotes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    viewsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isViewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.hasMany(models.Vote, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
    Recipe.belongsTo(models.User, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
    Recipe.hasMany(models.Review, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
    Recipe.hasMany(models.Favorite, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
  };
  return Recipe;
};
