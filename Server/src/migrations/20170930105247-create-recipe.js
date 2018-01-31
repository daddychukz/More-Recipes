

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
        defaultValue: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1509088084/home_gipmmy.jpg'
      },
      publicId: {
        type: Sequelize.STRING,
        defaultValue: 'home_gipmmy.jpg'
      },
      upvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      downvotes: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      viewsCount: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      isViewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
