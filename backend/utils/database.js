const Sequelize = require("sequelize");

const sequelize = new Sequelize("ddms", "app", "password", {
  logging: false,
  host: "db",
  dialect: "mysql",
});

module.exports = { Sequelize, sequelize };
