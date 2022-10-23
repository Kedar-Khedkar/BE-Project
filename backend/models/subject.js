const { sequelize, Sequelize } = require("../utils/database");

const Subject = sequelize.define("Subjects", {
  subCode: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  subName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  pract: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  oral: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  termWork: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  sem: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = { Subject };
