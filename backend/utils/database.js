const Sequelize = require("sequelize");

/* Creating a new instance of Sequelize and connecting to the database. */
const sequelize = new Sequelize("ddms", "app", "password", {
  logging: false,
  host: "localhost",
  dialect: "mysql",
});

module.exports = { Sequelize, sequelize };
