

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Reviews', {
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
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      review: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATEONLY
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Reviews');
  }
};
