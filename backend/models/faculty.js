const { sequelize, Sequelize } = require("../utils/database");

const Faculty = sequelize.define("Faculties", {
  facultyId: {
    type: Sequelize.STRING,
  },
});

module.exports = { Faculty };
