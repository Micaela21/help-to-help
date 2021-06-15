const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports = (sequelize) => {

  const User = sequelize.define('user', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: false,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        if (value) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(value, salt);
          this.setDataValue('password', hash);
        }
      }
    },
    osName: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    osWeb: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.ENUM("user", "os", "admin"),
      allowNull: false,
      defaultValue: "user",
    },
    active: {
      type: DataTypes.BOOLEAN("true", "false"),
      allowNull: false,
      defaultValue: "true"
    },
    resetPassword: {
      type: DataTypes.BOOLEAN("true", "false"),
      allowNull: false,
      defaultValue: "false"
    }
  });

  User.prototype.compare = function (password) {
    return bcrypt.compareSync(password, this.password)
  }



  return User;  
};



