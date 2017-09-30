'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reviews = sequelize.define('Reviews', {
    userId: DataTypes.STRING,
    recipeId: DataTypes.STRING,
    fullName: DataTypes.STRING,
    title: DataTypes.STRING,
    review: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Reviews;
};