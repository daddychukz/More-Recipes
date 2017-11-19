

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Recipes', {
      recipeId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      userId: {
        allowNull: true,
        references: {
          model: 'Users',
          key: 'userId'
        },
        onDelete: 'CASCADE',
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      publicId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });
  },
  down(queryInterface) {
    return queryInterface.dropTable('Recipes');
  }
};
