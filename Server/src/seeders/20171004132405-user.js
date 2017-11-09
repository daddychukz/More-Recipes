const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [{
      fullName: process.env.chuksFullName,
      email: process.env.chuksEmail,
      sex: process.env.chuksSex,
      userName: process.env.chuksUserName,
      password: bcrypt.hashSync(process.env.chuksPassword, bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullName: process.env.userFullName,
      email: process.env.userEmail,
      sex: process.env.userSex,
      userName: process.env.userUserName,
      password: bcrypt.hashSync(process.env.userPassword, bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
  },

  down(queryInterface, Sequelize) {
    return queryInterface
      .bulkDelete('Users');
  }
};
