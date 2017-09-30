

module.exports = function (sequelize, DataTypes) {
  const Favorites = sequelize.define('Favorites', {
    userId: DataTypes.STRING,
    recipeId: DataTypes.STRING,
    category: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Favorites;
};
