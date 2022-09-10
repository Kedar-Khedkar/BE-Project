const Sequelize = require("sequelize");

const sequelize = new Sequelize("ddms", "app", "password", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { Sequelize, sequelize };
