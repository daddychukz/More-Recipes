import bcrypt from 'bcrypt';

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
    User.hasMany(models.Review, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Favorite, { foreignKey: 'userId', onDelete: 'SET NULL' });
    User.hasMany(models.Vote, { foreignKey: 'userId', onDelete: 'SET NULL' });
  };
  return User;
};
