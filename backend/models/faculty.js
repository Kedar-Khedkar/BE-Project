const { sequelize, Sequelize } = require("../utils/database");

const Faculty = sequelize.define("Faculties", {});

Faculty.removeAttribute("id");

module.exports = { Faculty };
