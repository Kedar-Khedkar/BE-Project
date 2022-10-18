const { sequelize, Sequelize } = require("../utils/database");

const User = sequelize.define("user", {
  uid: {
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
});

module.exports = { User };
