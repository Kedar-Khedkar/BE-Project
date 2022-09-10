const { sequelize, Sequelize } = require("../utils/database");

const User = sequelize.define("user", {
  PRN: {
    type: Sequelize.STRING,
    primaryKey: true,
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
