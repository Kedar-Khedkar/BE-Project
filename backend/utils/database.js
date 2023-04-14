const Sequelize = require("sequelize");

const sequelize = new Sequelize("ddms", "app", "password", {
  logging: false,
  host: "localhost",
  dialect: "mysql",
});

module.exports = { Sequelize, sequelize };
