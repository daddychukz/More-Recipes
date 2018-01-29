import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

require('dotenv').config();

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: 'Full name is required'
        },
        is: {
          args: /^[a-z ]+$/i,
          msg: 'Full name must only contain letters'
        }
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
      type: DataTypes.ENUM,
      values: ['Male', 'Female'],
      allowNull: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      }
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    about: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hobbies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg'
    },
    publicUrl: {
      type: DataTypes.STRING,
      defaultValue: 'user-male_jvc8hn.jpg'
    },
  }, {
    hooks: {
      beforeCreate: (newUser) => {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      },
      afterUpdate: (newUser) => {
        newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
      }
    }
  });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Recipe, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Favorite, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Vote, { foreignKey: 'userId', onDelete: 'SET NULL' });
  };

  User.prototype.generateResetPasswordLink = function generateResetPasswordLink() {
    return `${process.env.HOST}/reset-password/${this.generateResetPasswordToken().replace(/\./g, '-io')}`;
  };

  User.prototype.generateResetPasswordToken = function generateResetPasswordToken() {
    return jwt.sign({
      userId: this.userId
    }, process.env.SECRET, { expiresIn: '1h' });
  };

  return User;
};
