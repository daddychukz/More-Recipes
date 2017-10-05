

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
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    description: {
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
  });
  Recipe.associate = (models) => {
    // associations can be defined here
    Recipe.belongsTo(models.votes, { foreignKey: 'recipeId', onDelete: 'SET NULL' });
  };
  return Recipe;
};
