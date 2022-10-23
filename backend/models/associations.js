const { User } = require("./user");
const { Faculty } = require("./faculty");
const { Subject } = require("./subject");

//ONE-TO-ONE USER-FACULTY
User.hasOne(Faculty, { foreignKey: { name: "userId", allowNull: false } });
Faculty.belongsTo(User, { foreignKey: "userId" });

//ONE-TO-MANY SUBJECT-FACULTY
Subject.hasMany(Faculty);
Faculty.belongsTo(Subject);
