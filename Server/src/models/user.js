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
      allowNull: true,
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
      allowNull: true
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
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: 'https://res.cloudinary.com/chuks-andela32/image/upload/v1510027347/user-male_jvc8hn.jpg'
    },
    publicUrl: {
      type: DataTypes.STRING,
      defaultValue: 'user-male_jvc8hn.jpg'
    },
  }, { hooks: {
    beforeCreate: (newUser) => {
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
    },
    afterUpdate: (newUser) => {
      newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
    }
  } });
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Recipe, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Reviews, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Favorites, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.votes, { foreignKey: 'userId', onDelete: 'SET NULL' });
  };
  return User;
};
