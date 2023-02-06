const { sequelize, Sequelize } = require("../utils/database");

const Mark = sequelize.define("Marks", {
  Endsem: {
    type: Sequelize.INTEGER,
  },
  PR: {
    type: Sequelize.INTEGER,
  },
  TW: {
    type: Sequelize.INTEGER,
  },
  OR: {
    type: Sequelize.INTEGER,
  },
  Insem: {
    type: Sequelize.INTEGER,
  },
});

module.exports = { Mark };
