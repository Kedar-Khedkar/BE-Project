const { sequelize, Sequelize } = require("../utils/database");

const User = sequelize.define("Users", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  role: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  passHash: {
    type: Sequelize.STRING,
  },
  passSalt: {
    type: Sequelize.STRING,
  },
});

module.exports = { User };
