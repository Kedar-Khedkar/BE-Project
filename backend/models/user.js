const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("mysql");
const User = sequelize.define("User", {
  PRN: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { User };
