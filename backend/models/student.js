const { sequelize, Sequelize } = require("../utils/database");

const Student = sequelize.define("Students", {
  rollno: {
    type: Sequelize.INTEGER,
    defaultValue: -1,
    allowNull: false,
  },
  examseatno: {
    type: Sequelize.STRING,
    defaultValue: null,
  },
  curr_sem: {
    type: Sequelize.INTEGER,
    defaultValue: 3,
    allowNull: false,
  },
  prn: {
    type: Sequelize.STRING,
    defaultValue: "required",
    allowNull: false,
  },
});

Student.removeAttribute("id");

module.exports = { Student };
