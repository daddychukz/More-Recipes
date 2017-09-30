

module.exports = function (sequelize, DataTypes) {
  const Recipe = sequelize.define('Recipe', {
    recipeId: DataTypes.STRING,
    userId: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    upvotes: DataTypes.NUMBER,
    views: DataTypes.NUMBER
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Recipe;
};
