const Sequelize = require("sequelize");

const sequelize = new Sequelize("ddms", "root", "password", {
    host: "localhost",
    dialect: "mysql"
})

module.exports = sequelize;