const {sequelize, Sequelize} = require("../utils/database");

const Parents = 
sequelize.define(
    "Parents",{
        parentsEmail: {
            type: Sequelize.STRING,
            unique: true,
        },
        parentsMobNo: {
            type: Sequelize.STRING,
        },
    }
)

module.exports = {Parents};