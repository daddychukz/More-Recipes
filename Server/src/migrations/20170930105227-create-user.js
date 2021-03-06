

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";').then(() =>
      queryInterface.createTable('Users', {
        userId: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.UUID,
          defaultValue: Sequelize.literal('uuid_generate_v4()')
        },
        fullname: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        sex: {
          type: Sequelize.ENUM,
          values: ['Male', 'Female'],
          allowNull: true
        },
        username: {
          type: Sequelize.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        address: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: 'Nil'
        },
        about: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 'Nil'
        },
        hobbies: {
          type: Sequelize.TEXT,
          allowNull: true,
          defaultValue: 'Nil'
        },
        phone: {
          type: Sequelize.STRING,
          allowNull: true,
          defaultValue: 0
        },
        imageUrl: {
          type: Sequelize.STRING,
          defaultValue: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg'
        },
        publicUrl: {
          type: Sequelize.STRING,
          defaultValue: 'user-male_jvc8hn.jpg'
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATEONLY
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATEONLY
        }
      }));
  },
  down(queryInterface) {
    return queryInterface.dropTable('Users');
  }
};
