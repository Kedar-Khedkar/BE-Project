const { User } = require("./user");
const { Faculty } = require("./faculty");
const { Subject } = require("./subject");
const { Student } = require("./student");
const { Attendance } = require("./attendance");

//ONE-TO-ONE USER-FACULTY
User.hasOne(Faculty, { foreignKey: { name: "userId", allowNull: false } });
Faculty.belongsTo(User, { foreignKey: "userId" });

//ONE-TO-ONE USER-STUDENT
User.hasOne(Student, { foreignKey: { name: "userId", allowNull: false } });
Student.belongsTo(User, { foreignKey: "userId" });

//ONE-TO-MANY SUBJECT-FACULTY
Subject.hasMany(Faculty, { foreignKey: { allowNull: false } });
Faculty.belongsTo(Subject);

//ONE-TO-MANY Subject-ATTENDANCE
Subject.hasMany(Attendance);
Attendance.belongsTo(Subject);

Student.hasMany(Attendance);
Attendance.belongsTo(Student);
