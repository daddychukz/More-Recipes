/**
* This function creates the model of
* Users table in the database, specifying
* relationships, datatypes and constraints.
* 
*/
import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Empty strings not allowed' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Enter a Valid Email' },
      }
    },
    sex: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirmPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { hooks: {
    beforeCreate: (newUser) => {
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      newUser.confirmPassword = bcrypt.hashSync(newUser.confirmPassword, bcrypt.genSaltSync(8));
    },
    afterUpdate: (newUser) => {
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      newUser.confirmPassword = bcrypt.hashSync(newUser.confirmPassword, bcrypt.genSaltSync(8));
    }
  } });
  return User;
};
