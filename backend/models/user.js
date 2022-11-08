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
    validate: {
      isIn: [["student", "admin", "faculty"]],
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    },
  },
  passHash: {
    type: Sequelize.STRING,
  },
  passSalt: {
    type: Sequelize.STRING,
  },
});

module.exports = { User };
