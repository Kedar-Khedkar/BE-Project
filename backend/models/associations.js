const { User } = require("./user");
const { Faculty } = require("./faculty");
const { Subject } = require("./subject");
const { Student } = require("./student");
const { Attendance } = require("./attendance");
const { resetPassword } = require("./resetPassword");
const { Mark } = require("./mark");
const { UnitTest } = require("./unitTest");
const {Parents} = require("./parents");

/* Creating the relationships between the tables. */
//ONE-TO-ONE USER-FACULTY
User.hasOne(Faculty, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    onDelete: "CASCADE",
    hooks: true,
  },
});
Faculty.belongsTo(User, {
  foreignKey: "userId",
});

//ONE-TO-ONE USER-STUDENT
User.hasOne(Student, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    onDelete: "CASCADE",
    hooks: true,
  },
});
Student.belongsTo(User, {
  foreignKey: "userId",
});

//one-to-one student-parent
Student.hasOne(Parents, {foreignKey: {allowNull: false}})
Parents.belongsTo(Student);

//ONE-TO-MANY SUBJECT-FACULTY
Subject.hasMany(Faculty, { foreignKey: { allowNull: false } });
Faculty.belongsTo(Subject);

//ONE-TO-MANY Subject-ATTENDANCE
Subject.hasMany(Attendance);
Attendance.belongsTo(Subject);

Student.hasMany(Attendance);
Attendance.belongsTo(Student);

Student.hasMany(Mark);
Mark.belongsTo(Subject);

Student.hasMany(UnitTest);
UnitTest.belongsTo(Student);
UnitTest.belongsTo(Subject);

