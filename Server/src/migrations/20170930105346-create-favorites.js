

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Favorites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      userId: {
        allowNull: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'Users',
          key: 'userId'
        },
        onDelete: 'CASCADE'
      },
      recipeId: {
        allowNull: true,
        type: Sequelize.UUID,
        references: {
          model: 'Recipes',
          key: 'recipeId'
        },
        onDelete: 'CASCADE'
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Favorites');
  }
};
