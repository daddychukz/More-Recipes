const bcrypt = require('bcrypt');

require('dotenv').config();

module.exports = {
  up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      fullname: process.env.chuksFullName,
      email: process.env.chuksEmail,
      sex: process.env.chuksSex,
      username: process.env.chuksUserName,
      password: bcrypt.hashSync(process.env.chuksPassword, bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      fullname: process.env.userFullName,
      email: process.env.userEmail,
      sex: process.env.userSex,
      username: process.env.userUserName,
      password: bcrypt.hashSync(process.env.userPassword, bcrypt.genSaltSync(8)),
      createdAt: new Date(),
      updatedAt: new Date()
    }], { returning: true });
  },

  down(queryInterface) {
    return queryInterface
      .bulkDelete('Users');
  }
};
