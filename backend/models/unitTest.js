const { sequelize, Sequelize } = require("../utils/database");

const unitTest = sequelize.define("unitTests", {
  UT1: {
    type: Sequelize.INTEGER,
  },
  UT2: {
    type: Sequelize.INTEGER,
  },
  UT3: {
    type: Sequelize.INTEGER,
  },
  UT4: {
    type: Sequelize.INTEGER,
  },
  UT5: {
    type: Sequelize.INTEGER,
  },
  UT6: {
    type: Sequelize.INTEGER,
  },
});

module.exports = { unitTest };
